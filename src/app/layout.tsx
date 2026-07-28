import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/ui/Cursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EKSCODER — Building Digital Experiences",
  description:
    "EKSCODER builds modern digital products, scalable software, and memorable web experiences through code and technology.",
  keywords: [
    "Creative Developer",
    "Digital Engineering",
    "Next.js",
    "TypeScript",
    "GSAP Animation",
    "Software Studio",
  ],
  authors: [{ name: "EKSCODER" }],
  openGraph: {
    title: "EKSCODER — Building Digital Experiences",
    description:
      "EKSCODER builds modern digital products, scalable software, and memorable web experiences through code and technology.",
    type: "website",
    locale: "en_US",
    siteName: "EKSCODER",
  },
  twitter: {
    card: "summary_large_image",
    title: "EKSCODER — Building Digital Experiences",
    description:
      "EKSCODER builds modern digital products, scalable software, and memorable web experiences through code and technology.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${geistMono.variable} font-sans bg-[#0A0A0A] text-[#F5F5F5] antialiased selection:bg-[#B8FF00] selection:text-black`}
      >
        <LanguageProvider>
          <Cursor />
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
