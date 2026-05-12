"use client";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, scrollViewport } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { RulerMarks, HatchPattern } from "@/components/ui/Mechanical";

interface SkillItem   { name: string; level: number }
interface SkillDomain { category: string; items: SkillItem[] }
const MAX = 4;

export default function SkillsSection() {
  const t       = useTranslations("skills");
  const domains = t.raw("domains") as SkillDomain[];
  const tags    = t.raw("tags") as string[];
  const labels  = t.raw("level_labels") as string[];

  return (
    <>
      {/* SECTION 1 — Tableau de bord */}
      <section className="relative py-24 lg:py-32 bg-[var(--bg-primary)]">
        <div className="section-container relative z-10">

          {/* Header + légende */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 mb-16 pb-8 border-b border-[var(--line-subtle)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--accent-blue)]">
                  Cartographie · instruments
                </span>
                <span className="font-mono text-[10px] tracking-[0.12em] text-[var(--text-muted)]">
                  / {String(domains.length).padStart(2, "0")}
                </span>
              </div>

              {/* Légende des niveaux */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 items-center">
                {labels.map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: MAX }).map((_, j) => (
                        <div
                          key={j}
                          className={cn(
                            "w-2 h-2",
                            j <= i ? "bg-[var(--accent-blue)]" : "bg-[var(--line-medium)]"
                          )}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-wider whitespace-nowrap">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <RulerMarks count={40} className="opacity-30" />
          </motion.div>

          {/* Grille de domaines */}
          <motion.div
            variants={staggerContainer(0.07, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5"
          >
            {domains.map((d, i) => (
              <motion.div key={d.category} variants={fadeUp}>
                <DomainCard domain={d} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — Marquee vocabulaire technique */}
      <section className="relative py-14 lg:py-16 bg-[var(--bg-secondary)] border-t border-[var(--line-subtle)] overflow-hidden">
        <div className="section-container mb-6 flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--accent-blue)]">
            Vocabulaire technique
          </span>
          <div className="flex-1 h-px bg-[var(--line-subtle)]" />
          <span className="font-mono text-[10px] tracking-[0.14em] text-[var(--text-muted)] hidden md:inline">
            DEFILEMENT · 50s
          </span>
        </div>
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 w-max"
          >
            {[...tags, ...tags].map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="font-display font-light text-2xl lg:text-4xl text-[var(--text-muted)] whitespace-nowrap flex items-center gap-12"
              >
                {tag}
                <span className="text-[var(--accent-blue)] opacity-60 font-mono text-base">·</span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

function DomainCard({ domain, index }: { domain: SkillDomain; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className="relative border border-[var(--line-medium)] p-6 lg:p-7 flex flex-col gap-5 bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] hover:border-[var(--line-bright)] transition-colors duration-300 h-full overflow-hidden"
    >
      <HatchPattern className="absolute -top-1 -right-1 w-12 h-12 opacity-50" />

      {/* Header card */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-[var(--text-muted)]">DOM·</span>
          <span className="font-mono text-base text-[var(--accent-blue)]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <span className="font-mono text-[10px] text-[var(--text-muted)]">
          {domain.items.length} unités
        </span>
      </div>

      {/* Catégorie */}
      <h3 className="font-display font-bold text-base text-[var(--text-primary)] tracking-tight leading-tight border-b border-[var(--line-subtle)] pb-3">
        {domain.category}
      </h3>

      {/* Skills */}
      <div className="flex flex-col gap-3.5 flex-1">
        {domain.items.map((skill, i) => (
          <div key={skill.name} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-3">
              <span className="font-body font-medium text-sm text-[var(--text-secondary)] flex-1 min-w-0 truncate">
                {skill.name}
              </span>
              <div
                className="flex gap-1 flex-shrink-0"
                role="meter"
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={MAX}
              >
                {Array.from({ length: MAX }).map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.35, delay: i * 0.05 + j * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "w-3 h-2.5 origin-bottom",
                      j < skill.level
                        ? "bg-[var(--accent-blue)]"
                        : "bg-[var(--line-medium)]"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
