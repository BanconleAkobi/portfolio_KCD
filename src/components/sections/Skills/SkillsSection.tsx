"use client";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { fadeUp, staggerContainer, scrollViewport } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SkillItem {
  name: string;
  level: number;
}

interface SkillDomain {
  category: string;
  items: SkillItem[];
}

const MAX_LEVEL = 4;

export default function SkillsSection() {
  const t = useTranslations("skills");
  const domains = t.raw("domains") as SkillDomain[];
  const tags = t.raw("tags") as string[];
  const levelLabels = t.raw("level_labels") as string[];

  return (
    <section id="skills" className="py-28 lg:py-36 bg-[var(--bg-secondary)]">
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

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={scrollViewport}
          transition={{ delay: 0.2 }}
          className="mb-10 flex items-center gap-6"
        >
          {levelLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex gap-1">
                {Array.from({ length: MAX_LEVEL }).map((_, j) => (
                  <div
                    key={j}
                    className={cn(
                      "w-2.5 h-2.5 border",
                      j <= i
                        ? "bg-[var(--accent-blue)] border-[var(--accent-blue)]"
                        : "border-[var(--line-medium)] bg-transparent"
                    )}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Domain grid */}
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
        >
          {domains.map((domain) => (
            <motion.div key={domain.category} variants={fadeUp}>
              <SkillDomainCard domain={domain} />
            </motion.div>
          ))}
        </motion.div>

        {/* Tags marquee strip */}
        <div className="border-t border-b border-[var(--line-subtle)] py-4 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-4 w-max"
          >
            {[...tags, ...tags].map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="font-mono text-xs tracking-[0.08em] uppercase text-[var(--text-muted)] whitespace-nowrap px-1"
              >
                {tag}
                <span className="ml-4 text-[var(--line-medium)]">·</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SkillDomainCard({ domain }: { domain: SkillDomain }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="border border-[var(--line-subtle)] rounded-sm p-6 flex flex-col gap-5 hover:border-[var(--line-medium)] transition-colors duration-300 bg-[var(--bg-tertiary)]"
    >
      {/* Category header */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--accent-blue)]">
          {domain.category}
        </span>
        <div className="h-px flex-1 max-w-[40px] ml-4 bg-[var(--line-subtle)]" />
      </div>

      {/* Skills */}
      <div className="flex flex-col gap-4">
        {domain.items.map((skill, index) => (
          <SkillRow
            key={skill.name}
            skill={skill}
            inView={inView}
            delay={index * 0.06}
          />
        ))}
      </div>
    </div>
  );
}

function SkillRow({
  skill,
  inView,
  delay,
}: {
  skill: SkillItem;
  inView: boolean;
  delay: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-body text-sm text-[var(--text-secondary)] flex-1 min-w-0 truncate">
        {skill.name}
      </span>
      <div className="flex gap-1 flex-shrink-0" role="meter" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={MAX_LEVEL} aria-label={`${skill.name}: ${skill.level}/${MAX_LEVEL}`}>
        {Array.from({ length: MAX_LEVEL }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              inView
                ? { scale: 1, opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              duration: 0.25,
              delay: delay + i * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              "w-3 h-3 border transition-colors duration-200",
              i < skill.level
                ? "bg-[var(--accent-blue)] border-[var(--accent-blue)]"
                : "border-[var(--line-medium)] bg-transparent"
            )}
          />
        ))}
      </div>
    </div>
  );
}
