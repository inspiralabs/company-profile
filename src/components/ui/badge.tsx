import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-gold-antique/50 bg-gold-bright/20 text-maroon-deep",
        maroon: "border-maroon-vibrant/30 bg-maroon-vibrant/10 text-maroon-deep",
        bright: "border-gold-bright bg-gold-bright text-maroon-deep",
        outline: "border-[var(--color-border)] bg-surface text-charcoal",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
