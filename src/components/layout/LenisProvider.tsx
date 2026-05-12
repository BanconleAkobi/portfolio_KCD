"use client";
import { useEffect } from "react";

export default function LenisProvider() {
  useEffect(() => {
    let lenis: { destroy: () => void; raf: (time: number) => void } | null = null;

    async function init() {
      const { default: Lenis } = await import("lenis");
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    init();
    return () => lenis?.destroy();
  }, []);

  return null;
}
