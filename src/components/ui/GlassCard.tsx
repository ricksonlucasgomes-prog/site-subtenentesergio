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
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-6 text-foreground shadow-[0_18px_48px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.035)] backdrop-blur-xl transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-white/[0.06] motion-safe:hover:shadow-[0_24px_60px_rgba(0,0,0,0.28),0_0_0_1px_rgba(0,39,118,0.16),0_0_24px_rgba(255,223,0,0.08)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.025) 38%, transparent 72%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
});
