import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CardProps = ComponentPropsWithoutRef<"article"> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <article
      {...props}
      className={`group relative overflow-hidden rounded-2xl border border-[var(--stroke)] bg-[var(--panel)] p-6 text-foreground shadow-[var(--shadow)] backdrop-blur-[16px] transition-all duration-300 motion-safe:hover:-translate-y-0.5 hover:border-[var(--stroke-strong)] hover:bg-[var(--panel-strong)] hover:shadow-[var(--shadow-hover)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(155deg,rgba(255,255,255,0.05)_0%,transparent_56%)] opacity-55 transition-opacity duration-300 group-hover:opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-[15px] border border-white/[0.05]"
      />
      <div className="relative z-10">{children}</div>
    </article>
  );
}
