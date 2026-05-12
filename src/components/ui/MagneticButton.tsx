"use client";
import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
  as?: "button" | "a";
}

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  strength = 0.35,
  as: Tag = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPosition({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  }

  function handleMouseLeave() {
    setPosition({ x: 0, y: 0 });
  }

  const commonProps = {
    className: cn(
      "relative inline-flex items-center justify-center gap-2",
      "px-7 py-3.5",
      "font-body font-medium text-sm tracking-wide",
      "text-[var(--text-primary)]",
      "bg-transparent border border-[var(--line-medium)]",
      "rounded-sm overflow-hidden",
      "transition-colors duration-200",
      "hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)]",
      "group",
      className
    ),
    onClick,
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
      className="inline-block"
    >
      {Tag === "a" ? (
        <a href={href} {...commonProps}>
          <span className="absolute inset-0 bg-[var(--glow-blue)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10">{children}</span>
        </a>
      ) : (
        <button {...commonProps}>
          <span className="absolute inset-0 bg-[var(--glow-blue)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10">{children}</span>
        </button>
      )}
    </motion.div>
  );
}
