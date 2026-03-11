import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const baseClass =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:-translate-y-0.5 disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-[rgba(255,223,0,0.26)] bg-[linear-gradient(180deg,#ffed7b_0%,#ffdf00_100%)] text-[#101113] shadow-[0_18px_40px_rgba(255,223,0,0.2),0_1px_0_rgba(255,255,255,0.26)_inset] hover:bg-[linear-gradient(180deg,#fff19a_0%,#ffe768_100%)] hover:shadow-[0_22px_48px_rgba(255,223,0,0.25),0_1px_0_rgba(255,255,255,0.28)_inset] active:translate-y-0",
  secondary:
    "border border-[var(--stroke)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] text-foreground shadow-[0_14px_28px_rgba(0,0,0,0.12),0_1px_0_rgba(255,255,255,0.03)_inset] hover:border-[var(--stroke-strong)] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.04))]",
  ghost: "text-foreground hover:bg-white/[0.05]",
};

export function buttonStyles(variant: ButtonVariant = "primary", className = "") {
  return `${baseClass} ${variantClasses[variant]} ${className}`.trim();
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={buttonStyles(variant, className)} {...props} />;
}
