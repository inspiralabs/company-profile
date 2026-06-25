"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const PHRASE = "Mitra Solusi Digital Anda";
const SPEED = 60; // ms per character

export default function TypewriterText() {
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState(reduceMotion ? PHRASE : "");
  const [done, setDone] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) return;

    if (text.length >= PHRASE.length) {
      setDone(true);
      return;
    }

    const t = setTimeout(
      () => setText(PHRASE.slice(0, text.length + 1)),
      SPEED
    );
    return () => clearTimeout(t);
  }, [text, reduceMotion]);

  return (
    <span aria-label={PHRASE}>
      {text}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "linear", times: [0, 0.5] }}
          className="ml-0.5 inline-block h-[1em] w-0.5 align-middle bg-current"
          aria-hidden
        />
      )}
    </span>
  );
}
