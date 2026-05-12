"use client";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";

interface PageNavProps {
  nextHref: string;
  nextIndex: string;
  nextLabel: string;
}

// CTA discret mais clair pour passer à la page suivante
// Titre raisonnable (pas 6rem), bien espacé du footer
export default function PageNav({ nextHref, nextIndex, nextLabel }: PageNavProps) {
  return (
    <section className="py-20 lg:py-28 border-t border-[var(--line-subtle)]">
      <div className="section-container">
        <Link
          href={nextHref}
          className="group block outline-none focus-visible:opacity-80"
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-muted)]">
              Suivant
            </span>
            <div className="w-8 h-px bg-[var(--line-medium)]" />
            <span className="font-mono text-[10px] tracking-[0.15em] text-[var(--accent-blue)]">
              {nextIndex}
            </span>
          </div>

          {/* Titre + flèche sur la même ligne */}
          <div className="flex items-center justify-between gap-6">
            <h2 className="font-display font-semibold text-[clamp(1.75rem,4vw,3rem)] tracking-[-0.005em] leading-[1.15] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300">
              {nextLabel}
            </h2>
            <motion.span
              className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-[var(--text-muted)] group-hover:text-[var(--accent-blue)] transition-colors duration-300 flex-shrink-0"
              initial={{ x: 0 }}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              →
            </motion.span>
          </div>
        </Link>
      </div>
    </section>
  );
}
