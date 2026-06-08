"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PortfolioDetailModal from "@/components/portfolio/PortfolioDetailModal";
import { usePortfolioHighlight } from "@/context/PortfolioHighlightContext";
import type { PortfolioCase } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const TICKER_SPEED = 38;
const DRAG_CLICK_THRESHOLD = 10;
const LOOP_COPIES = 3;

type PortfolioTickerProps = {
  items: PortfolioCase[];
};

function TickerItem({
  item,
  highlighted,
  onSelect,
  suppressClickRef,
}: {
  item: PortfolioCase;
  highlighted?: boolean;
  onSelect: (item: PortfolioCase) => void;
  suppressClickRef: React.MutableRefObject<boolean>;
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const showLabel = hovered || focused;

  const handleActivate = () => {
    if (suppressClickRef.current) return;
    onSelect(item);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={cn(
        "group relative mx-2.5 shrink-0 overflow-hidden rounded-2xl bg-charcoal/5 text-left ring-1 ring-[var(--color-border)] transition-shadow sm:mx-3.5",
        "h-[min(52vw,240px)] w-[min(78vw,300px)] sm:h-60 sm:w-[340px] lg:h-64 lg:w-[360px]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique",
        highlighted && "ring-2 ring-gold-bright shadow-lg"
      )}
      aria-label={`Buka detail ${item.name}`}
    >
      <Image
        src={item.images[0]}
        alt={item.name}
        fill
        className="pointer-events-none object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 78vw, 360px"
        draggable={false}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap gap-1.5 bg-gradient-to-b from-charcoal/80 via-charcoal/45 to-transparent p-3 sm:gap-2 sm:p-4">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm sm:px-3 sm:py-1 sm:text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: showLabel ? 1 : 0, y: showLabel ? 0 : 10 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/95 via-charcoal/75 to-transparent px-3 py-3 sm:px-4 sm:py-4"
      >
        <p className="line-clamp-2 text-left text-sm font-semibold leading-snug text-white sm:text-base">
          {item.name}
        </p>
      </motion.div>

      <span className="pointer-events-none absolute bottom-3 right-3 rounded bg-black/50 px-2 py-0.5 text-[10px] text-white/90 sm:hidden">
        Klik untuk detail
      </span>
    </div>
  );
}

export default function PortfolioTicker({ items }: PortfolioTickerProps) {
  const { highlightCaseId, setHighlightCaseId } = usePortfolioHighlight();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const suppressClickRef = useRef(false);
  const [segmentWidth, setSegmentWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [modalItem, setModalItem] = useState<PortfolioCase | null>(null);
  const x = useMotionValue(0);

  const loopedItems = useMemo(
    () => Array.from({ length: LOOP_COPIES }, () => items).flat(),
    [items]
  );

  const wrapPosition = useCallback(
    (value: number) => {
      if (segmentWidth <= 0) return value;
      let next = value;
      while (next <= -2 * segmentWidth) next += segmentWidth;
      while (next > 0) next -= segmentWidth;
      return next;
    },
    [segmentWidth]
  );

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const seg = track.scrollWidth / LOOP_COPIES;
      setSegmentWidth(seg);
      if (seg > 0) x.set(-seg);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items, x]);

  useEffect(() => {
    if (!highlightCaseId) return;
    setHoverPaused(true);
    const t = window.setTimeout(() => {
      setHoverPaused(false);
      setHighlightCaseId(null);
    }, 3500);
    return () => window.clearTimeout(t);
  }, [highlightCaseId, setHighlightCaseId]);

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion || isDragging || hoverPaused || segmentWidth <= 0) {
      return;
    }
    const moveBy = (TICKER_SPEED * delta) / 1000;
    x.set(wrapPosition(x.get() - moveBy));
  });

  if (items.length === 0) {
    return (
      <p className="mt-8 text-center text-sm text-[var(--color-text-muted)]">
        Belum ada portofolio untuk kategori ini.
      </p>
    );
  }

  if (prefersReducedMotion) {
    return (
      <>
        <div className="mt-8 flex gap-3 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
          {items.map((item) => (
            <TickerItem
              key={item.id}
              item={item}
              highlighted={highlightCaseId === item.id}
              onSelect={setModalItem}
              suppressClickRef={suppressClickRef}
            />
          ))}
        </div>
        <PortfolioDetailModal
          item={modalItem}
          onClose={() => setModalItem(null)}
        />
      </>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="relative -mx-4 mt-8 overflow-hidden sm:-mx-6 lg:-mx-8"
        onMouseEnter={() => setHoverPaused(true)}
        onMouseLeave={() => setHoverPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[var(--color-bg-primary)] to-transparent sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[var(--color-bg-primary)] to-transparent sm:w-16" />

        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={
            segmentWidth > 0
              ? { left: -2 * segmentWidth, right: 0 }
              : { left: 0, right: 0 }
          }
          dragElastic={0.04}
          dragMomentum
          dragPropagation={false}
          style={{ x }}
          onDragStart={() => {
            suppressClickRef.current = false;
            setIsDragging(true);
          }}
          onDrag={(_, info) => {
            if (
              Math.abs(info.offset.x) > DRAG_CLICK_THRESHOLD ||
              Math.abs(info.offset.y) > DRAG_CLICK_THRESHOLD
            ) {
              suppressClickRef.current = true;
            }
          }}
          onDragEnd={() => {
            x.set(wrapPosition(x.get()));
            setIsDragging(false);
            window.setTimeout(() => {
              suppressClickRef.current = false;
            }, 120);
          }}
          className="flex w-max cursor-grab py-2 active:cursor-grabbing"
        >
          {loopedItems.map((item, i) => (
            <TickerItem
              key={`${item.id}-${i}`}
              item={item}
              highlighted={highlightCaseId === item.id}
              onSelect={setModalItem}
              suppressClickRef={suppressClickRef}
            />
          ))}
        </motion.div>
      </div>

      <p className="mt-2 text-center text-xs text-[var(--color-text-muted)]">
        Geser untuk melihat portofolio lainnya · Klik untuk detail
      </p>

      <PortfolioDetailModal
        item={modalItem}
        onClose={() => setModalItem(null)}
      />
    </>
  );
}
