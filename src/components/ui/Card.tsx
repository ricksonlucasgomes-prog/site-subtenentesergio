import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CardProps = ComponentPropsWithoutRef<"article"> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <article
      {...props}
      className={`group relative overflow-hidden rounded-2xl border border-[var(--stroke)] bg-[var(--panel)] p-6 text-foreground shadow-[var(--shadow)] backdrop-blur-md transition-all duration-300 motion-safe:hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_20px_44px_rgba(0,0,0,0.26),0_0_0_1px_rgba(0,39,118,0.14),0_0_18px_rgba(255,223,0,0.08)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(155deg,rgba(255,255,255,0.045)_0%,transparent_56%)] opacity-60 transition-opacity duration-300 group-hover:opacity-90"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-[15px] border border-[var(--stroke)]"
      />
      <div className="relative z-10">{children}</div>
    </article>
  );
}
