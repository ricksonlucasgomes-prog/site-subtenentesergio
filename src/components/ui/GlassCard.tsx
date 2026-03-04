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
      className={`group relative overflow-hidden rounded-2xl border border-[var(--stroke)] bg-[var(--glass)] p-6 text-foreground shadow-[var(--shadow)] backdrop-blur-xl transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_20px_55px_rgba(0,0,0,0.45),0_0_0_1px_rgba(0,39,118,0.2),0_0_28px_rgba(255,223,0,0.12)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_35%,transparent_70%)] opacity-85"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
});
