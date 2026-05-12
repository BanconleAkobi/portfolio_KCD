"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { staggerContainer, heroWord, fadeIn, scrollViewport } from "@/lib/animations";
import { cn } from "@/lib/utils";

const MechanicalWireframe = dynamic(
  () => import("@/components/three/MechanicalWireframe"),
  { ssr: false, loading: () => null }
);

const HEADLINE_KEYS = ["headline_1", "headline_2", "headline_3"] as const;

export default function HeroSection() {
  const t = useTranslations("hero");

  function scrollToProjects() {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }
  function scrollToContact() {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 75% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Grid overlay — very subtle technical aesthetic */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(var(--line-bright) 1px, transparent 1px), linear-gradient(90deg, var(--line-bright) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="section-container w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-[calc(100vh-96px)]">

          {/* LEFT — Text content */}
          <div className="flex flex-col justify-center gap-8 lg:pr-12">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] animate-[pulseGlow_2s_ease-in-out_infinite]" />
              <span className="font-mono text-xs tracking-[0.15em] uppercase text-[var(--accent-blue)]">
                {t("badge")}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              variants={staggerContainer(0.12, 0.2)}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-1"
            >
              {HEADLINE_KEYS.map((key, i) => (
                <div key={key} className="overflow-hidden">
                  <motion.h1
                    variants={heroWord}
                    className={cn(
                      "font-display font-bold leading-[0.95] tracking-[-0.03em]",
                      "text-[clamp(3rem,7vw,6.5rem)]",
                      i === 0 && "text-[var(--text-primary)]",
                      i === 1 && "gradient-text",
                      i === 2 && "text-[var(--text-secondary)]"
                    )}
                  >
                    {t(key)}
                  </motion.h1>
                </div>
              ))}
            </motion.div>

            {/* Subline */}
            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
              className="font-body text-[var(--text-secondary)] text-lg leading-relaxed max-w-md"
            >
              {t("subline")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={scrollToProjects}
                className={cn(
                  "inline-flex items-center gap-3 px-6 py-3.5",
                  "font-body font-medium text-sm",
                  "bg-[var(--accent-blue)] text-white",
                  "hover:bg-blue-500",
                  "rounded-sm transition-all duration-200",
                  "shadow-glow-blue-sm hover:shadow-glow-blue"
                )}
              >
                {t("cta_primary")}
                <span className="text-sm opacity-80">→</span>
              </button>

              <button
                onClick={scrollToContact}
                className={cn(
                  "inline-flex items-center gap-3 px-6 py-3.5",
                  "font-body font-medium text-sm",
                  "bg-transparent border border-[var(--line-medium)]",
                  "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  "hover:border-[var(--line-bright)]",
                  "rounded-sm transition-all duration-200"
                )}
              >
                {t("cta_secondary")}
              </button>
            </motion.div>

            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex items-center gap-3 mt-2"
            >
              <div className="h-px w-8 bg-[var(--line-subtle)]" />
              <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
                {t("location_label")} <span className="text-[var(--text-secondary)]">{t("location")}</span>
              </span>
            </motion.div>
          </div>

          {/* RIGHT — 3D Canvas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="hidden lg:flex items-center justify-center h-[70vh] max-h-[600px] relative"
          >
            {/* Subtle background ring */}
            <div
              className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
              style={{
                background: "radial-gradient(circle at center, rgba(59,130,246,0.06) 0%, transparent 70%)",
              }}
            />
            <MechanicalWireframe />

            {/* Technical annotation overlay */}
            <div className="absolute bottom-8 right-4 font-mono text-[10px] text-[var(--text-muted)] text-right space-y-1 pointer-events-none select-none">
              <div>ASSEMBLY·VIEW</div>
              <div className="text-[var(--accent-blue)] opacity-60">REV·A</div>
            </div>
            <div className="absolute top-8 left-4 font-mono text-[10px] text-[var(--text-muted)] space-y-1 pointer-events-none select-none">
              <div>Ø 2.2 REF</div>
              <div>±0.005</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)]">
          {t("scroll_hint")}
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--line-medium)] to-transparent animate-[scrollBounce_2s_ease-in-out_infinite]" />
      </motion.div>
    </section>
  );
}
