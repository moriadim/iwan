"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Navbar } from "@/components/navbar";
import { PropertyCard } from "@/components/property-card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const categories = language === "ar" 
    ? ["الكل", "فيلا", "شقة", "بنتهاوس", "تاون هاوس"] 
    : ["All", "Villa", "Apartment", "Penthouse", "Townhouse"];

  const filteredUnits = units.filter(unit => {
    const matchesSearch = 
      unit.title_ar.toLowerCase().includes(searchTerm.toLowerCase()) || 
      unit.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.location_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.location_en.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || selectedCategory === "الكل" || unit.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100" dir={language === "ar" ? "rtl" : "ltr"}>
      <Navbar />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 tracking-tight">
            {language === "ar" ? "كتالوج العقارات" : "Property Catalog"}
          </h1>
          <p className="text-zinc-400 text-xl font-light max-w-2xl">
            {language === "ar" ? "استكشف مجموعتنا الحصرية من الوحدات السكنية في أرقى أحياء دبي والرياض." : "Explore our exclusive collection of residential units in the most prestigious neighborhoods of Dubai and Riyadh."}
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-16 items-center justify-between">
           <div className="relative w-full md:w-96">
              <input 
                type="text" 
                placeholder={language === "ar" ? "ابحث عن عقار..." : "Search properties..."}
                className="w-full h-14 bg-zinc-900/50 border border-white/5 rounded-2xl px-6 outline-none focus:border-primary/50 transition-all font-light"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex gap-3 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
              {categories.map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setSelectedCategory(cat)}
                   className={`px-8 py-3 rounded-full whitespace-nowrap transition-all font-medium border ${
                     selectedCategory === cat 
                       ? "bg-primary text-black border-primary" 
                       : "bg-zinc-900/50 text-zinc-400 border-white/5 hover:border-white/20"
                   }`}
                 >
                   {cat}
                 </button>
              ))}
           </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-[500px] w-full rounded-[40px] bg-white/5" />
            ))}
          </div>
        ) : filteredUnits.length === 0 ? (
          <div className="text-center py-32 bg-card/10 rounded-[50px] border border-dashed border-white/5">
            <h2 className="text-3xl font-bold text-zinc-500">
               {language === "ar" ? "لم يتم العثور على نتائج تطابق بحثك" : "No results match your search"}
            </h2>
            <button 
               onClick={() => {setSearchTerm(""); setSelectedCategory("All")}}
               className="mt-6 text-primary hover:underline font-medium"
            >
               {language === "ar" ? "إعادة تعيين المرشحات" : "Reset Filters"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredUnits.map((unit, index) => (
              <PropertyCard key={unit.id} property={unit} index={index} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
