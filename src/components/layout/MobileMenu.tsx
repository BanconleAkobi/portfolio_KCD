"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const NAV_KEYS = ["about", "expertise", "experience", "projects", "skills", "contact"] as const;

interface MobileMenuProps {
  sections: readonly string[];
  activeSection: string;
  onNavigate: (id: string) => void;
  onClose: () => void;
  locale: string;
  onSwitchLocale: () => void;
}

export default function MobileMenu({
  activeSection,
  onNavigate,
  onClose,
  locale,
  onSwitchLocale,
}: MobileMenuProps) {
  const t = useTranslations("nav");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] glass-strong"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-0 top-0 bottom-0 w-full max-w-sm flex flex-col"
        style={{ background: "var(--bg-secondary)", borderLeft: "1px solid var(--line-subtle)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--line-subtle)]">
          <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)]">
            Menu
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:text-[var(--text-primary)] text-[var(--text-secondary)] transition-colors"
            aria-label="Close menu"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" />
              <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col flex-1 p-6 gap-2" aria-label="Mobile navigation">
          {NAV_KEYS.map((key, i) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onNavigate(key)}
              className={cn(
                "text-left py-4 border-b border-[var(--line-subtle)] font-display font-light text-2xl transition-colors duration-200",
                activeSection === key
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              )}
            >
              <span className="font-mono text-xs text-[var(--text-muted)] mr-3">
                0{NAV_KEYS.indexOf(key) + 1}
              </span>
              {t(key)}
            </motion.button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-[var(--line-subtle)] flex items-center justify-between">
          <button
            onClick={onSwitchLocale}
            className="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors"
          >
            {locale === "fr" ? "Switch to EN" : "Passer en FR"}
          </button>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            {new Date().getFullYear()}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
