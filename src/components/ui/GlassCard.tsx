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
      className={`group relative overflow-hidden rounded-[1.9rem] border border-[var(--stroke)] bg-[linear-gradient(180deg,rgba(10,21,42,0.86),rgba(7,14,28,0.78))] p-6 text-foreground shadow-[var(--shadow)] backdrop-blur-[18px] transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[var(--shadow-hover)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.055)_0%,transparent_100%)] opacity-40"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,223,0,0.06),transparent_24%)] opacity-75" />
      <div className="relative z-10">{children}</div>
    </div>
  );
});
