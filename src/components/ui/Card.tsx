import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CardProps = ComponentPropsWithoutRef<"article"> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <article
      {...props}
      className={`group relative overflow-hidden rounded-[1.75rem] border border-[var(--stroke)] bg-[linear-gradient(180deg,rgba(11,23,45,0.9),rgba(8,16,31,0.82))] p-6 text-foreground shadow-[var(--shadow)] backdrop-blur-[15px] transition-all duration-300 motion-safe:hover:-translate-y-1 hover:border-[var(--stroke-strong)] hover:shadow-[var(--shadow-hover)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.055)_0%,transparent_100%)] opacity-45"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,223,0,0.06),transparent_24%)] opacity-80" />
      <div className="relative z-10">{children}</div>
    </article>
  );
}
