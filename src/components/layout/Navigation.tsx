"use client";
import { useEffect, useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";

const NAV_SECTIONS = ["about", "expertise", "experience", "projects", "skills", "contact"] as const;

export default function Navigation() {
  const t = useTranslations("nav");
  const locale = useLocale();

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  const switchLocale = () => {
    const next = locale === "fr" ? "en" : "fr";
    window.location.href = `/${next}`;
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "glass-strong shadow-[0_1px_0_0_var(--line-subtle)]" : "bg-transparent"
        )}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 group"
              aria-label="Back to top"
            >
              <div className="w-7 h-7 border border-[var(--line-medium)] flex items-center justify-center group-hover:border-[var(--accent-blue)] transition-colors duration-200">
                <span className="font-mono text-xs font-bold text-[var(--accent-blue)]">K</span>
              </div>
              <span className="hidden sm:block font-mono text-xs tracking-widest uppercase text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors duration-200">
                Carlos
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {NAV_SECTIONS.map((section) => (
                <NavLink
                  key={section}
                  label={t(section)}
                  active={activeSection === section}
                  onClick={() => scrollTo(section)}
                />
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Language toggle */}
              <button
                onClick={switchLocale}
                aria-label={t("lang_switch_label")}
                className="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors duration-200 px-2 py-1"
              >
                {t("lang_switch")}
              </button>

              {/* CTA */}
              <button
                onClick={() => scrollTo("contact")}
                className="hidden md:flex items-center gap-2 px-4 py-2 border border-[var(--line-medium)] hover:border-[var(--accent-blue)] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] font-body text-sm transition-all duration-200 rounded-sm"
              >
                <span>{t("contact")}</span>
                <span className="text-xs">→</span>
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden flex flex-col gap-1.5 p-2 group"
                aria-label="Open menu"
              >
                <span className="block w-5 h-px bg-[var(--text-secondary)] group-hover:bg-[var(--text-primary)] transition-colors duration-200" />
                <span className="block w-3.5 h-px bg-[var(--text-secondary)] group-hover:bg-[var(--text-primary)] transition-colors duration-200 ml-auto" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            sections={NAV_SECTIONS}
            activeSection={activeSection}
            onNavigate={scrollTo}
            onClose={() => setMobileOpen(false)}
            locale={locale}
            onSwitchLocale={switchLocale}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative font-body text-sm tracking-wide transition-colors duration-200",
        "pb-0.5",
        active ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
      )}
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-[var(--accent-blue)] origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%" }}
      />
    </button>
  );
}
