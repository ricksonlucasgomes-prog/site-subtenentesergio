 "use client";

import { useEffect, useRef } from "react";

export function GlobalBackground() {
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const scrollYRef = useRef(0);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyParallax = (scrollY: number) => {
      if (!parallaxRef.current) {
        return;
      }

      const progress = Math.min(1, Math.max(0, scrollY / 900));
      const offsetY = progress * 40;
      parallaxRef.current.style.transform = `translate3d(0, ${offsetY.toFixed(2)}px, 0)`;
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
      if (reduceMotionRef.current && parallaxRef.current) {
        parallaxRef.current.style.transform = "translate3d(0, 0, 0)";
      } else {
        scrollYRef.current = window.scrollY || 0;
        applyParallax(scrollYRef.current);
      }
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
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div ref={parallaxRef} className="absolute inset-0 will-change-transform">
        <div
          className="global-watermark-logo absolute inset-0"
          style={{
            backgroundImage: "url('/logo.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "clamp(900px, 70vw, 1400px)",
            opacity: 0.16,
            filter:
              "blur(6px) brightness(1.15) drop-shadow(0 0 24px rgba(255,255,255,0.07))",
            WebkitMaskImage:
              "radial-gradient(circle at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 45%, rgba(0,0,0,0.25) 72%, transparent 100%)",
            maskImage:
              "radial-gradient(circle at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 45%, rgba(0,0,0,0.25) 72%, transparent 100%)",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-black/36" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_65%)]" />
    </div>
  );
}
