import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border border-white/12 bg-[rgba(255,255,255,0.03)] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-foreground backdrop-blur-sm ${className}`}
    >
      {children}
    </span>
  );
}

