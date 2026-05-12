import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  strong?: boolean;
  hoverable?: boolean;
}

export default function GlassPanel({
  children,
  className,
  strong = false,
  hoverable = false,
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        strong ? "glass-strong" : "glass",
        "rounded-sm",
        hoverable && [
          "transition-all duration-300",
          "hover:border-[var(--line-medium)]",
          "hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.5)]",
          "hover:-translate-y-0.5",
        ],
        className
      )}
    >
      {children}
    </div>
  );
}
