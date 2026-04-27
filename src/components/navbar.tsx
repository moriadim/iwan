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
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo className="text-primary" />
        </Link>
        
        <div className="flex items-center gap-8">
          <div className="space-x-8 space-x-reverse hidden md:flex items-center">
            {navLinks.map((link) => (
               <Link 
                  key={link.href}
                  href={link.href} 
                  className={`transition-all hover:text-primary relative py-1 ${
                    pathname === link.href 
                      ? "text-primary font-bold" 
                      : "text-muted-foreground"
                  }`}
               >
                  {language === "ar" ? link.label_ar : link.label_en}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-all" />
                  )}
               </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4 border-r pr-4 border-white/10">
             <LanguageToggle />
             {!isAuthPage && (
               <Link href="/auth">
                 <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold rounded-xl transition-all hover:scale-105">
                    {language === "ar" ? "دخول" : "Sign In"}
                 </Button>
               </Link>
             )}
          </div>
        </div>
      </div>
    </nav>
  );
}
