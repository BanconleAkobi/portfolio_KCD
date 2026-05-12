"use client";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import TechTag from "@/components/ui/TechTag";
import { cn } from "@/lib/utils";

interface ProjectSpec {
  label: string;
  value: string;
}

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  specs: ProjectSpec[];
  tags: string[];
  color: string;
}

export default function ProjectsSection() {
  const t = useTranslations("projects");
  const projects = t.raw("items") as ProjectItem[];

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = useCallback(
    (index: number) => {
      setDirection(index > active ? 1 : -1);
      setActive(index);
    },
    [active]
  );

  const prev = () => navigate(active === 0 ? projects.length - 1 : active - 1);
  const next = () => navigate(active === projects.length - 1 ? 0 : active + 1);

  return (
    <section id="projects" className="py-28 lg:py-36 bg-[var(--bg-primary)]">
      <div className="section-container">

        <SectionLabel label={t("section_label")} className="mb-16" />

        {/* Headline */}
        <div className="mb-16 flex flex-col gap-1">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "105%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
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
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="font-display font-bold text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-[var(--text-secondary)]"
            >
              {t("headline_2")}
            </motion.h2>
          </div>
        </div>

        {/* Project showcase */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <ProjectCard
              key={projects[active].id}
              project={projects[active]}
              direction={direction}
              specsLabel={t("specs_label")}
              ctaLabel={t("cta")}
              indexLabel={t("index_label")}
              total={projects.length}
            />
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          {/* Project dots */}
          <div className="flex items-center gap-3">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => navigate(i)}
                aria-label={`Project ${i + 1}: ${p.title}`}
                className={cn(
                  "transition-all duration-300",
                  i === active
                    ? "w-8 h-1 bg-[var(--accent-blue)] rounded-full"
                    : "w-1 h-1 bg-[var(--line-medium)] rounded-full hover:bg-[var(--line-bright)]"
                )}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous project"
              className="w-10 h-10 border border-[var(--line-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--line-bright)] transition-all duration-200 rounded-sm"
            >
              ←
            </button>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              aria-label="Next project"
              className="w-10 h-10 border border-[var(--line-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--line-bright)] transition-all duration-200 rounded-sm"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  direction,
  specsLabel,
  ctaLabel,
  indexLabel,
  total,
}: {
  project: ProjectItem;
  direction: number;
  specsLabel: string;
  ctaLabel: string;
  indexLabel: string;
  total: number;
}) {
  return (
    <motion.div
      custom={direction}
      initial={{ opacity: 0, x: direction * 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -40 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[var(--line-subtle)] rounded-sm overflow-hidden min-h-[480px]"
    >
      {/* Left — content */}
      <div className="p-8 lg:p-12 flex flex-col justify-between gap-8" style={{ background: "var(--bg-tertiary)" }}>
        {/* Index */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)]">
            {indexLabel}
          </span>
          <span className="font-mono text-[10px] text-[var(--accent-blue)]">{project.number}</span>
          <div className="h-px flex-1 bg-[var(--line-subtle)] max-w-[60px]" />
        </div>

        <div className="flex flex-col gap-5 flex-1">
          {/* Title */}
          <div>
            <p className="font-mono text-xs tracking-wider text-[var(--text-muted)] mb-2">{project.subtitle}</p>
            <h3 className="font-display font-bold text-[clamp(1.5rem,2.5vw,2.25rem)] text-[var(--text-primary)] leading-tight tracking-tight">
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed max-w-prose">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <TechTag key={tag} label={tag} />
            ))}
          </div>
        </div>
      </div>

      {/* Right — specifications */}
      <div
        className="p-8 lg:p-12 flex flex-col justify-between border-l border-[var(--line-subtle)]"
        style={{ background: project.color || "var(--bg-secondary)" }}
      >
        {/* Specs table */}
        <div className="flex flex-col gap-6">
          <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)]">
            {specsLabel}
          </span>

          <div className="flex flex-col gap-0">
            {project.specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex items-start justify-between py-4 gap-6 ${i < project.specs.length - 1 ? "border-b border-[var(--line-subtle)]" : ""}`}
              >
                <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--text-muted)] flex-shrink-0 pt-0.5">
                  {spec.label}
                </span>
                <span className="font-mono text-xs text-[var(--text-secondary)] text-right">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative engineering grid */}
        <div className="mt-8 relative h-24 border border-[var(--line-subtle)] rounded-sm overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(var(--line-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--line-subtle) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <span className="font-mono text-[10px] text-[var(--accent-blue)] tracking-widest uppercase relative z-10 opacity-60">
            {project.number} · {project.id.toUpperCase()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
