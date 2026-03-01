import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        card: "var(--card)",
        yellow: "var(--brand-yellow)",
        blue: "var(--brand-blue)",
        green: "var(--brand-green)",
      },
    },
  },
} satisfies Config;