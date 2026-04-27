"use client";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-none shadow-2xl group bg-card/40 backdrop-blur-sm transition-all hover:shadow-primary/10">
        <div className="relative h-96">
          <Image
            src={property.image_url || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop"}
            alt={property.title_en}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Badge className="absolute top-6 right-6 bg-primary/90 text-primary-foreground text-sm py-1 px-4 rounded-full">
            {property.category}
          </Badge>
          <div className="absolute bottom-6 left-6 right-6 text-white text-right">
            <div className="text-3xl font-bold mb-1">
               {property.price_aed?.toLocaleString()} <span className="text-sm font-normal opacity-80">AED</span>
            </div>
          </div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl mb-1 text-right">
            {language === "ar" ? property.title_ar : property.title_en}
          </CardTitle>
          <div className="flex items-center justify-end text-muted-foreground gap-2">
            <span className="text-md">{language === "ar" ? property.location_ar : property.location_en}</span>
            <MapPin size={18} className="text-primary" />
          </div>
        </CardHeader>
        <CardFooter className="pt-4 border-t border-border/50">
          <Link href={`/catalog/${property.id}`} className="w-full">
            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-500 rounded-xl py-6 font-bold">
               {language === "ar" ? "تفاصيل الوحدة" : "Unit Details"}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
