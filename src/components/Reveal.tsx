"use client";

import { CSSProperties, useEffect } from "react";

type UseScrollRevealOptions = {
  selector?: string;
  threshold?: number;
  rootMargin?: string;
  disabled?: boolean;
};

export function useScrollReveal({
  selector = "[data-reveal]",
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  disabled = false,
}: UseScrollRevealOptions = {}) {
  useEffect(() => {
    if (disabled) {
      return;
    }

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (nodes.length === 0) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      nodes.forEach((node) => node.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [disabled, rootMargin, selector, threshold]);
}

export function revealDelayStyle(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}
