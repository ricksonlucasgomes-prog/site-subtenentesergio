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

    const applyParallax = (scrollY: number) => {
      if (!watermarkRef.current) {
        return;
      }
      const offsetY = Math.min(32, scrollY * 0.045);
      watermarkRef.current.style.transform = `translate3d(-50%, calc(-50% + ${offsetY.toFixed(2)}px), 0)`;
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
          background:
            "radial-gradient(circle at 22% 12%, rgba(255,223,0,0.06), transparent 38%), radial-gradient(circle at 82% 14%, rgba(0,39,118,0.08), transparent 36%), linear-gradient(180deg, var(--bg-0) 0%, var(--bg-1) 48%, var(--bg-0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(80% 70% at 50% 50%, transparent 45%, rgba(0,0,0,0.58) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-30"
        style={{ backgroundImage: "var(--grain)" }}
      />
      <div
        ref={watermarkRef}
        aria-hidden
        className="pointer-events-none fixed left-1/2 top-1/2 z-[1] h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 opacity-[0.11] md:h-[1450px] md:w-[1450px]"
        style={{
          backgroundImage: "url('/images/logo-watermark.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[2] bg-[linear-gradient(180deg,rgba(10,11,13,0.2)_0%,rgba(10,11,13,0.32)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(circle at 16% 24%, rgba(255,223,0,0.04), transparent 32%), radial-gradient(circle at 78% 72%, rgba(0,39,118,0.06), transparent 36%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
