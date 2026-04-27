"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import { useLanguage } from "./language-provider";

interface Property {
  id: string | number;
  title_ar: string;
  title_en: string;
  price_aed: number;
  location_ar: string;
  location_en: string;
  image_url: string;
  category: string;
}

export function PropertyCard({ property, index }: { property: Property; index: number }) {
  const { language } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border border-white/5 shadow-2xl group bg-zinc-900/40 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:shadow-primary/5 rounded-[40px] h-full">
        <div className="relative h-96 overflow-hidden">
          <Image
            src={imageError ? fallbackImage : (property.image_url || fallbackImage)}
            alt={property.title_en}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
          
          <div className="absolute top-6 right-6 flex flex-col items-end gap-3 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
             <Badge className="bg-primary/95 text-black text-xs font-black uppercase tracking-tighter py-1.5 px-5 rounded-full shadow-lg">
                {property.category}
             </Badge>
          </div>

          <div className="absolute bottom-6 right-6 left-6 flex justify-between items-end">
            <div className="bg-white/10 backdrop-blur-3xl border border-white/10 px-6 py-3 rounded-2xl shadow-2xl">
               <div className="text-sm text-white/60 font-medium mb-0.5">{language === "ar" ? "درهم" : "AED"}</div>
               <div className="text-3xl font-black text-white tracking-tighter">
                  {property.price_aed?.toLocaleString()}
               </div>
            </div>
          </div>
        </div>
        <CardHeader className="pb-4 pt-8 px-8">
          <CardTitle className="text-2xl font-bold mb-2 text-right tracking-tight group-hover:text-primary transition-colors">
            {language === "ar" ? property.title_ar : property.title_en}
          </CardTitle>
          <div className="flex items-center justify-end text-zinc-500 gap-2 font-medium">
            <span className="text-md">{language === "ar" ? property.location_ar : property.location_en}</span>
            <MapPin size={20} className="text-primary/70" />
          </div>
        </CardHeader>
        <CardFooter className="pt-4 pb-8 px-8">
          <Link href={`/catalog/${property.id}`} className="w-full">
            <Button className="w-full bg-zinc-800 text-white hover:bg-primary hover:text-black transition-all duration-700 rounded-2xl py-8 text-lg font-black uppercase tracking-widest shadow-xl">
               {language === "ar" ? "استكشاف الفخامة" : "EXPLORE LUXURY"}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
