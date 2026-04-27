"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { language } = useLanguage();
  const pathname = usePathname();

  const isAuthPage = pathname === "/auth";

  const navLinks = [
    { href: "/", label_ar: "الرئيسية", label_en: "Home" },
    { href: "/catalog", label_ar: "العقارات", label_en: "Properties" },
    { href: "/about", label_ar: "عن إيوان", label_en: "About" },
    { href: "/contact", label_ar: "تواصل معنا", label_en: "Contact" },
  ];

  return (
    <nav className="fixed w-full z-50 px-6 py-6 transition-all duration-300">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-zinc-950/40 backdrop-blur-2xl border border-white/5 rounded-[32px] px-8 py-4 flex justify-between items-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <Link href="/" className="hover:opacity-80 transition-all hover:scale-105 active:scale-95">
            <Logo className="text-primary" />
          </Link>
          
          <div className="flex items-center gap-10">
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                 <Link 
                    key={link.href}
                    href={link.href} 
                    className={`transition-all hover:text-primary relative py-2 text-sm uppercase tracking-widest ${
                      pathname === link.href 
                        ? "text-primary font-black" 
                        : "text-zinc-400 font-medium"
                    }`}
                 >
                    {language === "ar" ? link.label_ar : link.label_en}
                    {pathname === link.href && (
                      <span className="absolute -bottom-1 left-0 right-0 h-1 bg-primary rounded-full shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
                    )}
                 </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-6 border-r pr-6 border-white/10 h-10">
               <LanguageToggle />
               {!isAuthPage && (
                 <Link href="/auth">
                   <Button variant="outline" className="bg-primary/5 border-primary/20 text-primary hover:bg-primary hover:text-black font-bold rounded-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                      {language === "ar" ? "دخول" : "Sign In"}
                   </Button>
                 </Link>
               )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
