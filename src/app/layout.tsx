import type { Metadata } from "next";
import { Red_Hat_Display, Red_Hat_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-family-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"]
});
const redHatMono = Red_Hat_Mono({
  variable: "--font-family-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700",]
});

export const metadata: Metadata = {
  title: "Zane Chen",
  icons: "favicon.svg",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          `${redHatDisplay.variable} ${redHatMono.variable} antialiased w-full inset-0 bg-background text-foreground black`
        }
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
