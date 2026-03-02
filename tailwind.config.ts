import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-dark": "var(--color-primary-dark)",
        "primary-soft": "var(--color-primary-soft)",
        accent: "var(--color-accent)",
        "accent-dark": "var(--color-accent-dark)",
        "accent-soft": "var(--color-accent-soft)",
        secondary: "var(--color-secondary)",
        "secondary-dark": "var(--color-secondary-dark)",
        "secondary-soft": "var(--color-secondary-soft)",
        bg: "var(--color-bg)",
        "bg-soft": "var(--color-bg-soft)",
        card: "var(--color-card)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        black: "var(--color-black)",
        white: "var(--color-white)",

        /* Backward-compatible names already used in page.tsx */
        fg: "var(--color-text)",
        muted: "var(--color-text-muted)",
        yellow: "var(--color-accent)",
        blue: "var(--color-secondary)",
        green: "var(--color-primary)",
        "yellow-hover": "var(--color-accent-dark)",
        "green-soft": "var(--color-primary-soft)",
      },
    },
  },
} satisfies Config;
