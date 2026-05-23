import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-[var(--color-border)] bg-surface shadow-card transition-shadow duration-300 hover:shadow-card-hover",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export { Card };
