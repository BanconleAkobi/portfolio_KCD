"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadlineProps {
  line1: string;
  line2: string;
  className?: string;
}

// Pas d'overflow-hidden — y:24 simple et fiable
// l'overflow-hidden + y:"105%" causait des headlines invisibles
// quand whileInView ne se déclenchait pas au bon frame
const VIEWPORT = { once: true, margin: "-40px" };

export default function SectionHeadline({ line1, line2, className }: SectionHeadlineProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-extrabold text-[clamp(2.2rem,4.5vw,3.75rem)] tracking-tight text-[var(--text-primary)] leading-[1.0]"
      >
        {line1}
      </motion.h2>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
        className="font-display font-light text-[clamp(2.2rem,4.5vw,3.75rem)] tracking-tight text-[var(--text-secondary)] leading-[1.0]"
      >
        {line2}
      </motion.h2>
    </div>
  );
}
