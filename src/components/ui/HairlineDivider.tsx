"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HairlineDividerProps {
  className?: string;
  delay?: number;
  vertical?: boolean;
}

export default function HairlineDivider({
  className,
  delay = 0,
  vertical = false,
}: HairlineDividerProps) {
  if (vertical) {
    return (
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
        className={cn("w-px bg-[var(--line-subtle)] origin-top", className)}
      />
    );
  }

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={cn("h-px w-full bg-[var(--line-subtle)] origin-left", className)}
    />
  );
}
