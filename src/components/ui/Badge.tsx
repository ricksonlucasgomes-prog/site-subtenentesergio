import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border border-green/30 bg-green-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-green ${className}`}
    >
      {children}
    </span>
  );
}
