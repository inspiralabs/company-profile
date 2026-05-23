export type AnalyticsEvent =
  | "cta_whatsapp_click"
  | "survey_complete"
  | "contact_form_submit";

type EventParams = Record<string, string>;

type FbqWindow = Window & {
  fbq?: (
    command: string,
    eventName: string,
    params?: Record<string, string>
  ) => void;
};

type GtagWindow = Window & {
  gtag?: (command: string, name: string, params?: EventParams) => void;
};

function trackGoogle(event: AnalyticsEvent, params?: EventParams) {
  const w = window as GtagWindow;
  w.gtag?.("event", event, params);
}

function trackMeta(event: AnalyticsEvent, params?: EventParams) {
  const w = window as FbqWindow;
  if (!w.fbq) return;

  if (event === "cta_whatsapp_click") {
    w.fbq("track", "Contact", {
      content_name: params?.location ?? "whatsapp",
    });
    return;
  }

  w.fbq("track", "Lead", {
    content_name: event,
  });
}

export function trackConversion(event: AnalyticsEvent, params?: EventParams) {
  if (typeof window === "undefined") return;
  trackGoogle(event, params);
  trackMeta(event, params);
}
