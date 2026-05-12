"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, scrollViewport } from "@/lib/animations";

const DISCIPLINES = ["simulation", "cad", "vr", "materials", "imaging", "methods"] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export default function AboutSection() {
  const t = useTranslations("about");

  return (
    <section className="relative py-24 lg:py-32 bg-[var(--bg-secondary)]">
      <div className="section-container relative z-10">

        {/* Header de section */}
        <div className="flex items-center gap-4 mb-14 lg:mb-16">
          <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--accent-blue)]">REF · 01.A</span>
          <div className="flex-1 h-px bg-[var(--line-subtle)]" />
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-muted)] hidden md:inline">
            Profil ingénieur
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">

          {/* GAUCHE — Bio + statuts */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewport}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col gap-2"
            >
              <h2 className="font-display font-semibold text-[clamp(1.75rem,3.4vw,2.75rem)] tracking-[-0.005em] leading-[1.1] text-[var(--text-primary)]">
                {t("headline_1")}
              </h2>
              <h2 className="font-display font-light text-[clamp(1.75rem,3.4vw,2.75rem)] tracking-[-0.005em] leading-[1.1] text-[var(--text-secondary)]">
                {t("headline_2")}
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.12, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              className="flex flex-col gap-5 relative pl-6 border-l border-[var(--line-subtle)]"
            >
              <span aria-hidden="true" className="absolute top-1 -left-[3px] w-1.5 h-1.5 bg-[var(--accent-blue)] rounded-full" />
              <motion.p variants={fadeUp} className="font-body font-light text-[var(--text-secondary)] leading-[1.75] text-[17px]">
                {t("bio")}
              </motion.p>
              <motion.p variants={fadeUp} className="font-body font-light text-[var(--text-muted)] leading-[1.75] text-base">
                {t("bio_2")}
              </motion.p>
            </motion.div>

            {/* Cartouche statuts */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewport}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-2 border border-[var(--line-medium)]"
            >
              <div className="grid grid-cols-3 divide-x divide-[var(--line-subtle)]">
                {[
                  { label: "FORMATION", value: t("status_school") },
                  { label: "LIEU",      value: t("status_location") },
                  { label: "NIVEAU",    value: t("status_level") },
                ].map(({ label, value }) => (
                  <div key={label} className="px-4 py-4 flex flex-col gap-2 min-w-0">
                    <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--text-muted)]">{label}</span>
                    <span className="font-body font-normal text-xs text-[var(--text-secondary)] leading-tight truncate">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* DROITE — Disciplines */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:pl-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--text-muted)]">
                Domaines
              </span>
              <span className="font-mono text-[10px] text-[var(--accent-blue)]">
                · {String(DISCIPLINES.length).padStart(2, "0")} unités
              </span>
              <div className="flex-1 h-px bg-[var(--line-subtle)]" />
            </div>

            <motion.div
              variants={staggerContainer(0.06, 0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              className="grid grid-cols-1 sm:grid-cols-2 border border-[var(--line-medium)]"
            >
              {DISCIPLINES.map((key, i) => {
                const isRight = i % 2 === 1;
                const isLastRow = i >= DISCIPLINES.length - 2;
                return (
                  <motion.div
                    key={key}
                    variants={fadeUp}
                    className={`
                      relative p-5 lg:p-6 flex flex-col gap-3 group cursor-default
                      hover:bg-[var(--bg-primary)] transition-colors duration-300
                      ${!isRight ? "sm:border-r border-[var(--line-subtle)]" : ""}
                      ${!isLastRow ? "border-b border-[var(--line-subtle)]" : ""}
                    `}
                  >
                    <span className="absolute top-2 right-3 font-mono text-[9px] tracking-[0.16em] text-[var(--text-muted)] opacity-60">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="w-5 h-px bg-[var(--accent-blue)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>

                    <p className="font-body font-medium text-[15px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors leading-snug">
                      {t(`disciplines.${key}.title`)}
                    </p>
                    <p className="font-mono text-[10px] text-[var(--text-muted)] leading-relaxed tracking-wide">
                      {t(`disciplines.${key}.desc`)}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
