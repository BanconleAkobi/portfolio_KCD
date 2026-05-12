"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { RulerMarks } from "@/components/ui/Mechanical";

interface PageHeroProps {
  index: string;
  name: string;
  title: string;
  subtitle?: string;
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PageHero({ index, name, title, subtitle, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative pt-28 pb-20 lg:pt-36 lg:pb-28",
        "border-b border-[var(--line-subtle)]",
        className
      )}
    >
      {/* Grille technique de fond, très discrète */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="section-container relative z-10">
        <RulerMarks count={36} className="opacity-30 mb-10 lg:mb-14" />
      </div>

      <div className="section-container relative z-10">
        {/* Index + nom de section */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="font-mono text-[11px] text-[var(--accent-blue)] tracking-[0.15em]">
            {index}
          </span>
          <span className="block w-12 h-px bg-[var(--line-medium)]" />
          <span className="font-mono text-[11px] text-[var(--text-muted)] tracking-[0.18em] uppercase">
            {name}
          </span>
        </motion.div>

        {/* Titre — poids modéré, leading aéré, pas écrasé */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.18 }}
          className="font-display font-semibold text-[clamp(2.75rem,6.5vw,5.5rem)] tracking-[-0.01em] leading-[1.08] text-[var(--text-primary)] mb-8"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <div className="flex items-start gap-4 lg:gap-6 max-w-3xl">
            <motion.span
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
              className="block w-px bg-[var(--accent-blue)] origin-top mt-2 h-12"
              aria-hidden="true"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.3 }}
              className="font-body font-light text-[var(--text-secondary)] text-lg lg:text-xl leading-[1.6]"
            >
              {subtitle}
            </motion.p>
          </div>
        )}
      </div>
    </section>
  );
}
