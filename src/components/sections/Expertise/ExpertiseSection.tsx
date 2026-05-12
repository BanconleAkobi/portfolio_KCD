"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import GlassPanel from "@/components/ui/GlassPanel";
import HairlineDivider from "@/components/ui/HairlineDivider";
import { fadeUp, staggerContainer, scrollViewport } from "@/lib/animations";

const CATEGORY_KEYS = ["cad", "fea", "vr", "imaging", "workflow"] as const;

export default function ExpertiseSection() {
  const t = useTranslations("expertise");

  const pillars = [
    { key: "rigor" as const },
    { key: "precision" as const },
    { key: "innovation" as const },
  ];

  return (
    <section id="expertise" className="py-28 lg:py-36 bg-[var(--bg-primary)]">
      <div className="section-container">

        <SectionLabel label={t("section_label")} className="mb-16" />

        {/* Headline */}
        <div className="mb-16 flex flex-col gap-1">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "105%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={scrollViewport}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-[var(--text-primary)]"
            >
              {t("headline_1")}
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "105%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={scrollViewport}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="font-display font-bold text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-[var(--text-secondary)]"
            >
              {t("headline_2")}
            </motion.h2>
          </div>
        </div>

        {/* Tool cards */}
        <motion.div
          variants={staggerContainer(0.09, 0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
        >
          {CATEGORY_KEYS.map((key) => (
            <motion.div key={key} variants={fadeUp}>
              <ToolCard
                label={t(`categories.${key}.label`)}
                title={t(`categories.${key}.title`)}
                tools={(t.raw(`categories.${key}.tools`) as string[])}
              />
            </motion.div>
          ))}
        </motion.div>

        <HairlineDivider className="my-12" />

        {/* Engineering pillars strip */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[var(--line-subtle)] rounded-sm overflow-hidden"
        >
          {pillars.map(({ key }, i) => (
            <motion.div
              key={key}
              variants={fadeUp}
              className={`p-8 flex flex-col gap-4 group hover:bg-[var(--bg-tertiary)] transition-colors duration-300 ${i < 2 ? "md:border-r border-b md:border-b-0 border-[var(--line-subtle)]" : ""}`}
            >
              <div className="flex items-center gap-4">
                {/* Pillar number */}
                <span className="font-mono text-[10px] tracking-widest text-[var(--text-muted)]">
                  0{i + 1}
                </span>
                <div className="h-px flex-1 bg-[var(--line-subtle)]" />
              </div>
              <h3 className="font-mono text-sm tracking-[0.12em] text-[var(--accent-blue)] font-medium">
                {t(`pillars.${key}.title`)}
              </h3>
              <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed">
                {t(`pillars.${key}.desc`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ToolCard({
  label,
  title,
  tools,
}: {
  label: string;
  title: string;
  tools: string[];
}) {
  return (
    <GlassPanel
      hoverable
      className="p-5 flex flex-col gap-4 h-full group relative overflow-hidden"
    >
      {/* Top label */}
      <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--text-muted)]">
        {label}
      </span>

      {/* Title */}
      <h3 className="font-body font-semibold text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
        {title}
      </h3>

      {/* Tool list */}
      <ul className="flex flex-col gap-1.5 flex-1">
        {tools.map((tool) => (
          <li key={tool} className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[var(--text-muted)] group-hover:bg-[var(--accent-blue)] transition-colors flex-shrink-0" />
            <span className="font-mono text-xs text-[var(--accent-silver)]">{tool}</span>
          </li>
        ))}
      </ul>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-[var(--accent-blue)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
    </GlassPanel>
  );
}
