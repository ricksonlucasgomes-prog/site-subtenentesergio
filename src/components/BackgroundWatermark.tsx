"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function BackgroundWatermark() {
  const logoRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const scrollYRef = useRef(0);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyParallax = (scrollY: number) => {
      if (!logoRef.current) {
        return;
      }
      const offsetY = Math.min(40, scrollY * 0.06);
      logoRef.current.style.transform = `translate3d(-50%, calc(-50% + ${offsetY.toFixed(2)}px), 0)`;
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
      if (!logoRef.current) {
        return;
      }
      if (reduceMotionRef.current) {
        logoRef.current.style.transform = "translate3d(-50%, -50%, 0)";
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
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[2] select-none overflow-hidden">
      <div
        ref={logoRef}
        className="absolute left-1/2 top-1/2 will-change-transform"
        style={{ transform: "translate3d(-50%, -50%, 0)" }}
      >
        <div className="relative">
          <Image
            src="/images/logo-watermark.png"
            alt=""
            width={1400}
            height={1400}
            priority
            className="h-auto w-[clamp(720px,70vw,1200px)] opacity-[0.08] sm:opacity-[0.11] lg:opacity-[0.14]"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,13,0.26)_0%,rgba(10,11,13,0.42)_100%)]" />
    </div>
  );
}
