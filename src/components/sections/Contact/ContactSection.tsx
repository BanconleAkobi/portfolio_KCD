"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";
import HairlineDivider from "@/components/ui/HairlineDivider";
import { fadeUp, staggerContainer, scrollViewport } from "@/lib/animations";

const EMAIL = "carlos.engineer@example.com";
const LINKEDIN = "https://linkedin.com/in/carlos-engineer";

export default function ContactSection() {
  const t = useTranslations("contact");

  const metaItems = [
    { label: t("location_label"), value: t("location") },
    { label: t("response_label"), value: t("response") },
    { label: t("availability_label"), value: t("availability") },
  ];

  return (
    <section id="contact" className="relative py-28 lg:py-40 bg-[var(--bg-primary)]">
      {/* Ambient glow */}
      <div
        className="absolute inset-x-0 h-80 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(59,130,246,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">

        <SectionLabel label={t("section_label")} className="mb-16" />

        <div className="max-w-3xl">
          {/* Headline */}
          <div className="mb-10 flex flex-col gap-1">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "105%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={scrollViewport}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold text-[clamp(2.5rem,6vw,5.5rem)] tracking-tight text-[var(--text-primary)] leading-[0.95]"
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
                className="font-display font-bold text-[clamp(2.5rem,6vw,5.5rem)] tracking-tight text-[var(--text-secondary)] leading-[0.95]"
              >
                {t("headline_2")}
              </motion.h2>
            </div>
          </div>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-[var(--text-secondary)] text-lg leading-relaxed mb-10 max-w-xl"
          >
            {t("subline")}
          </motion.p>

          {/* Email CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <MagneticButton
              as="a"
              href={`mailto:${EMAIL}`}
              className="px-8 py-4 bg-[var(--accent-blue)] text-white border-transparent hover:bg-blue-500 hover:border-transparent text-base font-medium shadow-glow-blue-sm hover:shadow-glow-blue"
            >
              {t("cta")}
              <span className="ml-1 opacity-80">→</span>
            </MagneticButton>

            <MagneticButton
              as="a"
              href={LINKEDIN}
              className="px-8 py-4 text-base font-medium"
            >
              LinkedIn
            </MagneticButton>
          </motion.div>

          <HairlineDivider className="mb-10" />

          {/* Meta information */}
          <motion.div
            variants={staggerContainer(0.1, 0.4)}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            className="flex flex-col sm:flex-row gap-8"
          >
            {metaItems.map(({ label, value }) => (
              <motion.div key={label} variants={fadeUp} className="flex flex-col gap-2">
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--text-muted)]">
                  {label}
                </span>
                <span className="font-body text-sm text-[var(--text-secondary)]">{value}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Email displayed */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={scrollViewport}
            transition={{ delay: 0.6 }}
            className="mt-12 flex items-center gap-3"
          >
            <div className="h-px w-8 bg-[var(--line-subtle)]" />
            <a
              href={`mailto:${EMAIL}`}
              className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors duration-200 tracking-wide"
            >
              {EMAIL}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
