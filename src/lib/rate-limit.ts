/**
 * Simple in-memory rate limiter
 * For production, consider using Redis or similar for distributed systems
 */

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitRecord>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export type RateLimitConfig = {
  maxRequests: number;
  windowMs: number;
  /** Jika true, hanya cek status tanpa menambah counter (peek mode) */
  peek?: boolean;
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfter?: number;
  /** Timestamp (ms) kapan window rate limit di-reset */
  resetTime?: number;
};

/**
 * Check if request is within rate limit.
 * Gunakan `peek: true` untuk mengecek status tanpa mengonsumsi slot (mirip Turnstile pre-check).
 * @param identifier - Usually IP address or user identifier
 * @param config - Rate limit configuration
 * @returns RateLimitResult with allowed status and retry info
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 3, windowMs: 60000 }
): RateLimitResult {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  // Jika window sudah berlalu atau belum ada record
  if (!record || now > record.resetAt) {
    const resetAt = now + config.windowMs;

    // Peek mode: jangan buat/ubah record, hanya kembalikan status
    if (config.peek) {
      return {
        allowed: true,
        remaining: config.maxRequests,
        resetTime: resetAt,
      };
    }

    rateLimitStore.set(identifier, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: resetAt,
    };
  }

  // Cek apakah limit sudah terlampaui
  if (record.count >= config.maxRequests) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfter,
      resetTime: record.resetAt,
    };
  }

  // Peek mode: jangan increment, hanya kembalikan status saat ini
  if (config.peek) {
    return {
      allowed: true,
      remaining: config.maxRequests - record.count,
      resetTime: record.resetAt,
    };
  }

  // Increment counter
  record.count++;
  return {
    allowed: true,
    remaining: config.maxRequests - record.count,
    resetTime: record.resetAt,
  };
}

/**
 * Get client IP address from request or headers object.
 */
export function getClientIP(requestOrHeaders: Request | Headers): string {
  const headers =
    requestOrHeaders instanceof Headers
      ? requestOrHeaders
      : requestOrHeaders.headers;

  // Try various headers in order of preference
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(",")[0].trim();
  }

  const realIP = headers.get("x-real-ip");
  if (realIP) return realIP;

  const cfIP = headers.get("cf-connecting-ip");
  if (cfIP) return cfIP;

  // Fallback
  return "unknown";
}