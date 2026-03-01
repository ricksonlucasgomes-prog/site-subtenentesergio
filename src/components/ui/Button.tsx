import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const baseClass =
  "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-green disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-linear-to-br from-yellow to-yellow-hover text-fg shadow-md hover:shadow-lg hover:brightness-105",
  secondary: "border border-green text-green hover:bg-green-soft",
  ghost: "text-fg hover:bg-green-soft",
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
