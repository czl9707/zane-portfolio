import type { Config } from "tailwindcss";

export default {
  dimMode: 'selector',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-(green|yellow|purple|purple|textprimary|textsecondary|background|foreground)(-(dim|dimmer|contrast))?/,
      variants: ["hover", "active"]
    },
  ],
  theme: {
    extend: {
      colors: {
        "background": "var(--color-background)",
        "background-dim": "var(--color-background-dim)",
        "background-dimmer": "var(--color-background-dimmer)",

        "foreground": "var(--color-foreground)",
        "foreground-dim": "var(--color-foreground-dim)",
        "foreground-dimmer": "var(--color-foreground-dimmer)",

        "textprimary": "var(--color-text-primary)",
        "textprimary-dim": "var(--color-text-primary-dim)",
        "textprimary-dimmer": "var(--color-text-primary-dimmer)",

        "textsecondary": "var(--color-text-secondary)",
        "textsecondary-dim": "var(--color-text-secondary-dim)",
        "textsecondary-dimmer": "var(--color-text-secondary-dimmer)",

        "green": "var(--color-green)",
        "green-dim": "var(--color-green-dim)",
        "green-dimmer": "var(--color-green-dimmer)",
        "green-contrast": "var(--color-green-contrast)",

        "yellow": "var(--color-yellow)",
        "yellow-dim": "var(--color-yellow-dim)",
        "yellow-dimmer": "var(--color-yellow-dimmer)",
        "yellow-contrast": "var(--color-yellow-contrast)",

        "purple": "var(--color-purple)",
        "purple-dim": "var(--color-purple-dim)",
        "purple-dimmer": "var(--color-purple-dimmer)",
        "purple-contrast": "var(--color-purple-contrast)",

        "orange": "var(--color-orange)",
        "orange-dim": "var(--color-orange-dim)",
        "orange-dimmer": "var(--color-orange-dimmer)",
        "orange-contrast": "var(--color-orange-contrast)",
      },
    },
    fontFamily: {
      sans: "var(--font-family-sans)",
      mono: "var(--font-family-mono)"
    }
  },
  plugins: [],
} satisfies Config;
