"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import TechTag from "@/components/ui/TechTag";
import { RulerMarks } from "@/components/ui/Mechanical";

const ENTRY_KEYS = ["timisoara", "novares", "vr_tech", "insa"] as const;

export default function ExperienceSection() {
  const t = useTranslations("experience");

  return (
    <section className="relative py-24 lg:py-32 bg-[var(--bg-primary)]">
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16"
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--accent-blue)]">
              Parcours · log de carrière
            </span>
            <div className="flex-1 h-px bg-[var(--line-subtle)]" />
            <span className="font-mono text-[10px] tracking-[0.14em] text-[var(--text-muted)]">
              {String(ENTRY_KEYS.length).padStart(2, "0")} entrées
            </span>
          </div>
          <RulerMarks count={32} className="opacity-30" />
        </motion.div>

        <div className="relative">
          {/* Ligne verticale chronologique */}
          <div
            aria-hidden="true"
            className="absolute left-[1.05rem] lg:left-[calc(25%-0.5rem)] top-0 bottom-0 w-px bg-[var(--line-subtle)]"
          />

          <div className="flex flex-col">
            {ENTRY_KEYS.map((key, i) => (
              <ExperienceEntry
                key={key}
                index={i}
                isLast={i === ENTRY_KEYS.length - 1}
                company={t(`entries.${key}.company`)}
                role={t(`entries.${key}.role`)}
                period={t(`entries.${key}.period`)}
                location={t(`entries.${key}.location`)}
                description={t(`entries.${key}.description`)}
                tags={t.raw(`entries.${key}.tags`) as string[]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceEntry({
  index, isLast, company, role, period, location, description, tags,
}: {
  index: number;
  isLast: boolean;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className={`
        group relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-10 lg:py-14
        border-t border-[var(--line-subtle)]
        ${isLast ? "border-b" : ""}
        transition-colors duration-300
      `}
    >
      {/* Pastille sur la timeline */}
      <span
        aria-hidden="true"
        className="absolute left-[1rem] lg:left-[calc(25%-0.55rem)] top-12 w-2.5 h-2.5 border border-[var(--accent-blue)] bg-[var(--bg-primary)] rotate-45 group-hover:bg-[var(--accent-blue)] transition-colors duration-300"
      />

      {/* Colonne gauche : meta avec offset pour la timeline */}
      <div className="lg:col-span-3 flex flex-col gap-3 pl-10 lg:pl-0 lg:pr-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-[0.16em] text-[var(--accent-blue)]">
            ENTRY · {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <span className="font-mono text-[11px] tracking-[0.12em] text-[var(--text-secondary)] uppercase">
          {period}
        </span>
        <span className="font-mono text-[10px] tracking-wider text-[var(--text-muted)]">
          {location}
        </span>
      </div>

      {/* Centre : entreprise + rôle + description */}
      <div className="lg:col-span-6 flex flex-col gap-5 pl-10 lg:pl-6 lg:border-l border-[var(--line-subtle)]">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-display font-semibold text-[clamp(1.5rem,3vw,2.4rem)] tracking-[-0.005em] text-[var(--text-primary)] leading-[1.15] group-hover:text-[var(--accent-blue)] transition-colors duration-300">
            {company}
          </h3>
          <p className="font-body font-light text-[var(--text-secondary)] text-base italic">
            {role}
          </p>
        </div>
        <p className="font-body font-light text-[15px] text-[var(--text-muted)] leading-[1.7] max-w-xl">
          {description}
        </p>
      </div>

      {/* Droite : tags */}
      <div className="lg:col-span-3 flex flex-wrap gap-2 pl-10 lg:pl-0 lg:justify-end lg:items-start lg:content-start">
        {tags.map((tag) => (
          <TechTag key={tag} label={tag} />
        ))}
      </div>
    </motion.article>
  );
}
