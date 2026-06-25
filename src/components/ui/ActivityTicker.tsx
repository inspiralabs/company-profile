"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

const SPEED = 60; // px per second

export default function ActivityTicker({
  images,
  reverse = false,
}: {
  images: string[];
  reverse?: boolean;
}) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  const doubled = [...images, ...images];

  useAnimationFrame((_, delta) => {
    if (paused.current) return;
    const container = containerRef.current;
    if (!container) return;
    const half = container.scrollWidth / 2;

    if (reverse) {
      let newX = x.get() + (delta / 1000) * SPEED;
      if (newX >= 0) newX -= half;
      x.set(newX);
    } else {
      x.set((x.get() - (delta / 1000) * SPEED) % -half);
    }
  });

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <motion.div
        ref={containerRef}
        style={{ x }}
        className="flex w-max gap-4"
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="relative h-64 w-96 shrink-0 overflow-hidden rounded-2xl"
          >
            <Image
              src={src}
              alt={`Kegiatan InspiraLabs ${(i % images.length) + 1}`}
              fill
              sizes="384px"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
