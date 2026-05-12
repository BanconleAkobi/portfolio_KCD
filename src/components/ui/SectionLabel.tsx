"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index: string;   // "01", "02"...
  name: string;    // "À PROPOS", "EXPERTISE"...
  className?: string;
}

export default function SectionLabel({ index, name, className }: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex items-center gap-4", className)}
    >
      <span className="font-mono text-[11px] text-[var(--accent-blue)] tracking-[0.15em]">
        {index}
      </span>
      <span className="block w-8 h-px bg-[var(--line-medium)]" />
      <span className="font-mono text-[11px] text-[var(--text-muted)] tracking-[0.14em] uppercase">
        {name}
      </span>
    </motion.div>
  );
}
