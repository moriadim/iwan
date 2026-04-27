import type { Metadata } from "next";
import { Outfit, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });

export const metadata: Metadata = {
  title: "Iwan | Elite Real Estate Extranet",
  description: "The most exclusive real estate portal in the UAE and Saudi Arabia.",
  keywords: "Dubai Real Estate, Luxury Villas, Riyadh Property, Iwan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" className={`${outfit.variable} ${cairo.variable}`}>
      <body className="font-outfit bg-background text-foreground antialiased selection:bg-primary/30">
        <LanguageProvider>
          {children}
          <Toaster position="top-center" richColors theme="dark" />
        </LanguageProvider>
      </body>
    </html>
  );
}
