"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function MagneticButton({ children, href }: { children: ReactNode; href: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2, x: 0 }}
      whileTap={{ scale: 0.98 }}
      className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-sm font-medium text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-all"
      style={{ transform: "translate3d(0,0,0)" }}
    >
      <span>{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </motion.a>
  );
}
