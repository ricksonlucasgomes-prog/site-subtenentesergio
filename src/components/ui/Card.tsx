import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CardProps = ComponentPropsWithoutRef<"article"> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <article
      {...props}
      className={`group relative overflow-hidden rounded-2xl border border-white/14 bg-white/5 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 motion-safe:hover:-translate-y-0.5 hover:border-white/30 hover:shadow-[0_24px_52px_rgba(242,195,0,0.16)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(155deg,rgba(255,255,255,0.08)_0%,transparent_56%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-[15px] border border-white/8"
      />
      <div className="relative z-10">{children}</div>
    </article>
  );
}
