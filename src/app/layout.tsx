import '@pigment-css/react/styles.css';

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ScollToTopOnNavigate from "@/components/layout/scroll-to-top";
import ThemeCorrector from "@/components/layout/theme-corrector";

import { Geist, Red_Hat_Mono } from "next/font/google";
import { css } from "@pigment-css/react";
import type { Metadata } from "next";

const redHatDisplay = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"]
});
const redHatMono = Red_Hat_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700",]
});

const description = `\
I am Zane Chen. a full-stack software engineer at Bloomberg LP. I enjoy building solutions one block at a time. As I self-taught developer, I share my learning process through personal projects and blogs.
Before joining tech industry, I was an architect, and some personal projects archived here.`;

export const metadata: Metadata = {
  title: "Zane Chen",
  applicationName: "Zane Chen",
  icons: "/favicon.svg",
  description: description,
  openGraph: {
    title: "Zane Chen",
    description: description,
  }
};

const globalClass = css(({ theme }) => ({
  width: "100%", minHeight: "100vh",
  backgroundColor: `rgb(${theme.vars.color.default.background})`,
  color: `rgb(${theme.vars.color.default.foreground})`,

  "a": { color: "inherit", textDecoration: "inherit" },
  "menu,ol,ul": { listStyle: "none" },
}));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          [globalClass, redHatDisplay.variable, redHatMono.variable].join(" ")
        }
      >
        <Header />
        <div className={css(({ theme }) => ({
          paddingTop: theme.size.header.height, minHeight: "100vh"
        }))}>
          {children}
        </div>
        <Footer />
        <ScollToTopOnNavigate />
        <ThemeCorrector />
      </body>
    </html >
  );
}
