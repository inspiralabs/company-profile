"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact";
          appearance?: "always" | "execute" | "interaction-only";
        }
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

type TurnstileProps = {
  siteKey: string;
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact";
  appearance?: "always" | "execute" | "interaction-only";
};

export default function Turnstile({
  siteKey,
  onSuccess,
  onError,
  onExpire,
  theme = "light",
  size = "normal",
  appearance = "always",
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const renderAttemptedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple renders
    if (renderAttemptedRef.current) return;
    
    const loadTurnstile = () => {
      if (!containerRef.current || !window.turnstile || renderAttemptedRef.current) return;

      try {
        renderAttemptedRef.current = true;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: onSuccess,
          "error-callback": onError,
          "expired-callback": onExpire,
          theme,
          size,
          appearance,
        });
      } catch (e) {
        console.error("Error rendering Turnstile widget:", e);
        renderAttemptedRef.current = false;
      }
    };

    // Check if Turnstile script is already loaded
    if (window.turnstile) {
      loadTurnstile();
    } else {
      // Wait for script to load
      const checkInterval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(checkInterval);
          loadTurnstile();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkInterval), 10000);

      return () => clearInterval(checkInterval);
    }

    // Cleanup on unmount
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
          renderAttemptedRef.current = false;
        } catch (e) {
          // Silently ignore removal errors
        }
      }
    };
  }, [siteKey]); // Only depend on siteKey

  return <div ref={containerRef} />;
}
