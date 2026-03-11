"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  durationMs?: number;
  startDelayMs?: number;
  className?: string;
};

export function AnimatedCounter({
  value,
  suffix,
  durationMs = 1200,
  startDelayMs = 0,
  className = "",
}: AnimatedCounterProps) {
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasStartedRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const runAnimation = () => {
      if (prefersReducedMotion) {
        setDisplayValue(value);
        return;
      }

      const startTime = performance.now();
      const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3;

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        const eased = easeOutCubic(progress);

        setDisplayValue(Math.round(value * eased));

        if (progress < 1) {
          rafRef.current = window.requestAnimationFrame(tick);
          return;
        }

        setDisplayValue(value);
      };

      rafRef.current = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasStartedRef.current) return;

          hasStartedRef.current = true;
          timeoutRef.current = window.setTimeout(runAnimation, startDelayMs);
          observer.disconnect();
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [durationMs, startDelayMs, value]);

  return (
    <span ref={elementRef} className={className}>
      {displayValue}
      {suffix ?? ""}
    </span>
  );
}
