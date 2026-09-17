"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div ref={ref} className="text-4xl font-semibold tracking-[-0.06em] text-slate-900 md:text-6xl">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7 }}
      >
        {inView ? value : 0}
      </motion.span>
      {suffix}
    </div>
  );
}
