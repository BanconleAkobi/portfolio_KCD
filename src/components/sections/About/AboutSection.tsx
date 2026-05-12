"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import HairlineDivider from "@/components/ui/HairlineDivider";
import { fadeUp, staggerContainer, scrollViewport } from "@/lib/animations";

const DISCIPLINE_KEYS = ["simulation", "cad", "vr", "materials", "imaging", "methods"] as const;

const DISCIPLINE_ICONS: Record<string, string> = {
  simulation: "∿",
  cad: "⬡",
  vr: "◈",
  materials: "⬟",
  imaging: "◎",
  methods: "⊕",
};

export default function AboutSection() {
  const t = useTranslations("about");

  const statusItems = [
    { label: "FORMATION", value: t("status_school") },
    { label: "LOCALISATION", value: t("status_location") },
    { label: "NIVEAU", value: t("status_level") },
  ];

  return (
    <section id="about" className="py-28 lg:py-36 bg-[var(--bg-secondary)]">
      <div className="section-container">

        <SectionLabel label={t("section_label")} className="mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT — Bio */}
          <div className="flex flex-col gap-8">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "105%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={scrollViewport}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold leading-[1.05] tracking-tight text-[clamp(2rem,4vw,3.25rem)] text-[var(--text-primary)]"
              >
                {t("headline_1")}
              </motion.h2>
            </div>
            <div className="overflow-hidden -mt-4">
              <motion.h2
                initial={{ y: "105%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={scrollViewport}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                className="font-display font-bold leading-[1.05] tracking-tight text-[clamp(2rem,4vw,3.25rem)] text-[var(--text-secondary)]"
              >
                {t("headline_2")}
              </motion.h2>
            </div>

            <motion.div
              variants={staggerContainer(0.15, 0.3)}
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              className="flex flex-col gap-5"
            >
              <motion.p variants={fadeUp} className="font-body text-[var(--text-secondary)] leading-relaxed text-[17px]">
                {t("bio")}
              </motion.p>
              <motion.p variants={fadeUp} className="font-body text-[var(--text-muted)] leading-relaxed text-base">
                {t("bio_2")}
              </motion.p>
            </motion.div>

            {/* Status strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewport}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 grid grid-cols-3 gap-0 border border-[var(--line-subtle)] rounded-sm overflow-hidden"
            >
              {statusItems.map((item, i) => (
                <div
                  key={item.label}
                  className={`p-4 flex flex-col gap-1.5 ${i < 2 ? "border-r border-[var(--line-subtle)]" : ""}`}
                >
                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--text-muted)]">
                    {item.label}
                  </span>
                  <span className="font-body text-xs text-[var(--text-secondary)] leading-tight">
                    {item.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Disciplines grid */}
          <div className="flex flex-col gap-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={scrollViewport}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)]"
            >
              DOMAINES D'EXPERTISE
            </motion.p>

            <motion.div
              variants={staggerContainer(0.07, 0.25)}
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              className="grid grid-cols-2 gap-0 border border-[var(--line-subtle)] rounded-sm overflow-hidden"
            >
              {DISCIPLINE_KEYS.map((key, i) => (
                <motion.div
                  key={key}
                  variants={fadeUp}
                  className={`
                    p-5 flex flex-col gap-3 transition-all duration-300 group cursor-default
                    hover:bg-[var(--bg-tertiary)]
                    ${i % 2 === 0 ? "border-r border-[var(--line-subtle)]" : ""}
                    ${i < 4 ? "border-b border-[var(--line-subtle)]" : ""}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="text-lg text-[var(--text-muted)] group-hover:text-[var(--accent-blue)] transition-colors duration-200 font-mono"
                      aria-hidden="true"
                    >
                      {DISCIPLINE_ICONS[key]}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
                      {key.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-body font-medium text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors leading-snug mb-1">
                      {t(`disciplines.${key}.title`)}
                    </p>
                    <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed">
                      {t(`disciplines.${key}.desc`)}
                    </p>
                  </div>
                  {/* Bottom accent line */}
                  <div className="h-px bg-[var(--accent-blue)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
