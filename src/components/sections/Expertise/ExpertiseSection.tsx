"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, scrollViewport } from "@/lib/animations";
import { RulerMarks } from "@/components/ui/Mechanical";

const CATEGORY_KEYS = ["cad", "fea", "vr", "imaging", "workflow"] as const;
const PILLAR_KEYS   = ["rigor", "precision", "innovation"] as const;

export default function ExpertiseSection() {
  const t = useTranslations("expertise");

  return (
    <>
      {/* ─── STACK TECHNIQUE ──────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 bg-[var(--bg-primary)]">
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 mb-16"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--accent-blue)]">
                Stack technique
              </span>
              <span className="font-mono text-[10px] tracking-[0.12em] text-[var(--text-muted)]">
                / {String(CATEGORY_KEYS.length).padStart(2, "0")} disciplines
              </span>
              <div className="flex-1 h-px bg-[var(--line-subtle)]" />
            </div>
            <RulerMarks count={40} className="opacity-25" />
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            className="flex flex-col"
          >
            {CATEGORY_KEYS.map((key, i) => (
              <motion.div
                key={key}
                variants={fadeUp}
                className="group relative grid grid-cols-12 gap-4 lg:gap-6 py-8 lg:py-10 border-t border-[var(--line-subtle)] last:border-b cursor-default transition-colors duration-300 hover:bg-[var(--bg-secondary)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 bottom-0 w-px bg-[var(--accent-blue)] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500"
                />

                <div className="col-span-2 lg:col-span-1 flex items-start">
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">OP</span>
                    <span className="font-mono text-base text-[var(--text-secondary)] group-hover:text-[var(--accent-blue)] transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="col-span-10 lg:col-span-3 flex items-start">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--text-muted)]">
                    {t(`categories.${key}.label`)}
                  </span>
                </div>

                {/* Titre — poids modéré, leading aéré */}
                <div className="col-span-12 lg:col-span-4">
                  <h3 className="font-display font-semibold text-[clamp(1.35rem,2.2vw,1.85rem)] text-[var(--text-primary)] leading-[1.15] tracking-[-0.005em]">
                    {t(`categories.${key}.title`)}
                  </h3>
                </div>

                <div className="col-span-12 lg:col-span-4 flex flex-wrap gap-x-5 gap-y-2 items-center lg:justify-end pt-1">
                  {(t.raw(`categories.${key}.tools`) as string[]).map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-xs text-[var(--accent-silver)] group-hover:text-[var(--text-secondary)] transition-colors whitespace-nowrap"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PILIERS ─────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 bg-[var(--bg-secondary)] border-t border-[var(--line-subtle)]">
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.6 }}
            className="mb-14 lg:mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--accent-blue)]">
                Philosophie · 03 axiomes
              </span>
              <div className="flex-1 h-px bg-[var(--line-subtle)]" />
            </div>
            <h2 className="font-display font-semibold text-[clamp(1.85rem,3.6vw,3rem)] tracking-[-0.005em] leading-[1.15] text-[var(--text-primary)] max-w-3xl">
              Trois principes qui structurent chaque projet
              <span className="text-[var(--text-secondary)] font-light"> d&apos;ingénierie.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
          >
            {PILLAR_KEYS.map((key, i) => (
              <motion.div
                key={key}
                variants={fadeUp}
                className="relative border border-[var(--line-medium)] p-7 lg:p-8 flex flex-col gap-5 hover:bg-[var(--bg-tertiary)] transition-colors duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">AX·</span>
                    <span className="font-mono text-xl font-light text-[var(--accent-blue)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="w-10 h-px bg-[var(--line-subtle)]" />
                </div>

                {/* Titre PILIER — taille réduite, leading normal, pas écrasé */}
                <h3 className="font-display font-semibold text-[clamp(1.25rem,1.8vw,1.6rem)] tracking-[0.04em] text-[var(--text-primary)] leading-[1.2] uppercase">
                  {t(`pillars.${key}.title`)}
                </h3>

                <div className="w-12 h-px bg-[var(--accent-blue)] opacity-60" />

                <p className="font-body font-light text-[15px] text-[var(--text-muted)] leading-[1.65]">
                  {t(`pillars.${key}.desc`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
