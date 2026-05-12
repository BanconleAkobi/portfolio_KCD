"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const MechanicalWireframe = dynamic(
  () => import("@/components/three/MechanicalWireframe"),
  { ssr: false, loading: () => null }
);

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Grille technique */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[55vw] h-[80vh] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at center, rgba(59,130,246,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="section-container relative z-10 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 items-center">

          {/* GAUCHE — Texte */}
          <div className="flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex flex-col gap-3"
            >
              {/* Nom complet en signature */}
              <div className="flex items-center gap-3">
                <span className="block w-6 h-px bg-[var(--accent-blue)]" />
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--text-secondary)]">
                  {t("name")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="block w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] animate-[pulseGlow_2s_ease-in-out_infinite]" />
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-[var(--accent-blue)]">
                  {t("badge")}
                </span>
              </div>
            </motion.div>

            <div className="flex flex-col">
              {(["headline_1", "headline_2", "headline_3"] as const).map((key, i) => (
                <motion.h1
                  key={key}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.75,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.25 + i * 0.12,
                  }}
                  className={cn(
                    "font-display leading-[1.05] tracking-[-0.005em]",
                    "text-[clamp(2.75rem,6.5vw,5.5rem)]",
                    i === 2
                      ? "font-light italic text-[var(--text-secondary)]"
                      : "font-semibold text-[var(--text-primary)]"
                  )}
                >
                  {t(key)}
                </motion.h1>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
              className="font-body font-light text-[var(--text-secondary)] text-lg leading-relaxed max-w-sm"
            >
              {t("subline")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/projects"
                className="cursor-pointer inline-flex items-center gap-3 px-7 py-3.5 bg-[var(--accent-blue)] text-white font-body font-medium text-sm hover:bg-blue-500 transition-colors duration-200 shadow-[0_0_24px_-4px_rgba(59,130,246,0.5)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
              >
                {t("cta_primary")}
                <span className="opacity-75 text-xs">→</span>
              </Link>
              <Link
                href="/contact"
                className="cursor-pointer inline-flex items-center gap-3 px-7 py-3.5 bg-transparent border border-[var(--line-medium)] text-[var(--text-secondary)] font-body font-medium text-sm hover:border-[var(--line-bright)] hover:text-[var(--text-primary)] transition-all duration-200 outline-none focus-visible:border-[var(--accent-blue)]"
              >
                {t("cta_secondary")}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="flex items-center gap-3 pt-2"
            >
              <div className="w-6 h-px bg-[var(--line-subtle)]" />
              <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider uppercase">
                {t("location_label")}
              </span>
              <span className="font-mono text-[10px] text-[var(--text-secondary)] tracking-wider">
                {t("location")}
              </span>
            </motion.div>
          </div>

          {/* DROITE — Gyroscope */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.4 }}
            className="hidden lg:flex items-center justify-center h-[60vh] max-h-[560px] relative"
          >
            <div
              className="absolute inset-0 pointer-events-none rounded-full"
              style={{ background: "radial-gradient(circle at center, rgba(59,130,246,0.08) 0%, transparent 65%)" }}
            />
            <MechanicalWireframe />

            <div className="absolute bottom-10 right-6 font-mono text-[9px] text-[var(--text-muted)] text-right space-y-0.5 pointer-events-none select-none opacity-60">
              <div>INERTIAL·UNIT</div>
              <div className="text-[var(--accent-blue)]">REV A · 2026</div>
            </div>
            <div className="absolute top-10 left-6 font-mono text-[9px] text-[var(--text-muted)] space-y-0.5 pointer-events-none select-none opacity-60">
              <div>Ø 4.4 REF</div>
              <div>±0.002</div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--text-muted)]">
          {t("scroll_hint")}
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--line-medium)] to-transparent animate-[scrollBounce_2s_ease-in-out_infinite]" />
      </motion.div>
    </section>
  );
}
