import { cn } from "@/lib/utils";

interface TechTagProps {
  label: string;
  className?: string;
  variant?: "default" | "blue" | "amber";
}

export default function TechTag({ label, className, variant = "default" }: TechTagProps) {
  return (
    <span
      className={cn(
        "tech-tag",
        variant === "blue" && "border-[var(--accent-blue)] text-[var(--accent-blue)] bg-[var(--glow-blue)]",
        variant === "amber" && "border-[var(--accent-amber)] text-[var(--accent-amber)]",
        className
      )}
    >
      {label}
    </span>
  );
}
