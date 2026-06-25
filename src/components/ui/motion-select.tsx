"use client";

import { Select } from "@base-ui/react/select";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type MotionSelectOption = {
  value: string;
  label: string;
};

type MotionSelectProps = {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: MotionSelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

const triggerClass =
  "mt-1 flex w-full min-h-[42px] items-center justify-between gap-2 rounded-lg border border-[var(--color-border)] bg-surface px-3 py-2 text-left text-sm transition-colors hover:border-gold-antique/70 focus-visible:border-gold-antique focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-antique data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50";

const popupClass =
  "max-h-60 min-w-[var(--anchor-width)] overflow-y-auto rounded-xl border border-[var(--color-border)] bg-surface p-1 shadow-[0_12px_40px_rgba(0,0,0,0.12)] outline-none";

const itemClass =
  "flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-2 text-sm text-charcoal outline-none data-[highlighted]:bg-cream data-[selected]:font-medium data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

export default function MotionSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Pilih opsi",
  required,
  disabled,
  className,
}: MotionSelectProps) {
  const [open, setOpen] = useState(false);
  const rootValue = value === "" ? null : value;

  return (
    <Select.Root
      value={rootValue}
      onValueChange={(next) => onChange(next == null ? "" : String(next))}
      open={open}
      onOpenChange={setOpen}
      disabled={disabled}
      required={required}
      name={name}
    >
      <motion.div whileTap={disabled ? undefined : { scale: 0.995 }}>
        <Select.Trigger id={id} className={cn(triggerClass, className)}>
          <Select.Value
            placeholder={placeholder}
            className="min-w-0 flex-1 truncate text-charcoal data-[placeholder]:text-[var(--color-text-muted)]"
          >
            {(val) => {
              if (val == null || val === "") {
                return (
                  <span className="text-[var(--color-text-muted)]">{placeholder}</span>
                );
              }
              return (
                options.find((o) => o.value === String(val))?.label ?? String(val)
              );
            }}
          </Select.Value>
          <Select.Icon className="shrink-0 text-[var(--color-text-muted)]">
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="inline-flex"
            >
              <ChevronDown className="h-4 w-4" aria-hidden />
            </motion.span>
          </Select.Icon>
        </Select.Trigger>
      </motion.div>

      <Select.Portal>
        <Select.Positioner className="z-[var(--z-popover)] outline-none" sideOffset={6}>
          <Select.Popup className={popupClass}>
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <Select.List className="outline-none">
                {options.map((option) => (
                  <Select.Item
                    key={option.value === "" ? "__empty__" : option.value}
                    value={option.value === "" ? null : option.value}
                    className={itemClass}
                  >
                    <Select.ItemIndicator className="flex w-4 shrink-0 items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-maroon-vibrant" aria-hidden />
                    </Select.ItemIndicator>
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
            </motion.div>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
