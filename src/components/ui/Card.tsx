import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CardProps = ComponentPropsWithoutRef<"article"> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <article
      {...props}
      className={`group relative overflow-hidden rounded-2xl border border-[var(--stroke)] bg-[var(--panel)] p-6 text-foreground shadow-[var(--shadow)] backdrop-blur-md transition-all duration-300 motion-safe:hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_22px_50px_rgba(0,0,0,0.44),0_0_0_1px_rgba(0,39,118,0.18),0_0_20px_rgba(255,223,0,0.12)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(155deg,rgba(255,255,255,0.06)_0%,transparent_56%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-[15px] border border-[var(--stroke)]"
      />
      <div className="relative z-10">{children}</div>
    </article>
  );
}
