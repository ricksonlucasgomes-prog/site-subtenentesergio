"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function GlobalLogoParallax() {
  const logoRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyTransform = () => {
      if (!logoRef.current) return;

      const scrollY = window.scrollY || 0;
      const maxOffset = mediaQuery.matches ? 0 : 54;
      const speed = mediaQuery.matches || reducedMotionQuery.matches ? 0 : 0.042;
      const offsetY = Math.min(maxOffset, scrollY * speed);

      logoRef.current.style.transform = `translate3d(-50%, calc(-50% + ${offsetY.toFixed(2)}px), 0)`;
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        applyTransform();
      });
    };

    applyTransform();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div aria-hidden="true" className="global-logo-layer">
      <div ref={logoRef} className="global-logo-mark">
        <Image
          src="/images/logo-watermark.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}
