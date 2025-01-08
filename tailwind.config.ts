import type { Config } from "tailwindcss";

export default {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-primary-contrast": "var(--color-text-primary-contrast)",
        "text-secondary-contrast": "var(--color-text-secondary-contrast)",
        "green": "var(--color-green)",
        "green-light": "var(--color-green-light)",
        "green-dark": "var(--color-green-dark)",
        "yellow": "var(--color-yellow)",
        "yellow-light": "var(--color-yellow-light)",
        "yellow-dark": "var(--color-yellow-dark)",
        "purple": "var(--color-purple)",
        "purple-light": "var(--color-purple-light)",
        "purple-dark": "var(--color-purple-dark)",
        "orange": "var(--color-orange)",
        "orange-light": "var(--color-orange-light)",
        "orange-dark": "var(--color-orange-dark)",
      },
    },
    fontFamily: {
      sans: "var(--font-family-sans)",
      mono: "var(--font-family-mono)"
    }
  },
  plugins: [],
} satisfies Config;
