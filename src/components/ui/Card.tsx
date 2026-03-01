import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <article
      className={`relative overflow-hidden rounded-xl border border-green/20 bg-[rgba(8,12,16,0.65)] p-6 shadow-lg backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-0.5 hover:border-green/35 hover:shadow-xl ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-yellow/25 via-green/25 to-transparent opacity-50 transition-opacity duration-300"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-[11px] border border-white/6"
      />
      <div className="relative z-10">{children}</div>
    </article>
  );
}
