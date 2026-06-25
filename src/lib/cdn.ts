const BASE = process.env.NEXT_PUBLIC_CDN_URL ?? "";

/**
 * Prefix a path with the CDN base URL.
 * Falls back to local path if NEXT_PUBLIC_CDN_URL is not set.
 *
 * Usage: cdn("/images/portfolio/sijagaair-1.png")
 */
export function cdn(path: string): string {
  if (!BASE) return path;
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}
