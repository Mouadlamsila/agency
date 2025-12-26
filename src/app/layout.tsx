import type { Metadata } from "next";
import { Inter_Tight, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import I18nProvider from "@/components/providers/I18nProvider";


// Load Clash Display locally (simulated with localFont for now, assuming file exists or fallback)
// If Clash Display isn't available, we'll use a strong fallback or just Inter Tight for now
// For this environment, I'll use Inter Tight as the sans and a local font setup for Display if I had the file.
// Since I don't have the file, I will use Inter Tight for both but with different weights/styles or try to find a similar Google Font.
// Actually, the user requested Clash Display. I will simulate it or use a similar Google Font like 'Syne' or 'Outfit' if I can't load local.
// But `next/font/google` is safer. Let's use 'Outfit' as a proxy for Clash Display if we want a modern display font, 
// or just stick to Inter Tight for everything if we want to be safe.
// Let's use Inter Tight for now and define a custom class for display.

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Syne } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-clash-display", // Mapping Syne to the variable we used in CSS
  display: "swap",
});


export const metadata: Metadata = {
  title: "Agency | Premium Digital Experience",
  description: "Full-Stack Freelance Duo. Engineering-driven, cinematic, high-conversion websites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${interTight.variable} ${geistMono.variable} antialiased bg-brand-dark text-foreground overflow-x-hidden selection:bg-brand-blue selection:text-white`}
      >
        <NoiseOverlay />
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
