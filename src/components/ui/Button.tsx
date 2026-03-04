import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const baseClass =
  "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:scale-[1.02] disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-[#101113] shadow-[0_12px_28px_rgba(255,223,0,0.28)] hover:bg-primary-hover hover:shadow-[0_18px_38px_rgba(255,223,0,0.34)] active:bg-primary-active",
  secondary:
    "border border-[var(--stroke)] bg-transparent text-foreground hover:bg-white/[0.06] hover:border-border-strong",
  ghost: "text-foreground hover:bg-card",
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

