"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface NavItem { key: string; href: string }

interface MobileMenuProps {
  items: readonly NavItem[];
  pathname: string;
  onClose: () => void;
  locale: string;
  onSwitchLocale: () => void;
}

export default function MobileMenu({ items, pathname, onClose, locale, onSwitchLocale }: MobileMenuProps) {
  const t = useTranslations("nav");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] backdrop-blur-lg"
      style={{ background: "rgba(9,9,12,0.75)" }}
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
        <div className="flex items-center justify-between p-6 border-b border-[var(--line-subtle)]">
          <span className="font-mono text-xs tracking-[0.18em] uppercase text-[var(--text-muted)]">Menu</span>
          <button
            onClick={onClose}
            className="cursor-pointer w-8 h-8 flex items-center justify-center hover:text-[var(--text-primary)] text-[var(--text-secondary)] transition-colors outline-none"
            aria-label="Close menu"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" />
              <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col flex-1 p-6 gap-2" aria-label="Mobile navigation">
          {items.map((item, i) => {
            const active = pathname === item.href;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "block py-4 border-b border-[var(--line-subtle)] font-display font-light text-2xl transition-colors duration-200",
                    active ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                  )}
                >
                  <span className="font-mono text-xs text-[var(--text-muted)] mr-3">
                    0{i + 1}
                  </span>
                  {t(item.key)}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="p-6 border-t border-[var(--line-subtle)] flex items-center justify-between">
          <button
            onClick={onSwitchLocale}
            className="cursor-pointer font-mono text-xs tracking-[0.18em] uppercase text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors"
          >
            {locale === "fr" ? "Switch to EN" : "Passer en FR"}
          </button>
          <span className="font-mono text-xs text-[var(--text-muted)]">{new Date().getFullYear()}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
