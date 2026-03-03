import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        "background-soft": "var(--color-background-soft)",
        card: "var(--color-card)",
        "card-strong": "var(--color-card-strong)",
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        foreground: "var(--color-foreground)",
        "muted-foreground": "var(--color-muted-foreground)",
        "subtle-foreground": "var(--color-subtle-foreground)",

        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-active": "var(--color-primary-active)",
        "primary-soft": "var(--color-primary-soft)",
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        "accent-soft": "var(--color-accent-soft)",
        secondary: "var(--color-secondary)",
        "secondary-dark": "var(--color-secondary-dark)",
        "secondary-soft": "var(--color-secondary-soft)",
        black: "var(--color-black)",
        white: "var(--color-white)",

        /* Backward-compatible names */
        bg: "var(--color-background)",
        "bg-soft": "var(--color-background-soft)",
        text: "var(--color-foreground)",
        "text-muted": "var(--color-muted-foreground)",
        fg: "var(--color-foreground)",
        muted: "var(--color-muted-foreground)",
        yellow: "var(--color-primary)",
        "yellow-hover": "var(--color-primary-hover)",
        blue: "var(--color-secondary)",
        green: "var(--color-accent)",
        "green-soft": "var(--color-accent-soft)",
      },
    },
  },
} satisfies Config;
