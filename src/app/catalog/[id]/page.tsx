"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { toast } from "sonner";
import { CalendarIcon, CheckCircle2, ChevronRight, MapPin, UploadCloud, Loader2 } from "lucide-react";
import { uploadIdDocument } from "@/app/actions/upload";
import { Navbar } from "@/components/navbar";

export default function UnitPage() {
  const { id } = useParams();
  const [date, setDate] = useState<Date>();
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const supabase = createClient();

  // Mock property data
  const unit = {
    id: id,
    title_ar: "فيلا النخلة جميرا - أفق البحر",
    price: "4,500,000",
    location_ar: "نخلة جميرا، دبي، الإمارات العربية المتحدة",
    description_ar: "تجربة سكنية لا مثيل لها في قلب نخلة جميرا. تتميز هذه الفيلا بتصميم عصري يدمج بين الفخامة والراحة، مع إطلالات بانورامية خلابة على أفق دبي والخليج العربي.",
    images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop"]
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("الملف كبير جداً (الحد الأقصى 5MB)");
        return;
      }
      setFile(selectedFile);
      toast.success("تم اختيار مستند الهوية");
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      toast.error("يرجى اختيار تاريخ الزيارة");
      return;
    }
    if (!file) {
      toast.error("يرجى رفع نسخة من الهوية أو جواز السفر");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 1. Check Auth
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("يرجى تسجيل الدخول أولاً");
        window.location.href = "/auth";
        return;
      }

      // 2. Upload Unstructured Data (File)
      const formData = new FormData();
      formData.append("file", file);
      const uploadResult = await uploadIdDocument(formData);

      if (uploadResult.error) {
        toast.error(uploadResult.error);
        setIsSubmitting(false);
        return;
      }

      // 3. Insert Structured Data (Table C: Viewings)
      const { error: dbError } = await supabase.from("visits").insert({
        user_id: user.id,
        unit_id: id,
        visit_date: format(date, "yyyy-MM-dd"),
        id_document_url: uploadResult.path,
        status: "pending"
      });

      if (dbError) {
        toast.error(`خطأ في حفظ البيانات: ${dbError.message}`);
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      toast.success("تم إرسال طلب الزيارة بنجاح");
    } catch (err) {
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center" dir="rtl">
        <CheckCircle2 className="text-primary w-20 h-20 mb-8 animate-bounce" />
        <h1 className="text-4xl font-bold mb-4">تم استلام طلبك!</h1>
        <p className="text-xl text-zinc-400 mb-10 max-w-md">شكراً لاهتمامك بـ {unit.title_ar}. ستظهر تفاصيل الزيارة في لوحة التحكم الخاصة بك.</p>
        <Link href="/dashboard">
          <Button className="bg-primary text-primary-foreground px-12 py-7 rounded-2xl text-xl font-bold shadow-xl shadow-primary/20">
            الذهاب إلى لوحة التحكم
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20" dir="rtl">
      <Navbar />
      
      {/* Hero Image */}
      <div className="relative h-[65vh] overflow-hidden pt-20">
        <Image src={unit.images[0]} alt={unit.title_ar} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute top-28 left-8">
           <Link href="/">
             <Button variant="outline" className="bg-black/20 backdrop-blur-md border-white/10 text-white rounded-full p-3 h-12 w-12">
                <ChevronRight size={24} />
             </Button>
           </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-10 grid lg:grid-cols-3 gap-12">
        {/* Info Column */}
        <div className="lg:col-span-2 space-y-12">
           <Card className="bg-card/40 backdrop-blur-3xl p-10 rounded-[40px] border border-white/5 shadow-2xl">
              <Badge className="bg-primary/20 text-primary mb-4 px-4 py-1 rounded-full border-primary/20">وحدة سكنية فاخرة</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{unit.title_ar}</h1>
              <div className="flex items-center text-zinc-400 gap-2 text-lg mb-8">
                 <MapPin size={20} className="text-primary" />
                 <span>{unit.location_ar}</span>
              </div>
              <div className="text-4xl font-bold text-primary mb-8">{unit.price} AED</div>
              <p className="text-zinc-400 text-xl leading-relaxed font-light">{unit.description_ar}</p>
           </Card>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-1">
           <Card className="sticky top-24 bg-zinc-950/80 backdrop-blur-2xl border-primary/20 rounded-[40px] shadow-2xl overflow-hidden">
              <CardHeader className="p-8 border-b border-primary/10">
                 <CardTitle className="text-2xl font-bold text-primary">جدولة زيارة</CardTitle>
                 <CardDescription className="text-zinc-400">يرجى ملء البيانات لطلب معاينة العقار</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                 <form onSubmit={handleBooking} className="space-y-8">
                    <div className="space-y-3">
                       <Label className="text-md">تاريخ الزيارة</Label>
                       <Popover>
                        <PopoverTrigger 
                          render={
                            <Button variant="outline" className="w-full justify-start text-right h-14 rounded-2xl bg-zinc-900 border-white/5">
                              <CalendarIcon className="ml-3 h-5 w-5 text-primary" />
                              {date ? format(date, "PPP", { locale: ar }) : <span>اختر موعداً</span>}
                            </Button>
                          } 
                        />
                        <PopoverContent className="w-auto p-0 bg-zinc-950 border-white/10" align="start">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="rounded-2xl border border-white/5" />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-3">
                       <Label className="text-md">نسخة الهوية (ID Scan)</Label>
                       <div 
                         onClick={() => document.getElementById("file-upload")?.click()}
                         className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:border-primary/50 transition-all bg-zinc-900/50 cursor-pointer"
                       >
                          {file ? (
                            <div className="flex flex-col items-center">
                              <CheckCircle2 size={40} className="text-emerald-500 mb-2" />
                              <p className="text-emerald-500 font-bold">{file.name}</p>
                            </div>
                          ) : (
                            <>
                              <UploadCloud size={40} className="text-zinc-600 group-hover:text-primary mb-4" />
                              <p className="text-zinc-400">اسحب الملف أو اضغط هنا</p>
                              <p className="text-zinc-600 text-xs mt-2">PDF, JPG, PNG (حد أقصى 5MB)</p>
                            </>
                          )}
                          <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,image/*" />
                       </div>
                    </div>

                    <Button type="submit" className="w-full h-16 text-xl rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20" disabled={isSubmitting}>
                       {isSubmitting ? <Loader2 className="animate-spin" /> : "إرسال طلب الحجز"}
                    </Button>
                 </form>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
