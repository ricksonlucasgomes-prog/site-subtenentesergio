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
    {/* Base color wash + cinematic gradients */}
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: [
          "radial-gradient(circle at 18% 14%, rgba(255,223,0,0.10), transparent 42%)",
          "radial-gradient(circle at 82% 18%, rgba(0,39,118,0.18), transparent 44%)",
          "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 32%, rgba(0,0,0,0.78) 100%)",
          "linear-gradient(180deg, var(--bg-0) 0%, var(--bg-1) 50%, var(--bg-0) 100%)",
        ].join(", "),
      }}
    />

    {/* Vignette (borda mais “cinema”) */}
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(78% 70% at 50% 45%, rgba(0,0,0,0.00) 35%, rgba(0,0,0,0.72) 100%)",
      }}
    />

    {/* Grain bem sutil */}
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.16]"
      style={{ backgroundImage: "var(--grain)" }}
    />

    {/* Watermark logo ao fundo (não mexer nas cores da marca; só opacidade/posição) */}
    <div
      ref={watermarkRef}
      aria-hidden
      className="pointer-events-none fixed left-1/2 top-1/2 z-[3] h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 opacity-[0.18] md:h-[1500px] md:w-[1500px]"
      style={{
        backgroundImage: "url('/images/logo-watermark.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    />

    {/* Scrim top (cinema) */}
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.10) 36%, rgba(0,0,0,0.55) 100%)",
      }}
    />

    {/* Accent glows discretos */}
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{
        background:
          "radial-gradient(circle at 20% 28%, rgba(255,223,0,0.06), transparent 34%), radial-gradient(circle at 76% 72%, rgba(0,39,118,0.10), transparent 40%)",
      }}
    />

    <div className="relative z-10">{children}</div>
  </div>
  );
}
