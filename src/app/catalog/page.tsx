"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Navbar } from "@/components/navbar";
import { PropertyCard } from "@/components/property-card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";

export default function CatalogPage() {
  const [units, setUnits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const supabase = createClient();

  useEffect(() => {
    async function fetchUnits() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("units")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching units:", error);
      } else {
        setUnits(data || []);
      }
      setIsLoading(false);
    }
    fetchUnits();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <header className="mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">
            {language === "ar" ? "كتالوج العقارات" : "Property Catalog"}
          </h1>
          <p className="text-zinc-500 text-xl font-light">
            {language === "ar" ? "استكشف مجموعتنا الحصرية من الوحدات السكنية" : "Explore our exclusive collection of residential units"}
          </p>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-[500px] w-full rounded-[40px] bg-white/5" />
            ))}
          </div>
        ) : units.length === 0 ? (
          <div className="text-center py-20 bg-card/20 rounded-[40px] border border-dashed border-white/10">
            <h2 className="text-2xl font-bold">لا توجد عقارات متاحة حالياً</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {units.map((unit, index) => (
              <PropertyCard key={unit.id} property={unit} index={index} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
