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
      className={`group relative overflow-hidden rounded-2xl border border-[var(--stroke)] bg-[var(--glass)] p-6 text-foreground shadow-[var(--shadow)] backdrop-blur-[18px] transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-[var(--glass-strong)] motion-safe:hover:shadow-[var(--shadow-hover)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 38%, transparent 72%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
});
