import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const baseClass =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:-translate-y-0.5 disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-[rgba(40,150,88,0.4)] bg-[linear-gradient(180deg,#17864d_0%,#0d6a39_100%)] text-white shadow-[0_14px_30px_rgba(5,56,30,0.18),0_1px_0_rgba(255,255,255,0.12)_inset] hover:border-[rgba(58,176,107,0.48)] hover:bg-[linear-gradient(180deg,#1b9758_0%,#117643_100%)] hover:shadow-[0_18px_34px_rgba(5,56,30,0.22),0_1px_0_rgba(255,255,255,0.14)_inset] active:translate-y-0 active:bg-[linear-gradient(180deg,#147d48_0%,#0b6134_100%)]",
  secondary:
    "border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.025))] text-foreground shadow-[0_12px_26px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.03)_inset] hover:border-white/18 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.065),rgba(255,255,255,0.035))]",
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
