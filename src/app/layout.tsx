import type { Metadata } from "next";
import { Geist, Red_Hat_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ScollToTopOnNavigate from "@/components/layout/scroll-to-top";
import { twJoin } from "tailwind-merge";

const redHatDisplay = Geist({
  variable: "--font-family-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"]
});
const redHatMono = Red_Hat_Mono({
  variable: "--font-family-mono",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twJoin(
          `${redHatDisplay.variable} ${redHatMono.variable} antialiased`,
          "w-full min-h-screen bg-background text-foreground black"
        )
        }
      >
        <Header />
        <div className="min-h-screen">
          {children}
        </div>
        <Footer />
        <ScollToTopOnNavigate />
      </body>
    </html>
  );
}
