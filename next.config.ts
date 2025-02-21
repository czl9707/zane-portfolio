import type { NextConfig } from "next";
import { withPigment, extendTheme } from '@pigment-css/nextjs-plugin';


const nextConfig: NextConfig = {};

const theme = extendTheme({
  getSelector: () => 'body',
  colorSchemes: {
    light: {
      colors: {
        default: {
          background: "255 255 255",
          foreground: "0 0 0",
        },
        shade: {
          background: "255 255 255",
          foreground: "0 0 0",
        }
      }
    },
    dark: {
      colors: {
        default: {
          background: "0 0 0",
          foreground: "255 255 255",
        },
        shade: {
          background: "0 0 0",
          foreground: "255 255 255",
        }
      }
    }
  },
  colors: {
    nebular: {
      background: "94 190 115",
      foreground: "255 255 255",
    },
    star: {
      background: "235 239 98",
      foreground: "255 255 255",
    },
    galaxy: {
      background: "218 108 251",
      foreground: "255 255 255",
    },
    solar: {
      background: "246 94 43",
      foreground: "255 255 255",
    },
  },
  spacing: {
    block: "12rem",
    group: "3rem",
    component: "2rem",
    paragraph: "1rem",
  },
  breakpoint: {
    sm: "",
    md: "",
    lg: "",
  },
  typographies: {
    body1: { fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1rem", lineHeight: 1.5, },
    body2: { fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.5, },
    button: { fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.875rem", lineHeight: 1.6, },
    h1: { fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: '6rem', lineHeight: 1.25, },
    h2: { fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: '3.75rem', lineHeight: 1.25, },
    h3: { fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: '3rem', lineHeight: 1.25, },
    h4: { fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: '2.25rem', lineHeight: 1.25, },
    h5: { fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: '1.5rem', lineHeight: 1.4, },
    h6: { fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: '1.25rem', lineHeight: 1.6, },
  },
  transition: {
    short: ".3s",
    long: ".6s",
  },
  size: {
    header: {
      header: "6rem",
    }
  },
})

export default withPigment(
  nextConfig,
  { theme: theme },
);

// keyframes: {
//   slideUp: {
//     from: { transform: "translateY(min(5rem, 100%))", opacity: "0", },
//     to: { transform: "none", opacity: "1", },
//   },
//   slideDown: {
//     from: { transform: "translateY(-100%)", opacity: "0", },
//     to: { transform: "none", opacity: "1", },
//   }
// },
// animation: {
//   slideUp: "slideUp 1s ease-out both",
//     slideDown: "slideDown 1s ease-out forwards"
// }
