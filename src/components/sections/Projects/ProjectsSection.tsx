"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import TechTag from "@/components/ui/TechTag";
import { BlueprintCorners, HatchPattern, TitleBlock, RulerMarks } from "@/components/ui/Mechanical";

interface Spec { label: string; value: string }
interface Project {
  id: string; number: string; title: string; subtitle: string;
  description: string; specs: Spec[]; tags: string[]; color: string;
}

export default function ProjectsSection() {
  const t        = useTranslations("projects");
  const projects = t.raw("items") as Project[];

  return (
    <section className="bg-[var(--bg-primary)]">
      {projects.map((project, i) => (
        <ProjectBlock key={project.id} project={project} index={i} total={projects.length} />
      ))}
    </section>
  );
}

function ProjectBlock({ project, index, total }: { project: Project; index: number; total: number }) {
  const isEven = index % 2 === 0;

  return (
    <article
      className={`
        relative py-24 lg:py-32
        ${isEven ? "bg-[var(--bg-primary)]" : "bg-[var(--bg-secondary)]"}
        ${index > 0 ? "border-t border-[var(--line-subtle)]" : ""}
      `}
    >
      <div className="section-container relative z-10">

        {/* Header sheet : référence + titre projet */}
        <div className="flex items-center gap-3 mb-6 lg:mb-10">
          <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--accent-blue)]">
            DOC · {project.number} / {String(total).padStart(2, "0")}
          </span>
          <div className="flex-1 h-px bg-[var(--line-medium)]" />
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--text-muted)] hidden md:inline">
            Feuille technique
          </span>
        </div>

        {/* Frame style feuille de plan */}
        <div className="relative border border-[var(--line-medium)] p-6 lg:p-12">
          <BlueprintCorners size={14} color="var(--line-bright)" inset="-1px" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* GAUCHE : Titre + description + tags */}
            <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="font-mono text-xs tracking-[0.16em] uppercase text-[var(--text-muted)]"
              >
                {project.subtitle}
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-display font-semibold text-[clamp(1.75rem,3.6vw,3rem)] tracking-[-0.005em] leading-[1.1] text-[var(--text-primary)]"
              >
                {project.title}
              </motion.h2>

              <RulerMarks count={28} className="opacity-30" />

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="font-body font-light text-[var(--text-secondary)] text-[16px] lg:text-lg leading-[1.7] max-w-xl"
              >
                {project.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: 0.3 }}
                className="flex flex-wrap gap-2 mt-2"
              >
                {project.tags.map((tag) => <TechTag key={tag} label={tag} />)}
              </motion.div>
            </div>

            {/* DROITE : title block + specs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="lg:col-span-5 flex flex-col gap-4"
            >
              {/* Title block */}
              <TitleBlock
                rows={[
                  { label: "PROJET",  value: project.id.toUpperCase() },
                  { label: "N°",      value: project.number },
                  { label: "STATUT",  value: "VALIDÉ · REV A" },
                  { label: "DATE",    value: "2026" },
                ]}
              />

              {/* Specs cartouche */}
              <div
                className="relative border border-[var(--line-medium)] p-6 lg:p-7 flex flex-col gap-5 h-full overflow-hidden"
                style={{ background: project.color }}
              >
                <HatchPattern className="absolute -top-1 -right-1 w-12 h-12 opacity-60" />

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--text-muted)]">
                    Spécifications
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.12em] text-[var(--accent-blue)]">
                    SPEC · {project.number}
                  </span>
                </div>

                <div className="flex flex-col flex-1">
                  {project.specs.map(({ label, value }, j) => (
                    <div
                      key={label}
                      className={`flex items-start justify-between gap-4 py-3 ${j < project.specs.length - 1 ? "border-b border-[var(--line-subtle)]" : ""}`}
                    >
                      <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--text-muted)] flex-shrink-0 pt-px">
                        {label}
                      </span>
                      <span className="font-mono text-xs text-[var(--text-secondary)] text-right leading-snug">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer cartouche */}
                <div className="pt-4 border-t border-[var(--line-medium)] flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-muted)] opacity-70">
                    {project.id}
                  </span>
                  <div className="flex gap-1.5">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div
                        key={j}
                        className="w-1.5 h-1.5"
                        style={{
                          background: j <= 2 ? "var(--accent-blue)" : "var(--line-medium)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </article>
  );
}
