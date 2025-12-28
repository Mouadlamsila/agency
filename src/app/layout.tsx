import type { Metadata } from "next";
import { Space_Grotesk, Readex_Pro, Geist_Mono } from "next/font/google";
import "./globals.css";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import I18nProvider from "@/components/providers/I18nProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const readexPro = Readex_Pro({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-readex-pro",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${readexPro.variable} ${geistMono.variable}`}>
      <body
        className="antialiased bg-brand-dark text-foreground selection:bg-brand-blue selection:text-white"
      >
        <NoiseOverlay />
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
