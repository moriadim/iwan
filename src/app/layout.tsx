import type { Metadata } from "next";
import { Outfit, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const notoAr = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-ar",
});

export const metadata: Metadata = {
  title: "Iwan | Real Estate Extranet",
  description: "Modern Luxury Real Estate in Dubai & Riyadh",
};

import { LanguageProvider } from "@/components/language-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" className={`${outfit.variable} ${notoAr.variable} h-full antialiased dark`}>
      <body className="min-h-full font-sans bg-background text-foreground">
        <LanguageProvider>
          {children}
          <Toaster position="top-center" />
        </LanguageProvider>
      </body>
    </html>
  );
}
