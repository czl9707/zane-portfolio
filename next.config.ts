import type { NextConfig } from "next";
import { withPigment, extendTheme } from '@pigment-css/nextjs-plugin';

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "node:path": false,
      }
    }
    return config;
  }
};

export default withPigment(
  nextConfig,
  {
    theme: extendTheme({
      getSelector: () => 'body',
      colorSchemes: {
        light: {
          color: {
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
          color: {
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
      color: {
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
        group: "4rem",
        component: "2.5rem",
        paragraph: "1rem",
      },
      breakpoint: {
        xs: "450px",
        sm: "720px",
        md: "1080px",
        lg: "1440px",
      },
      typographies: {
        body1: { fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1rem", lineHeight: 1.5, },
        body2: { fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.5, },
        button: { fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.875rem", lineHeight: 1.6, },
        h1: { fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: '6rem', lineHeight: 1.25, },
        h2: { fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: '3.75rem', lineHeight: 1.25, },
        h3: { fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: '3rem', lineHeight: 1.25, },
        h4: { fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: '2.25rem', lineHeight: 1.25, },
        h5: { fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: '1.75rem', lineHeight: 1.4, },
        h6: { fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: '1.25rem', lineHeight: 1.6, },
        code: { fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.5, },
      },
      transition: {
        short: ".3s",
        long: ".9s",
      },
      size: {
        header: {
          height: "6rem",
        },
        border: {
          radius: ".25rem",
        },
        sidePanel: {
          width: "16rem",
        }
      },
    })
  },
);
