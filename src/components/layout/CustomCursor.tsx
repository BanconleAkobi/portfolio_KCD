"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const x = useSpring(0, { stiffness: 900, damping: 50, mass: 0.4 });
  const y = useSpring(0, { stiffness: 900, damping: 50, mass: 0.4 });
  const ringX = useSpring(0, { stiffness: 200, damping: 28, mass: 0.8 });
  const ringY = useSpring(0, { stiffness: 200, damping: 28, mass: 0.8 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    }

    function onEnter(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']")
      ) {
        setIsHovering(true);
      }
    }

    function onLeave(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']")
      ) {
        setIsHovering(false);
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter, { passive: true });
    document.addEventListener("mouseout", onLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [x, y, ringX, ringY, isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <>
      {/* Dot */}
      <motion.div
        ref={dotRef}
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: isHovering ? "var(--accent-blue)" : "var(--text-primary)" }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        animate={{
          opacity: isVisible ? 1 : 0,
          width: isHovering ? 36 : 24,
          height: isHovering ? 36 : 24,
        }}
        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className="w-full h-full rounded-full border"
          style={{
            borderColor: isHovering ? "var(--accent-blue)" : "rgba(255,255,255,0.3)",
          }}
        >
          {/* Crosshair lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-px opacity-30" style={{ background: isHovering ? "var(--accent-blue)" : "var(--text-primary)" }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-px opacity-30" style={{ background: isHovering ? "var(--accent-blue)" : "var(--text-primary)" }} />
          </div>
        </div>
      </motion.div>
    </>
  );
}
