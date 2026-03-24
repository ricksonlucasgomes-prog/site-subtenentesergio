import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const baseClass =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:-translate-y-0.5 disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-[rgba(40,150,88,0.44)] bg-[linear-gradient(180deg,#17864d_0%,#0d6a39_100%)] text-white shadow-[0_14px_28px_rgba(5,56,30,0.2),0_1px_0_rgba(255,255,255,0.12)_inset] hover:border-[rgba(58,176,107,0.52)] hover:bg-[linear-gradient(180deg,#1b9758_0%,#117643_100%)] hover:shadow-[0_17px_32px_rgba(5,56,30,0.24),0_1px_0_rgba(255,255,255,0.14)_inset] active:translate-y-0 active:bg-[linear-gradient(180deg,#147d48_0%,#0b6134_100%)]",
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
