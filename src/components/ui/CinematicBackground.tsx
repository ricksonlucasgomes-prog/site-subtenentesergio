"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type CinematicBackgroundProps = {
  children: ReactNode;
};

export default function CinematicBackground({ children }: CinematicBackgroundProps) {
  const watermarkRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const scrollYRef = useRef(0);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const applyParallax = (scrollY: number) => {
      if (!watermarkRef.current) {
        return;
      }
      const maxOffset = mobileQuery.matches ? 26 : 56;
      const speed = mobileQuery.matches ? 0.02 : 0.04;
      const offsetY = Math.min(maxOffset, scrollY * speed);
      watermarkRef.current.style.transform = `translate3d(-50%, calc(-50% + ${offsetY.toFixed(2)}px), 0) scale(1.02)`;
    };

    const flush = () => {
      rafRef.current = null;
      applyParallax(scrollYRef.current);
    };

    const onScroll = () => {
      if (reduceMotionRef.current) {
        return;
      }
      scrollYRef.current = window.scrollY || 0;
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(flush);
      }
    };

    const onMotionChange = () => {
      reduceMotionRef.current = mediaQuery.matches;
      if (!watermarkRef.current) {
        return;
      }
      if (reduceMotionRef.current) {
        watermarkRef.current.style.transform = "translate3d(-50%, -50%, 0)";
        return;
      }
      scrollYRef.current = window.scrollY || 0;
      applyParallax(scrollYRef.current);
    };

    onMotionChange();
    window.addEventListener("scroll", onScroll, { passive: true });
    mediaQuery.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      mediaQuery.removeEventListener("change", onMotionChange);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg-0)]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: [
            "radial-gradient(circle at 16% 12%, rgba(255,223,0,0.08), transparent 36%)",
            "radial-gradient(circle at 82% 18%, rgba(0,39,118,0.16), transparent 42%)",
            "radial-gradient(circle at 54% 82%, rgba(255,255,255,0.03), transparent 32%)",
            "linear-gradient(180deg, rgba(1,9,28,0.16) 0%, rgba(1,9,28,0.04) 24%, rgba(1,9,28,0.22) 100%)",
            "linear-gradient(180deg, var(--bg-0) 0%, var(--bg-1) 46%, var(--bg-0) 100%)",
          ].join(", "),
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: "radial-gradient(84% 72% at 50% 45%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.38) 100%)",
        }}
      />

      <div aria-hidden className="site-watermark-shell">
        <div ref={watermarkRef} className="site-watermark-logo global-watermark-logo" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[2] opacity-[0.11]"
        style={{ backgroundImage: "var(--grain)" }}
      />

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.03) 30%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      <div aria-hidden className="pointer-events-none fixed inset-0 z-[2] site-section-glow" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
