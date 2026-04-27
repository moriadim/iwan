"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/components/language-provider";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function ContactPage() {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isAr = language === "ar";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success(isAr ? "تم إرسال رسالتك بنجاح!" : "Message sent successfully!");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100" dir={isAr ? "rtl" : "ltr"}>
      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-20">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            {isAr ? "تحدث مع " : "Talk to "}
            <span className="text-primary italic">إيوان</span>
          </h1>
          <p className="text-zinc-500 text-xl font-light max-w-2xl mx-auto">
            {isAr 
              ? "نحن هنا لمساعدتكم في العثور على عقار أحلامكم. خبراؤنا متواجدون للرد على جميع استفساراتكم."
              : "We are here to help you find your dream property. Our experts are available to answer all your inquiries."}
          </p>
        </motion.header>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
             {[
               {
                 icon: <Phone className="text-primary" />,
                 label: isAr ? "الهاتف" : "Phone",
                 value: "+971 4 000 0000",
                 desc: isAr ? "دبي (المكتب الرئيسي)" : "Dubai (Head Office)",
               },
               {
                 icon: <Mail className="text-primary" />,
                 label: isAr ? "البريد الإلكتروني" : "Email",
                 value: "concierge@iwan.ae",
                 desc: isAr ? "خدمة العملاء الراقية" : "Elite Customer Service",
               },
               {
                 icon: <MapPin className="text-primary" />,
                 label: isAr ? "الموقع" : "Location",
                 value: isAr ? "مركز دبي المالي العالمي" : "DIFC, Dubai",
                 desc: isAr ? "الإمارات العربية المتحدة" : "United Arab Emirates",
               },
               {
                 icon: <Clock className="text-primary" />,
                 label: isAr ? "ساعات العمل" : "Work Hours",
                 value: "9:00 AM - 6:00 PM",
                 desc: isAr ? "من الاثنين إلى الجمعة" : "Monday to Friday",
               },
             ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="bg-card/40 backdrop-blur-3xl border-white/5 rounded-3xl p-6 group hover:border-primary/20 transition-all">
                    <CardContent className="p-0 flex items-start gap-6">
                       <div className="p-4 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform">
                          {item.icon}
                       </div>
                       <div>
                          <p className="text-sm text-zinc-500 mb-1">{item.label}</p>
                          <p className="text-xl font-bold mb-1">{item.value}</p>
                          <p className="text-xs text-zinc-600">{item.desc}</p>
                       </div>
                    </CardContent>
                  </Card>
                </motion.div>
             ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
               <Card className="bg-zinc-950/80 backdrop-blur-3xl border-primary/20 rounded-[40px] p-10 md:p-16 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-10 text-primary">
                       <MessageSquare size={32} />
                       <h2 className="text-3xl font-bold">{isAr ? "أرسل لنا رسالة" : "Send us a Message"}</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <Label className="text-md px-1">{isAr ? "الاسم الكامل" : "Full Name"}</Label>
                          <Input 
                            required
                            placeholder={isAr ? "أدخل اسمك هنا" : "Enter your name"}
                            className="bg-zinc-900/50 border-white/5 h-14 rounded-2xl focus:border-primary/50" 
                          />
                       </div>
                       <div className="space-y-3">
                          <Label className="text-md px-1">{isAr ? "البريد الإلكتروني" : "Email"}</Label>
                          <Input 
                            required
                            type="email"
                            placeholder="email@example.com"
                            className="bg-zinc-900/50 border-white/5 h-14 rounded-2xl focus:border-primary/50" 
                          />
                       </div>
                       <div className="md:col-span-2 space-y-3">
                          <Label className="text-md px-1">{isAr ? "الموضوع" : "Subject"}</Label>
                          <Input 
                            placeholder={isAr ? "كيف يمكننا مساعدتك؟" : "How can we help you?"}
                            className="bg-zinc-900/50 border-white/5 h-14 rounded-2xl focus:border-primary/50" 
                          />
                       </div>
                       <div className="md:col-span-2 space-y-3">
                          <Label className="text-md px-1">{isAr ? "الرسالة" : "Message"}</Label>
                          <Textarea 
                            required
                            placeholder={isAr ? "اكتب رسالتك هنا..." : "Type your message here..."}
                            className="bg-zinc-900/50 border-white/5 min-h-[180px] rounded-2xl focus:border-primary/50 p-4" 
                          />
                       </div>
                       <div className="md:col-span-2 pt-4">
                          <Button 
                            disabled={isSubmitting}
                            type="submit" 
                            className="w-full h-16 text-xl rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 group overflow-hidden"
                          >
                             {isSubmitting ? (
                               <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                  <Clock size={24} />
                               </motion.div>
                             ) : (
                               <div className="flex items-center gap-3">
                                  <span>{isAr ? "إرسال الرسالة" : "Send Message"}</span>
                                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                               </div>
                             )}
                          </Button>
                       </div>
                    </form>
                  </div>
               </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="py-20 border-t border-white/5 text-center text-zinc-600">
         <p>© 2026 IWAN REAL ESTATE. {isAr ? "جميع الحقوق محفوظة" : "All Rights Reserved."}</p>
      </footer>
    </div>
  );
}
