"use client";

import { useLanguage } from "./language-provider";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors"
      onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
    >
      <Globe size={18} />
      <span className="font-medium">{language === "ar" ? "EN" : "عربي"}</span>
    </Button>
  );
}
