import { Navbar } from "@/components/navbar";
import { motion } from "framer-motion";

interface Section {
  title_ar: string;
  title_en: string;
  content_ar: string;
  content_en: string;
}

export default function GenericPage({ 
  title_ar, 
  title_en, 
  sections 
}: { 
  title_ar: string, 
  title_en: string, 
  sections: Section[] 
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-6 pt-40 pb-20 max-w-4xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-primary">{title_ar}</h1>
          <h2 className="text-2xl md:text-3xl font-light mb-16 text-zinc-500">{title_en}</h2>
          
          <div className="space-y-16">
            {sections.map((section, i) => (
              <div key={i} className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                   <h3 className="text-2xl font-bold text-white pr-4 border-r-4 border-primary leading-none">
                     {section.title_ar}
                   </h3>
                   <span className="text-zinc-600 hidden md:inline">|</span>
                   <h4 className="text-xl font-medium text-zinc-400 italic">
                     {section.title_en}
                   </h4>
                </div>
                <div className="grid md:grid-cols-2 gap-8 text-zinc-400 leading-relaxed font-light">
                   <p className="text-lg">{section.content_ar}</p>
                   <p className="text-lg opacity-70 italic font-sans" dir="ltr">{section.content_en}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
      
      <footer className="py-20 border-t border-white/5 text-center text-zinc-600">
         <p>© 2026 IWAN REAL ESTATE. جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
}
