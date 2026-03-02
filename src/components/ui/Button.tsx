import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const baseClass =
  "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-primary disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-linear-to-br from-accent to-accent-dark text-black shadow-md hover:shadow-lg hover:brightness-105",
  secondary: "border border-primary text-primary hover:bg-primary-soft",
  ghost: "text-text hover:bg-bg-soft",
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
