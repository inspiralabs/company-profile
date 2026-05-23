import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "cream" | "dark" | "maroon";
}

const variants = {
  default: "bg-[var(--color-bg-primary)]",
  cream: "bg-cream",
  dark: "bg-charcoal text-white",
  maroon: "bg-gradient-hero text-white",
};

export default function SectionWrapper({
  id,
  children,
  className,
  variant = "default",
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("section-padding", variants[variant], className)}>
      <div className="mx-auto max-w-content">{children}</div>
    </section>
  );
}
