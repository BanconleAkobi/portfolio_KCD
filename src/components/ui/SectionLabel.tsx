"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label: string;
  className?: string;
}

export default function SectionLabel({ label, className }: SectionLabelProps) {
  const parts = label.split("———");

  return (
    <div className={cn("flex items-center gap-3 overflow-hidden", className)}>
      {parts[0] && (
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="section-label"
        >
          {parts[0].trim()}
        </motion.span>
      )}
      {parts[1] && (
        <>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="block flex-1 max-w-[80px] h-px bg-[var(--line-subtle)] origin-left"
          />
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="section-label"
          >
            {parts[1].trim()}
          </motion.span>
        </>
      )}
    </div>
  );
}
