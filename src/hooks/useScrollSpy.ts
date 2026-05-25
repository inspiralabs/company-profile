"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useScrollSpy(sectionIds: string[], offset = 100) {
  const [activeId, setActiveId] = useState<string>("");
  const [forcedId, setForcedId] = useState<string>("");
  const forcedTimer = useRef<ReturnType<typeof setTimeout>>();

  // Allow external code to force the active section (e.g., on nav click)
  const forceActive = useCallback((id: string) => {
    setForcedId(id);
    // Clear forced state after scroll animation settles
    if (forcedTimer.current) clearTimeout(forcedTimer.current);
    forcedTimer.current = setTimeout(() => setForcedId(""), 800);
  }, []);

  const computeActive = useCallback(() => {
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollY = window.scrollY;

    // At the bottom of the page, activate the last found section
    if (scrollY + windowHeight >= docHeight - 30) {
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        if (document.getElementById(sectionIds[i])) {
          setActiveId(sectionIds[i]);
          return;
        }
      }
    }

    // Walk through sections in order. Pick the last one whose top has scrolled
    // past the offset line (top of viewport + offset pixels).
    let current = "";
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= offset) {
        current = id;
      }
    }

    if (current) {
      setActiveId(current);
    } else {
      const first = sectionIds.find((id) => document.getElementById(id));
      if (first) setActiveId(first);
    }
  }, [sectionIds, offset]);

  useEffect(() => {
    computeActive();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          computeActive();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [computeActive]);

  // Return forced ID if set, otherwise computed scroll-based ID
  return { activeId: forcedId || activeId, forceActive };
}
