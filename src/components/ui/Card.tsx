import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CardProps = ComponentPropsWithoutRef<"article"> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <article
      {...props}
      className={`group relative overflow-hidden rounded-2xl border border-[var(--stroke)] bg-[linear-gradient(180deg,var(--panel),rgba(255,255,255,0.005))] p-6 text-foreground shadow-[var(--shadow)] backdrop-blur-[12px] transition-all duration-300 motion-safe:hover:-translate-y-0.5 hover:border-[var(--stroke-strong)] hover:bg-[linear-gradient(180deg,var(--panel-strong),rgba(255,255,255,0.007))] hover:shadow-[var(--shadow-hover)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.025)_0%,transparent_100%)] opacity-[0.28] transition-opacity duration-300 group-hover:opacity-[0.4]"
      />
      <div className="relative z-10">{children}</div>
    </article>
  );
}
