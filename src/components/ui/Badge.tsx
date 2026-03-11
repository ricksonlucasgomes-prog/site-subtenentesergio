import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border border-border-strong bg-transparent px-3 py-1 text-xs font-bold uppercase tracking-wide text-foreground backdrop-blur-sm ${className}`}
    >
      {children}
    </span>
  );
}

