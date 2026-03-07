import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

type GlassCardProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  { children, className = "", ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      {...props}
      className={`group relative overflow-hidden rounded-2xl border border-[var(--stroke)] bg-[linear-gradient(180deg,var(--glass),rgba(255,255,255,0.006))] p-6 text-foreground shadow-[var(--shadow)] backdrop-blur-[13px] transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-[linear-gradient(180deg,var(--glass-strong),rgba(255,255,255,0.01))] motion-safe:hover:shadow-[var(--shadow-hover)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-[0.32]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.032) 0%, rgba(255,255,255,0.008) 44%, transparent 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
});
