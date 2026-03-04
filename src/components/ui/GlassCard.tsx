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
      className={`group relative overflow-hidden rounded-2xl border border-white/12 bg-white/7 p-6 text-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.07)] backdrop-blur-xl transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-white/10 motion-safe:hover:shadow-[0_28px_80px_rgba(0,0,0,0.62),0_0_0_1px_rgba(0,39,118,0.22),0_0_34px_rgba(255,223,0,0.10)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 38%, transparent 72%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
});
