"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import HairlineDivider from "@/components/ui/HairlineDivider";

const NAV_ITEMS = [
  { key: "about",      href: "/about" },
  { key: "expertise",  href: "/expertise" },
  { key: "experience", href: "/experience" },
  { key: "projects",   href: "/projects" },
  { key: "skills",     href: "/skills" },
  { key: "contact",    href: "/contact" },
] as const;

export default function Footer() {
  const t    = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--line-subtle)]" role="contentinfo">
      <div className="section-container py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col gap-4 max-w-xs">
            <Link href="/" className="flex items-center gap-3 group outline-none w-max">
              <div className="w-8 h-8 border border-[var(--line-medium)] flex items-center justify-center group-hover:border-[var(--accent-blue)] transition-colors duration-200">
                <span className="font-mono text-sm font-bold text-[var(--accent-blue)]">K</span>
              </div>
              <span className="font-mono text-xs tracking-[0.18em] uppercase text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
                Kibalo Carlos DAO
              </span>
            </Link>
            <p className="font-mono text-xs text-[var(--text-muted)] leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-[0.18em] uppercase text-[var(--text-muted)]">
              {t("nav_label")}
            </span>
            <nav className="grid grid-cols-2 gap-x-12 gap-y-2" aria-label="Footer navigation">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-left font-body text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 outline-none"
                >
                  {tNav(item.key)}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <HairlineDivider className="my-10" delay={0.1} />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="font-mono text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Kibalo Carlos DAO · {t("rights")}
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            {t("built_with")}
          </span>
        </div>
      </div>
    </footer>
  );
}
