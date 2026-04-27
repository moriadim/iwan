"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, FileText, LayoutDashboard, LogOut, MapPin, MoreHorizontal, Settings, Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Logo } from "@/components/logo";
import { DashboardEmptyState } from "@/components/dashboard-empty-state";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { getSignedDocumentUrl } from "@/app/actions/upload";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [visits, setVisits] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [newName, setNewName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function getDashboardData() {
      setIsLoading(true);
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        router.push("/auth");
        return;
      }
      setUser(user);

      const { data, error } = await supabase
        .from("visits")
        .select(`*, units (*)`)
        .order("created_at", { ascending: false });

      if (error) {
        toast.error(`خطأ في جلب البيانات: ${error.message}`);
      } else {
        setVisits(data || []);
      }
      setIsLoading(false);
    }
    getDashboardData();
  }, [supabase, router]);

  const stats = {
    total: visits.length,
    pending: visits.filter(v => v.status === "pending").length,
    latestUploads: visits.filter(v => !!v.id_document_url).length
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    toast.success("تم تسجيل الخروج بنجاح");
  };

  const menuItems = [
    { id: "overview", label_ar: "لوحة التحكم", label_en: "Overview", icon: <LayoutDashboard size={20} /> },
    { id: "visits", label_ar: "جدول الزيارات", label_en: "Visits Schedule", icon: <Calendar size={20} /> },
    { id: "documents", label_ar: "وثائقي", label_en: "My Documents", icon: <FileText size={20} /> },
    { id: "settings", label_ar: "الإعدادات", label_en: "Settings", icon: <Settings size={20} /> },
  ];

  const handleUpdateProfile = async () => {
    if (!newName) return;
    setIsUpdating(true);
    // 1. Update Auth Metadata and get fresh data
    const { data: { user: updatedUser }, error: authError } = await supabase.auth.updateUser({
      data: { full_name: newName }
    });

    // 2. Update Profiles Table
    const { error: dbError } = await supabase
      .from("profiles")
      .update({ full_name: newName })
      .eq("id", user.id);

    if (authError || dbError) {
      toast.error("فشل في تحديث الملف الشخصي");
    } else {
      if (updatedUser) setUser(updatedUser);
      toast.success("تم تحديث الملف الشخصي بنجاح");
    }
    setIsUpdating(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setIsUpdating(true);
    const fileName = `${user.id}/avatar_${Date.now()}`;
    const { error: uploadError } = await supabase.storage.from("avatars").upload(fileName, file);

    if (uploadError) {
      toast.error("فشل في رفع الصورة");
      setIsUpdating(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(fileName);
    
    // Update Auth and get fresh data
    const { data: { user: updatedUser }, error: authError } = await supabase.auth.updateUser({ 
      data: { avatar_url: publicUrl } 
    });

    await supabase.from("profiles").update({ avatar_url: publicUrl }).eq("id", user.id);

    if (!authError && updatedUser) {
      setUser(updatedUser);
      toast.success("تم تحديث صورة الملف الشخصي");
    }
    setIsUpdating(false);
  };

  const handleViewDocument = async (path: string) => {
    const result = await getSignedDocumentUrl(path);
    if (result.url) {
      window.open(result.url, "_blank");
    } else {
      toast.error("فشل في عرض المستند");
    }
  };

  const handleActionClick = () => {
    toast.info("هذه الميزة ستكون متاحة قريباً في النسخة القادمة");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col md:flex-row font-outfit" dir="rtl">
      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-zinc-950/50 backdrop-blur-3xl border-l border-white/5 p-8 flex flex-col shadow-2xl sticky top-0 h-screen">
        <div className="mb-12">
           <Link href="/">
              <Logo className="text-primary" />
           </Link>
        </div>
        <nav className="flex-1 space-y-3">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-4 transition-all rounded-2xl group text-right ${
                activeTab === item.id ? "bg-primary/10 text-primary border border-primary/20" : "text-zinc-500 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="font-bold">{item.label_ar}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-8 border-t border-white/5">
           <Button variant="ghost" onClick={handleSignOut} className="w-full justify-start gap-4 text-zinc-500 hover:text-destructive hover:bg-destructive/10 rounded-2xl py-6">
              <LogOut size={20} />
              <span className="font-bold">تسجيل الخروج</span>
           </Button>
        </div>
      </aside>

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">أهلاً بك، {user?.user_metadata?.full_name || "المستخدم"}</h1>
            <p className="text-zinc-500 text-lg font-light tracking-wide">متابعة حالة زياراتك وعقاراتك بأسلوب إيوان</p>
          </div>
          <div className="flex items-center gap-4 bg-zinc-900/40 p-2 rounded-[24px] border border-white/5 backdrop-blur-3xl">
             <Avatar className="h-14 w-14 border-2 border-primary/20 p-0.5">
                <AvatarImage src={user?.user_metadata?.avatar_url || "https://github.com/shadcn.png"} />
                <AvatarFallback className="bg-primary/10 text-primary">I</AvatarFallback>
             </Avatar>
             <div className="ml-4 pr-6 border-r border-white/10 hidden sm:block">
                <p className="text-sm font-bold truncate max-w-[150px]">{user?.email}</p>
                <p className="text-xs text-primary font-mono grayscale opacity-70">BRONZE MEMBER</p>
             </div>
          </div>
        </header>

        {activeTab === "overview" && (
           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: "إجمالي الزيارات", value: stats.total, icon: <Calendar className="text-primary" />, desc: "جميع طلباتك المجدولة" },
                  { label: "بانتظار المراجعة", value: stats.pending, icon: <Clock className="text-amber-500" />, desc: "سيتم الرد قريباً" },
                  { label: "وثائق الهوية", value: stats.latestUploads, icon: <CheckCircle2 className="text-emerald-500" />, desc: "ملفات تم التحقق منها" },
                ].map((stat, i) => (
                    <Card key={i} className="bg-card/40 border-white/5 backdrop-blur-3xl rounded-[32px] p-2 group hover:border-primary/20 transition-all duration-500">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <CardTitle className="text-sm font-medium text-zinc-400">{stat.label}</CardTitle>
                        <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary/20 group-hover:scale-110 transition-all">{stat.icon}</div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-4xl font-bold mb-1">{isLoading ? <Skeleton className="h-10 w-12 bg-white/10" /> : stat.value}</div>
                        <p className="text-xs text-zinc-500 font-light">{stat.desc}</p>
                      </CardContent>
                    </Card>
                ))}
              </div>

              <div className="space-y-8">
                 <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold">الزيارات الأخيرة</h2>
                    <Button variant="link" onClick={() => setActiveTab("visits")} className="text-primary">عرض الكل</Button>
                 </div>
                 {isLoading ? (
                    <div className="space-y-4">
                       {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full rounded-3xl bg-white/5" />)}
                    </div>
                 ) : visits.length === 0 ? (
                    <DashboardEmptyState />
                 ) : (
                    <div className="bg-zinc-950/20 border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-3xl shadow-2xl">
                      <Table dir="rtl">
                        <TableHeader className="bg-white/5">
                          <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-zinc-400 py-8 text-right pr-8">العقار</TableHead>
                            <TableHead className="text-zinc-400 py-8 text-right">الموقع</TableHead>
                            <TableHead className="text-zinc-400 py-8 text-right">التاريخ</TableHead>
                            <TableHead className="text-zinc-400 py-8 text-right">الحالة</TableHead>
                            <TableHead className="py-8"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {visits.slice(0, 5).map((visit) => (
                            <TableRow key={visit.id} className="border-white/5 hover:bg-white/5 transition-all group">
                              <TableCell className="font-bold py-8 pr-8 text-lg">{visit.units?.title_ar}</TableCell>
                              <TableCell className="text-zinc-400">
                                 <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-primary" />
                                    {visit.units?.location_ar}
                                 </div>
                              </TableCell>
                              <TableCell className="font-mono text-zinc-300">{new Date(visit.visit_date).toLocaleDateString("ar-EG")}</TableCell>
                              <TableCell>
                                <Badge className="rounded-full px-6 py-1.5 text-sm bg-primary/10 text-primary border-primary/20">
                                  {visit.status === 'pending' ? "قيد المراجعة" : visit.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="pl-8">
                                 <DropdownMenu>
                                    <DropdownMenuTrigger className="h-12 w-12 flex items-center justify-center hover:bg-primary/20 hover:text-primary rounded-full transition-all outline-none">
                                        <MoreHorizontal className="h-6 w-6" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-zinc-950 border-white/10 text-zinc-300 min-w-40 rounded-2xl shadow-2xl p-2 backdrop-blur-2xl transition-all">
                                       <DropdownMenuItem onClick={() => setActiveTab("visits")} className="justify-end cursor-pointer rounded-xl hover:bg-white/5 py-3">التفاصيل</DropdownMenuItem>
                                       <DropdownMenuSeparator className="bg-white/5" />
                                       <DropdownMenuItem onClick={handleActionClick} className="justify-end cursor-pointer rounded-xl text-destructive hover:bg-destructive/10 py-3">إلغاء</DropdownMenuItem>
                                    </DropdownMenuContent>
                                 </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                 )}
              </div>
           </motion.div>
        )}

        {activeTab === "visits" && (
           <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <h2 className="text-3xl font-bold">جميع الزيارات</h2>
              <div className="grid gap-6">
                 {visits.map(v => (
                    <Card key={v.id} className="bg-card/30 border-white/5 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6">
                       <div className="flex gap-6 items-center">
                          <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary"><Calendar size={28} /></div>
                          <div><h3 className="text-xl font-bold">{v.units?.title_ar}</h3><p className="text-zinc-500">{v.units?.location_ar}</p></div>
                       </div>
                       <div className="flex items-center gap-12">
                          <div className="text-right"><p className="text-sm text-zinc-500">التاريخ</p><p className="font-mono">{v.visit_date}</p></div>
                          <Badge className="bg-zinc-800 rounded-full px-4">{v.status}</Badge>
                          <Button variant="outline" onClick={handleActionClick} className="rounded-xl border-white/5">تعديل</Button>
                       </div>
                    </Card>
                 ))}
              </div>
           </motion.div>
        )}

        {activeTab === "documents" && (
           <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <h2 className="text-3xl font-bold">وثائق الهوية</h2>
              <div className="grid md:grid-cols-2 gap-8">
                 {visits.filter(v => v.id_document_url).map(v => (
                    <Card key={v.id} className="bg-card/40 border-white/5 p-8 rounded-3xl group hover:border-primary/20 transition-all">
                       <FileText size={48} className="text-primary mb-6" />
                       <h3 className="text-xl font-bold mb-2">نسخة - {v.units?.title_ar}</h3>
                       <Button onClick={() => handleViewDocument(v.id_document_url)} className="w-full bg-white/5 hover:bg-primary hover:text-black rounded-xl h-12">عرض الملف</Button>
                    </Card>
                 ))}
              </div>
           </motion.div>
        )}

        {activeTab === "settings" && (
           <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl space-y-12">
              <h2 className="text-3xl font-bold">الإعدادات</h2>
              <div className="space-y-8">
                 <div className="flex items-center gap-8 bg-card/40 p-8 rounded-[32px] border border-white/5">
                    <Avatar className="h-24 w-24 border-4 border-primary/20"><AvatarImage src={user?.user_metadata?.avatar_url} /><AvatarFallback>I</AvatarFallback></Avatar>
                    <div className="space-y-2">
                       <input type="file" id="avatar-up" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                       <Button variant="outline" onClick={() => document.getElementById("avatar-up")?.click()} className="rounded-xl h-12" disabled={isUpdating}>{isUpdating ? <Loader2 className="animate-spin" /> : "تغيير الصورة"}</Button>
                    </div>
                 </div>
                 <div className="grid gap-6">
                    <div className="space-y-2"><label className="text-sm text-zinc-400">الاسم</label><Input value={newName || user?.user_metadata?.full_name || ""} onChange={(e) => setNewName(e.target.value)} className="bg-zinc-900/50 h-14 rounded-2xl" /></div>
                    <Button onClick={handleUpdateProfile} disabled={isUpdating} className="bg-primary text-black font-bold h-16 rounded-2xl text-xl shadow-xl shadow-primary/20">{isUpdating ? <Loader2 className="animate-spin" /> : "حفظ التغييرات"}</Button>
                 </div>
              </div>
           </motion.div>
        )}
      </main>
    </div>
  );
}
