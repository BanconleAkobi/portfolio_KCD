"use client";
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";

const NAV_ITEMS = [
  { key: "about",      href: "/about" },
  { key: "expertise",  href: "/expertise" },
  { key: "experience", href: "/experience" },
  { key: "projects",   href: "/projects" },
  { key: "skills",     href: "/skills" },
  { key: "contact",    href: "/contact" },
] as const;

export default function Navigation() {
  const t        = useTranslations("nav");
  const locale   = useLocale();
  const pathname = usePathname();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 30); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sync close mobile menu on path change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const switchLocale = () => {
    const next = locale === "fr" ? "en" : "fr";
    window.location.href = `/${next}${pathname}`;
  };

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[rgba(9,9,12,0.85)] backdrop-blur-xl border-b border-[var(--line-subtle)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group outline-none focus-visible:opacity-80">
              <div className="w-7 h-7 border border-[var(--line-medium)] flex items-center justify-center group-hover:border-[var(--accent-blue)] transition-colors duration-200">
                <span className="font-mono text-xs font-bold text-[var(--accent-blue)]">K</span>
              </div>
              <span className="hidden sm:block font-mono text-xs tracking-[0.18em] uppercase text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors duration-200">
                Carlos
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-9" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={cn(
                      "relative font-body text-sm tracking-wide transition-colors duration-200 py-1 outline-none",
                      active
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                    )}
                  >
                    {t(item.key)}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--accent-blue)]"
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={switchLocale}
                aria-label={t("lang_switch_label")}
                className="cursor-pointer font-mono text-xs tracking-[0.18em] uppercase text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors duration-200 px-2 py-1 outline-none focus-visible:text-[var(--accent-blue)]"
              >
                {t("lang_switch")}
              </button>

              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-[var(--line-medium)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] text-[var(--text-secondary)] font-body text-sm transition-all duration-200 outline-none"
              >
                <span>{t("contact")}</span>
                <span className="text-xs opacity-75">→</span>
              </Link>

              <button
                onClick={() => setMobileOpen(true)}
                className="cursor-pointer lg:hidden flex flex-col gap-1.5 p-2 group outline-none"
                aria-label="Open menu"
              >
                <span className="block w-5 h-px bg-[var(--text-secondary)] group-hover:bg-[var(--text-primary)] transition-colors" />
                <span className="block w-3.5 h-px bg-[var(--text-secondary)] group-hover:bg-[var(--text-primary)] transition-colors ml-auto" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            items={NAV_ITEMS}
            pathname={pathname}
            onClose={() => setMobileOpen(false)}
            locale={locale}
            onSwitchLocale={switchLocale}
          />
        )}
      </AnimatePresence>
    </>
  );
}
