"use client";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import TechTag from "@/components/ui/TechTag";
import { fadeUp, staggerContainer, scrollViewport } from "@/lib/animations";

const ENTRY_KEYS = ["timisoara", "novares", "vr_tech", "insa"] as const;

export default function ExperienceSection() {
  const t = useTranslations("experience");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="experience" className="py-28 lg:py-36 bg-[var(--bg-secondary)]" ref={containerRef}>
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

        {/* Timeline */}
        <div className="relative flex flex-col gap-0">

          {/* Spine line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--line-subtle)] md:left-1/2 overflow-hidden">
            <motion.div
              className="w-full bg-[var(--accent-blue)] origin-top"
              style={{ height: lineHeight, opacity: 0.4 }}
            />
          </div>

          {ENTRY_KEYS.map((key, i) => (
            <TimelineEntry
              key={key}
              company={t(`entries.${key}.company`)}
              role={t(`entries.${key}.role`)}
              period={t(`entries.${key}.period`)}
              location={t(`entries.${key}.location`)}
              description={t(`entries.${key}.description`)}
              tags={t.raw(`entries.${key}.tags`) as string[]}
              index={i}
              isLast={i === ENTRY_KEYS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({
  company,
  role,
  period,
  location,
  description,
  tags,
  index,
  isLast,
}: {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
  index: number;
  isLast: boolean;
}) {
  const isRight = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className={`relative flex items-start gap-8 pb-16 last:pb-0 md:gap-0 ${isLast ? "" : ""}`}
    >
      {/* Mobile layout: all left-aligned with spine on left */}
      <div className="md:hidden pl-12 flex flex-col gap-3 flex-1">
        <EntryCard
          company={company}
          role={role}
          period={period}
          location={location}
          description={description}
          tags={tags}
        />
      </div>

      {/* Desktop layout: alternating sides */}
      <div className="hidden md:grid grid-cols-2 w-full">
        {/* Left content */}
        <div className={`pr-12 ${isRight ? "flex justify-end" : ""}`}>
          {isRight && (
            <EntryCard
              company={company}
              role={role}
              period={period}
              location={location}
              description={description}
              tags={tags}
            />
          )}
        </div>

        {/* Right content */}
        <div className={`pl-12 ${!isRight ? "flex justify-start" : ""}`}>
          {!isRight && (
            <EntryCard
              company={company}
              role={role}
              period={period}
              location={location}
              description={description}
              tags={tags}
            />
          )}
        </div>
      </div>

      {/* Timeline node */}
      <div className="absolute left-4 top-1.5 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 + 0.2 }}
          className="w-2.5 h-2.5 rounded-full bg-[var(--accent-blue)] shadow-[0_0_12px_2px_rgba(59,130,246,0.4)]"
        />
      </div>
    </motion.div>
  );
}

function EntryCard({
  company,
  role,
  period,
  location,
  description,
  tags,
}: {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
}) {
  return (
    <div className="max-w-sm w-full flex flex-col gap-4 group">
      {/* Company name */}
      <div>
        <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] leading-tight mb-1">
          {company}
        </h3>
        <p className="font-body text-sm text-[var(--accent-blue)]">{role}</p>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-[var(--text-muted)]">{period}</span>
        <div className="w-px h-3 bg-[var(--line-subtle)]" />
        <span className="font-mono text-xs text-[var(--text-muted)]">{location}</span>
      </div>

      {/* Description */}
      <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TechTag key={tag} label={tag} />
        ))}
      </div>
    </div>
  );
}
