"use client";
import { cn } from "@/lib/utils";

/* ─── BlueprintCorners ──────────────────────────────────────────────
   Coins en équerre comme sur un plan technique. À poser absolute dans
   un parent relative. */
export function BlueprintCorners({
  size = 18,
  color = "var(--line-bright)",
  inset = "0",
  className,
}: {
  size?: number;
  color?: string;
  inset?: string;
  className?: string;
}) {
  const s = `${size}px`;
  const c = color;
  const corner = (pos: string) => (
    <span
      aria-hidden="true"
      className={cn("absolute pointer-events-none", pos)}
      style={{
        width: s,
        height: s,
        borderColor: c,
      }}
    />
  );
  return (
    <div
      aria-hidden="true"
      className={cn("absolute pointer-events-none", className)}
      style={{ inset }}
    >
      <span
        className="absolute top-0 left-0"
        style={{ width: s, height: s, borderTop: `1px solid ${c}`, borderLeft: `1px solid ${c}` }}
      />
      <span
        className="absolute top-0 right-0"
        style={{ width: s, height: s, borderTop: `1px solid ${c}`, borderRight: `1px solid ${c}` }}
      />
      <span
        className="absolute bottom-0 left-0"
        style={{ width: s, height: s, borderBottom: `1px solid ${c}`, borderLeft: `1px solid ${c}` }}
      />
      <span
        className="absolute bottom-0 right-0"
        style={{ width: s, height: s, borderBottom: `1px solid ${c}`, borderRight: `1px solid ${c}` }}
      />
      {corner /* tsx noop */ && null}
    </div>
  );
}

/* ─── DimensionLine ──────────────────────────────────────────────────
   Ligne de cotation horizontale ou verticale avec flèches.
   Pose dans un parent relative + top/left/right/bottom via className. */
export function DimensionLine({
  orientation = "horizontal",
  label,
  className,
  color = "var(--line-medium)",
  textColor = "var(--text-muted)",
}: {
  orientation?: "horizontal" | "vertical";
  label?: string;
  className?: string;
  color?: string;
  textColor?: string;
}) {
  if (orientation === "horizontal") {
    return (
      <div
        aria-hidden="true"
        className={cn("flex items-center pointer-events-none select-none", className)}
      >
        <span
          className="block"
          style={{
            width: 0, height: 0,
            borderTop: "4px solid transparent",
            borderBottom: "4px solid transparent",
            borderRight: `6px solid ${color}`,
          }}
        />
        <div className="flex-1 h-px" style={{ background: color }} />
        {label && (
          <span
            className="px-2 font-mono text-[9px] tracking-[0.18em] uppercase"
            style={{ color: textColor }}
          >
            {label}
          </span>
        )}
        <div className="flex-1 h-px" style={{ background: color }} />
        <span
          className="block"
          style={{
            width: 0, height: 0,
            borderTop: "4px solid transparent",
            borderBottom: "4px solid transparent",
            borderLeft: `6px solid ${color}`,
          }}
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className={cn("flex flex-col items-center pointer-events-none select-none", className)}
    >
      <span
        className="block"
        style={{
          width: 0, height: 0,
          borderLeft: "4px solid transparent",
          borderRight: "4px solid transparent",
          borderBottom: `6px solid ${color}`,
        }}
      />
      <div className="flex-1 w-px" style={{ background: color }} />
      {label && (
        <span
          className="py-2 font-mono text-[9px] tracking-[0.18em] uppercase [writing-mode:vertical-rl] rotate-180"
          style={{ color: textColor }}
        >
          {label}
        </span>
      )}
      <div className="flex-1 w-px" style={{ background: color }} />
      <span
        className="block"
        style={{
          width: 0, height: 0,
          borderLeft: "4px solid transparent",
          borderRight: "4px solid transparent",
          borderTop: `6px solid ${color}`,
        }}
      />
    </div>
  );
}

/* ─── HatchPattern ───────────────────────────────────────────────────
   Hachures diagonales façon coupe technique. */
export function HatchPattern({
  className,
  color = "rgba(255,255,255,0.045)",
  size = 8,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
      style={{
        backgroundImage: `repeating-linear-gradient(135deg, ${color} 0 1px, transparent 1px ${size}px)`,
      }}
    />
  );
}

/* ─── WatermarkCode ──────────────────────────────────────────────────
   Énorme code de référence en background, opacité très faible. */
export function WatermarkCode({
  code,
  className,
  size = "clamp(8rem, 22vw, 22rem)",
}: {
  code: string;
  className?: string;
  size?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute font-display font-extrabold pointer-events-none select-none",
        className
      )}
      style={{
        fontSize: size,
        lineHeight: 0.85,
        color: "var(--text-primary)",
        opacity: 0.035,
        letterSpacing: "-0.04em",
      }}
    >
      {code}
    </span>
  );
}

/* ─── TitleBlock ─────────────────────────────────────────────────────
   Bloc cartouche style plan CAO (en bas à droite d'une feuille). */
export function TitleBlock({
  rows,
  className,
}: {
  rows: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-[var(--line-medium)] grid",
        className
      )}
      style={{ gridTemplateColumns: "auto 1fr" }}
    >
      {rows.map(({ label, value }, i) => (
        <div key={label} className="contents">
          <div
            className={cn(
              "px-3 py-2 border-r border-[var(--line-subtle)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--text-muted)] flex items-center",
              i < rows.length - 1 && "border-b border-[var(--line-subtle)]"
            )}
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            {label}
          </div>
          <div
            className={cn(
              "px-3 py-2 font-mono text-[11px] text-[var(--text-secondary)] flex items-center",
              i < rows.length - 1 && "border-b border-[var(--line-subtle)]"
            )}
          >
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── RulerMarks ─────────────────────────────────────────────────────
   Petites graduations horizontales façon règle. */
export function RulerMarks({
  count = 20,
  className,
  color = "var(--line-medium)",
}: {
  count?: number;
  className?: string;
  color?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-end h-3 gap-0", className)}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex-1"
          style={{
            background: color,
            width: 1,
            height: i % 5 === 0 ? "100%" : "55%",
            opacity: i % 5 === 0 ? 0.9 : 0.5,
            marginRight: i === count - 1 ? 0 : "auto",
          }}
        />
      ))}
    </div>
  );
}

/* ─── SectionFrame ───────────────────────────────────────────────────
   Frame complète "feuille de plan" : corners + watermark + title block
   en option. */
export function SectionFrame({
  children,
  code,
  className,
  showCorners = true,
  showWatermark = true,
}: {
  children: React.ReactNode;
  code?: string;
  className?: string;
  showCorners?: boolean;
  showWatermark?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      {showCorners && (
        <BlueprintCorners
          size={22}
          color="var(--line-medium)"
          inset="2rem"
          className="hidden lg:block"
        />
      )}
      {showWatermark && code && (
        <WatermarkCode
          code={code}
          className="top-12 right-6 lg:right-16"
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
