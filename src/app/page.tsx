"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/logo";
import { PropertyCard } from "@/components/property-card";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";

const FEATURED_UNITS = [
  {
    id: 1,
    title_ar: "فيلا النخلة جميرا",
    title_en: "Palm Jumeirah Villa",
    price: "4,500,000",
    location_ar: "نخلة جميرا، دبي",
    location_en: "Palm Jumeirah, Dubai",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    category: "فائق الفخامة",
  },
  {
    id: 2,
    title_ar: "شقة برج خليفة",
    title_en: "Burj Khalifa Apartment",
    price: "2,800,000",
    location_ar: "وسط المدينة، دبي",
    location_en: "Downtown Dubai, Dubai",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2196&auto=format&fit=crop",
    category: "إطلالة بانورامية",
  },
  {
    id: 3,
    title_ar: "قصر المربع",
    title_en: "Al Murabba Palace",
    price: "5,200,000",
    location_ar: "الرياض، السعودية",
    location_en: "Riyadh, Saudi Arabia",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
    category: "تراث ملكي",
  },
];

import { Navbar } from "@/components/navbar";

export default function Home() {
  const { language } = useLanguage();

  if (!language) return null; // Safety check

  return (
    <main className="flex-1 overflow-x-hidden">
      <Navbar />

      {/* Hero Section with Motion */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Villa"
            fill
            className="object-cover brightness-50"
            priority
          />
        </motion.div>
        
        <div className="container relative z-10 mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-primary/20 text-primary border-primary backdrop-blur-sm px-4 py-2 text-lg rounded-full">
              {language === "ar" ? "عقارات النخبة في دبي والرياض" : "Elite Real Estate in Dubai & Riyadh"}
            </Badge>
            <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight">
              {language === "ar" ? (
                <>مساحة للفخامة، <span className="text-primary underline decoration-primary/30">إيوان</span></>
              ) : (
                <>Space for Luxury, <span className="text-primary underline decoration-primary/30">IWAN</span></>
              )}
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
              {language === "ar" 
                ? "اكتشف مجموعة حصرية من العقارات الفاخرة المصممة خصيصاً لأولئك الذين يقدرون التميز."
                : "Discover an exclusive collection of luxury properties designed specifically for those who appreciate excellence."}
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xl px-12 py-8 rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105">
                {language === "ar" ? "استكشف الوحدات" : "Explore Units"}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black text-xl px-12 py-8 rounded-full backdrop-blur-md transition-all hover:scale-105">
                {language === "ar" ? "التواصل معنا" : "Contact Us"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Scroll Animation */}
      <section className="py-20 border-y bg-muted/30">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label_ar: "وحدة سكنية", label_en: "Units", value: "+500" },
            { label_ar: "خدمة 24/7", label_en: "24/7 Service", value: "متاحة" },
            { label_ar: "مستثمر", label_en: "Investors", value: "+200" },
            { label_ar: "موقع متميز", label_en: "Locations", value: "15" },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="text-5xl font-bold text-primary mb-3 transition-transform group-hover:scale-110">{stat.value}</div>
              <div className="text-muted-foreground text-lg">
                {language === "ar" ? stat.label_ar : stat.label_en}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-32 container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl font-bold mb-4">
              {language === "ar" ? "الوحدات المختارة" : "Featured Units"}
            </h2>
            <p className="text-muted-foreground text-lg">
              {language === "ar" ? "أفضل الفرص العقارية المتاحة حالياً" : "The best real estate opportunities currently available"}
            </p>
          </motion.div>
          <Link href="/catalog" className="text-primary hover:underline flex items-center gap-2 text-lg font-medium group">
            {language === "ar" ? "عرض الكل" : "View All"}
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {FEATURED_UNITS.map((unit, index) => (
            <PropertyCard key={unit.id} property={unit} index={index} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-white py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-right">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
            <Link href="/">
              <Logo className="text-primary" />
            </Link>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-zinc-400">
              <Link href="/about" className="hover:text-primary transition-colors">
                {language === "ar" ? "عن إيوان" : "About Iwan"}
              </Link>
              <Link href="/catalog" className="hover:text-primary transition-colors">
                {language === "ar" ? "العقارات" : "Properties"}
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                {language === "ar" ? "تواصل معنا" : "Contact"}
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5 text-zinc-500">
             <div className="flex gap-8">
                <Link href="/privacy" className="hover:text-white transition-colors text-sm">
                  {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors text-sm">
                  {language === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
                </Link>
             </div>
             <p className="text-sm">© 2026 إيوان للعقارات. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
