"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent } from "@/lib/site";
import type { AnalyticsEvent } from "@/lib/analytics";

type TrackLinkProps = Omit<ComponentProps<typeof Link>, "onClick"> & {
  event: AnalyticsEvent;
  eventParams?: Record<string, string>;
};

export default function TrackLink({
  event,
  eventParams,
  href,
  children,
  ...props
}: TrackLinkProps) {
  return (
    <Link
      href={href}
      {...props}
      onClick={() => trackEvent(event, eventParams)}
    >
      {children}
    </Link>
  );
}
