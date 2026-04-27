"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { Target, History, Award, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stats = [
  { label_ar: "سنوات من الخبرة", label_en: "Years of Experience", value: "12+" },
  { label_ar: "وحدات فاخرة", label_en: "Luxury Units", value: "850+" },
  { label_ar: "عملاء راضون", label_en: "Happy Clients", value: "1.2k" },
  { label_ar: "استثمارات مدارة", label_en: "Managed Investments", value: "$2B+" },
];

export default function AboutPage() {
  const { language } = useLanguage();

  const isAr = language === "ar";

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-primary/30" dir={isAr ? "rtl" : "ltr"}>
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1574950578143-858c6fc58922?q=80&w=1974&auto=format&fit=crop"
            alt="Iwan Heritage"
            fill
            className="object-cover brightness-[0.3]"
            priority
          />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-none">
                {isAr ? (
                  <>إرث من <span className="text-primary italic">الفخامة</span></>
                ) : (
                  <>A Legacy of <span className="text-primary italic">Luxury</span></>
                )}
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
                {isAr
                  ? "إيوان ليست مجرد منصة عقارية، بل هي تجسيد للجمال المعماري والابتكار التقني في دبي والرياض."
                  : "Iwan is more than just a real estate platform; it's the embodiment of architectural beauty and technological innovation in Dubai & Riyadh."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-32 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: isAr ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 text-primary">
                <History size={32} />
                <h2 className="text-3xl font-bold">{isAr ? "قصتنا" : "Our Story"}</h2>
              </div>
              <p className="text-xl text-zinc-400 leading-relaxed font-light">
                {isAr
                  ? "بدأت رحلتنا في عام 2014 برؤية واحدة: تبسيط عملية الوصول إلى أفخم العقارات في منطقة الخليج العربي. من مكتب صغير في دبي، تطورنا لنصبح الوجهة الأولى للمستثمرين الذين يبحثون عن التفرد."
                  : "Our journey began in 2014 with a single vision: to simplify the process of accessing the most luxurious properties in the Arabian Gulf. From a small office in Dubai, we have evolved into the premier destination for investors seeking exclusivity."}
              </p>
              <p className="text-xl text-zinc-400 leading-relaxed font-light">
                {isAr
                  ? "نحن نؤمن بأن المنزل هو انعكاس للذات، ولذلك ننتقي وحداتنا بعناية فائقة لضمان تلبية أعلى معايير الجودة والرفاهية."
                  : "We believe that a home is a reflection of oneself, which is why we meticulously curate our units to ensure the highest standards of quality and luxury are met."}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop"
                alt="Modern Architecture"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission Cards */}
        <section className="py-32 bg-zinc-950/50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="bg-card/40 backdrop-blur-2xl border-white/5 rounded-[40px] p-12 group hover:border-primary/20 transition-all duration-500">
                <CardContent className="p-0 space-y-6">
                  <div className="p-4 bg-primary/10 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                    <Target className="text-primary" size={40} />
                  </div>
                  <h3 className="text-4xl font-bold">{isAr ? "رؤيتنا" : "Our Vision"}</h3>
                  <p className="text-xl text-zinc-400 font-light leading-relaxed">
                    {isAr
                      ? "أن نكون القوة الدافعة وراء التحول الرقمي في قطاع العقارات الفاخرة، ووضع معايير عالمية جديدة للخدمة والشفافية."
                      : "To be the driving force behind digital transformation in the luxury real estate sector, setting new global standards for service and transparency."}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card/40 backdrop-blur-2xl border-white/5 rounded-[40px] p-12 group hover:border-emerald-500/20 transition-all duration-500">
                <CardContent className="p-0 space-y-6">
                  <div className="p-4 bg-emerald-500/10 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                    <Award className="text-emerald-500" size={40} />
                  </div>
                  <h3 className="text-4xl font-bold">{isAr ? "مهمتنا" : "Our Mission"}</h3>
                  <p className="text-xl text-zinc-400 font-light leading-relaxed">
                    {isAr
                      ? "توفير تجربة سلسة وآمنة لعملائنا لاكتشاف وإدارة استثماراتهم العقارية من خلال تقنيات الذكاء الاصطناعي والواقع المعزز."
                      : "To provide a seamless and secure experience for our clients to discover and manage their real estate investments through AI and AR technologies."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-40">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-4 group"
                >
                  <div className="text-6xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform cursor-default">
                    {stat.value}
                  </div>
                  <div className="text-zinc-500 text-lg">
                    {isAr ? stat.label_ar : stat.label_en}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 container mx-auto px-6">
          <div className="bg-primary rounded-[50px] p-20 text-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
             <div className="relative z-10 transition-transform duration-500 group-hover:scale-105">
                <h2 className="text-5xl md:text-6xl font-bold text-black mb-8 leading-tight">
                  {isAr ? "جاهز لبدء رحلتك مع إيوان؟" : "Ready to start your journey with Iwan?"}
                </h2>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                   <Link href="/catalog">
                      <Button className="bg-black text-white hover:bg-black/80 px-12 py-8 rounded-2xl text-xl font-bold shadow-2xl">
                         {isAr ? "استكشف العقارات" : "Explore Properties"}
                      </Button>
                   </Link>
                   <Link href="/contact">
                      <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white px-12 py-8 rounded-2xl text-xl font-bold transition-all">
                         {isAr ? "تحدث معنا" : "Talk to us"}
                      </Button>
                   </Link>
                </div>
             </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center text-zinc-600">
         <p>© 2026 IWAN REAL ESTATE. {isAr ? "جميع الحقوق محفوظة" : "All Rights Reserved."}</p>
      </footer>
    </div>
  );
}
