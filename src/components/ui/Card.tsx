import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CardProps = ComponentPropsWithoutRef<"article"> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <article
      {...props}
      className={`relative overflow-hidden rounded-2xl border border-white/15 bg-[#111418]/85 p-6 shadow-[0_20px_45px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_24px_52px_rgba(242,195,0,0.16)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-[15px] border border-white/8"
      />
      <div className="relative z-10">{children}</div>
    </article>
  );
}
