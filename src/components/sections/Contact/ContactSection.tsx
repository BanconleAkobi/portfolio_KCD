"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { fadeUp, staggerContainer, scrollViewport } from "@/lib/animations";
import { BlueprintCorners, HatchPattern, TitleBlock, RulerMarks } from "@/components/ui/Mechanical";

const EMAIL    = "daocarlos20@gmail.com";
const LINKEDIN = "https://fr.linkedin.com/in/kibalo-carlos-dao-5aa885273";

export default function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section className="relative py-24 lg:py-32 bg-[var(--bg-primary)]">

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 80%, rgba(59,130,246,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="section-container relative z-10">

        {/* Header type "courrier sortant" */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16"
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--accent-blue)]">
              Courrier sortant · ouvert
            </span>
            <div className="flex-1 h-px bg-[var(--line-subtle)]" />
            <span className="font-mono text-[10px] tracking-[0.14em] text-[var(--text-muted)] hidden md:inline">
              TX · 24H MAX
            </span>
          </div>
          <RulerMarks count={32} className="opacity-30" />
        </motion.div>

        {/* Phrase d'engagement énorme */}
        <div className="max-w-4xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-semibold text-[clamp(2rem,5vw,4.5rem)] tracking-[-0.005em] leading-[1.08] text-[var(--text-primary)]"
          >
            {t("headline_1")}{" "}
            <span className="text-[var(--text-secondary)] font-light italic">
              {t("headline_2")}
            </span>
          </motion.h2>
        </div>

        {/* Grid principal : feuille de contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">

          {/* GAUCHE : Email + CTAs dans frame */}
          <div className="lg:col-span-7">
            <div className="relative border border-[var(--line-medium)] p-7 lg:p-10 flex flex-col gap-8">
              <BlueprintCorners size={14} color="var(--line-bright)" inset="-1px" />
              <HatchPattern className="absolute -top-1 -right-1 w-16 h-16 opacity-50" />

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--text-muted)]">
                    {t("email_label")}
                  </span>
                  <div className="flex-1 h-px bg-[var(--line-subtle)]" />
                  <span className="font-mono text-[9px] tracking-[0.14em] text-[var(--accent-blue)]">
                    PRIMARY
                  </span>
                </div>
                <a
                  href={`mailto:${EMAIL}`}
                  className="cursor-pointer font-display font-medium text-[clamp(1.2rem,2.6vw,2rem)] tracking-[-0.005em] leading-[1.2] text-[var(--text-primary)] hover:text-[var(--accent-blue)] transition-colors duration-300 break-all"
                >
                  {EMAIL}
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.55, delay: 0.25 }}
                className="flex flex-wrap gap-3"
              >
                <MagneticButton
                  as="a"
                  href={`mailto:${EMAIL}`}
                  className="px-7 py-3.5 bg-[var(--accent-blue)] border-transparent text-white hover:bg-blue-500 hover:border-transparent text-sm font-medium shadow-[0_0_28px_-4px_rgba(59,130,246,0.55)]"
                >
                  {t("cta")} <span className="ml-1 opacity-80">→</span>
                </MagneticButton>
                <MagneticButton as="a" href={LINKEDIN} className="px-7 py-3.5 text-sm font-medium">
                  LinkedIn
                </MagneticButton>
              </motion.div>

              {/* Signature en bas */}
              <div className="pt-6 border-t border-[var(--line-subtle)] flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--text-muted)]">
                  Signé · Carlos
                </span>
                <div className="flex gap-1.5">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div
                      key={j}
                      className="w-1.5 h-1.5"
                      style={{ background: j === 0 ? "var(--accent-blue)" : "var(--line-medium)" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DROITE : Infos pratiques façon title block */}
          <motion.div
            variants={staggerContainer(0.1, 0.4)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            <TitleBlock
              rows={[
                { label: t("location_label"),     value: t("location") },
                { label: t("response_label"),     value: t("response") },
                { label: t("availability_label"), value: t("availability") },
                { label: "STATUT",                value: "OUVERT AUX ÉCHANGES" },
              ]}
            />

            <motion.div
              variants={fadeUp}
              className="border border-[var(--line-medium)] p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="block w-2 h-2 rounded-full bg-[var(--accent-blue)] animate-[pulseGlow_2s_ease-in-out_infinite]" />
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--text-secondary)]">
                  En ligne · réponse rapide
                </span>
              </div>
              <span className="font-mono text-[9px] tracking-[0.14em] text-[var(--accent-blue)]">
                ONLINE
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
