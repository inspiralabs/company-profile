/**
 * Verifies a Cloudflare Turnstile token on the server side
 * @param token - The Turnstile token to verify
 * @returns Promise<boolean> - True if verification succeeds, false otherwise
 */
export async function verifyTurnstileToken(
  token: string
): Promise<boolean> {
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error("CLOUDFLARE_TURNSTILE_SECRET_KEY is not configured");
    return false;
  }

  if (!token) {
    console.error("Turnstile token is missing");
    return false;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: secretKey,
          response: token,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Turnstile verification request failed:", data);
      return false;
    }

    return data.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}