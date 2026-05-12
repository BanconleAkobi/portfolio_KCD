"use client";
import { useTranslations } from "next-intl";
import HairlineDivider from "@/components/ui/HairlineDivider";

const NAV_LINKS = ["about", "expertise", "experience", "projects", "skills", "contact"] as const;

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--line-subtle)]" role="contentinfo">
      <div className="section-container py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-[var(--line-medium)] flex items-center justify-center">
                <span className="font-mono text-sm font-bold text-[var(--accent-blue)]">K</span>
              </div>
              <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)]">
                Carlos
              </span>
            </div>
            <p className="font-mono text-xs text-[var(--text-muted)] leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)]">
              {t("nav_label")}
            </span>
            <nav className="grid grid-cols-2 gap-x-12 gap-y-2" aria-label="Footer navigation">
              {NAV_LINKS.map((key) => (
                <button
                  key={key}
                  onClick={() => scrollTo(key)}
                  className="text-left font-body text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                >
                  {tNav(key)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <HairlineDivider className="my-10" delay={0.1} />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="font-mono text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Carlos · {t("rights")}
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            {t("built_with")}
          </span>
        </div>
      </div>
    </footer>
  );
}
