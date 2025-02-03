import type { Config } from "tailwindcss";

export default {
  dimMode: 'selector',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-(nebular|star|galaxy|solar|panel)(-foreground)?/,
    },
    {
      pattern: /delay-.*/
    }
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background))",
        foreground: "rgb(var(--color-foreground))",
        neutral: "rgb(var(--color-neutral))",

        panel: {
          DEFAULT: "rgb(var(--color-panel))",
          foreground: "rgb(var(--color-panel-foreground))",
        },

        nebular: {
          DEFAULT: "rgb(var(--color-nebular))",
          foreground: "rgb(var(--color-nebular-foreground))",
        },
        star: {
          DEFAULT: "rgb(var(--color-star))",
          foreground: "rgb(var(--color-star-foreground))",
        },
        galaxy: {
          DEFAULT: "rgb(var(--color-galaxy))",
          foreground: "rgb(var(--color-galaxy-foreground))",
        },
        solar: {
          DEFAULT: "rgb(var(--color-solar))",
          foreground: "rgb(var(--color-solar-foreground))",
        },

        shade: {
          fade: "rgb(var(--color-shade-fade))",
          neutral: "rgb(var(--color-shade-neutral))",
          contrast: "rgb(var(--color-shade-contrast))",
        }
      },
      fontFamily: {
        sans: "var(--font-family-sans)",
        mono: "var(--font-family-mono)"
      },
      spacing: {
        header: "6rem",
        block: "12rem",
        group: "3rem",
        component: "2rem",
        paragraph: "1rem",
      }
    },
  },
  plugins: [],
} satisfies Config;
