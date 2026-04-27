"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, FileText, LayoutDashboard, LogOut, MapPin, MoreHorizontal, Settings, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Logo } from "@/components/logo";
import { DashboardEmptyState } from "@/components/dashboard-empty-state";
import { toast } from "sonner";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [visits, setVisits] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
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

      // Fetch user's visits (RLS ensures only current user's data is returned)
      const { data, error } = await supabase
        .from("visits")
        .select(`
          *,
          units (
            title_ar,
            location_ar
          )
        `)
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

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col md:flex-row" dir="rtl">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-zinc-950 border-l border-white/5 p-8 flex flex-col shadow-2xl">
        <div className="mb-12">
           <Link href="/">
              <Logo className="text-primary" />
           </Link>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-4 p-4 bg-primary/10 text-primary rounded-2xl transition-all">
            <LayoutDashboard size={20} />
            <span className="font-bold">لوحة التحكم</span>
          </Link>
          <div className="space-y-1">
             {["جدول الزيارات", "وثائقي", "الإعدادات"].map((item, i) => (
                <button key={item} className="w-full flex items-center gap-4 p-4 text-zinc-400 hover:bg-white/5 hover:text-white transition-all rounded-2xl group text-right">
                  {i === 0 ? <Calendar size={20} /> : i === 1 ? <FileText size={20} /> : <Settings size={20} />}
                  <span className="font-medium">{item}</span>
                </button>
             ))}
          </div>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
           <Button variant="ghost" onClick={handleSignOut} className="w-full justify-start gap-4 text-zinc-500 hover:text-destructive hover:bg-destructive/10 rounded-xl py-6">
              <LogOut size={20} />
              <span>تسجيل الخروج</span>
           </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">أهلاً بك، {user?.user_metadata?.full_name || "المستخدم"}</h1>
            <p className="text-zinc-500 text-lg font-light tracking-wide">متابعة حالة زياراتك وعقاراتك المفضلة</p>
          </div>
          <div className="flex items-center gap-4 bg-zinc-900/50 p-2 rounded-2xl border border-white/5 backdrop-blur-xl">
             <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage src={user?.user_metadata?.avatar_url || "https://github.com/shadcn.png"} />
                <AvatarFallback>IWAN</AvatarFallback>
             </Avatar>
             <div className="ml-4 pr-4 border-r border-white/10 hidden sm:block">
                <p className="text-sm font-bold truncate max-w-[150px]">{user?.email}</p>
                <p className="text-xs text-zinc-500">مستأجر بلاتيني</p>
             </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
           {[
             { label: "إجمالي الزيارات", value: stats.total, icon: <Calendar className="text-primary" />, desc: "جميع الطلبات" },
             { label: "بانتظار المراجعة", value: stats.pending, icon: <Clock className="text-amber-500" />, desc: "قيد المراجعة" },
             { label: "وثائق الهوية", value: stats.latestUploads, icon: <CheckCircle2 className="text-emerald-500" />, desc: "ملفات مرفوعة" },
           ].map((stat, i) => (
              <Card key={i} className="bg-card/40 border-white/5 backdrop-blur-3xl rounded-3xl p-2 group hover:border-primary/20 transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-400">{stat.label}</CardTitle>
                  <div className="p-2 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-colors">{stat.icon}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{isLoading ? <Skeleton className="h-9 w-12 bg-white/10" /> : stat.value}</div>
                  <p className="text-xs text-zinc-500">{stat.desc}</p>
                </CardContent>
              </Card>
           ))}
        </div>

        {/* Table Section */}
        <div className="space-y-8">
           <h2 className="text-2xl font-bold">الزيارات الأخيرة</h2>
           
           {isLoading ? (
              <div className="space-y-4">
                 {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full rounded-2xl bg-white/5" />)}
              </div>
           ) : visits.length === 0 ? (
              <DashboardEmptyState />
           ) : (
              <div className="bg-card/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-3xl shadow-2xl">
                <Table dir="rtl">
                  <TableHeader className="bg-white/5">
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="text-zinc-400 py-6 text-right">الوحدة</TableHead>
                      <TableHead className="text-zinc-400 py-6 text-right">الموقع</TableHead>
                      <TableHead className="text-zinc-400 py-6 text-right">التاريخ</TableHead>
                      <TableHead className="text-zinc-400 py-6 text-right">الحالة</TableHead>
                      <TableHead className="py-6"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visits.map((visit) => (
                      <TableRow key={visit.id} className="border-white/5 hover:bg-white/5 transition-all group">
                        <TableCell className="font-bold py-6">{visit.units?.title_ar || "عقار غير محدد"}</TableCell>
                        <TableCell className="text-zinc-400">
                           <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-primary" />
                              {visit.units?.location_ar || "دبي"}
                           </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{visit.visit_date}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={`
                            ${visit.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : ''}
                            ${visit.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : ''}
                            rounded-full px-4 py-1
                          `}>
                            {visit.status === 'pending' ? "بانتظار التأكيد" : visit.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                           <DropdownMenu>
                              <DropdownMenuTrigger>
                                 <Button variant="ghost" className="h-10 w-10 p-0 hover:bg-white/10 rounded-full">
                                    <MoreHorizontal className="h-5 w-5" />
                                 </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10 text-zinc-300 backdrop-blur-2xl p-2 rounded-xl">
                                 <DropdownMenuItem className="text-right justify-end hover:bg-primary/20 hover:text-primary rounded-lg cursor-pointer">التفاصيل</DropdownMenuItem>
                                 <DropdownMenuSeparator className="bg-white/5" />
                                 <DropdownMenuItem className="text-right justify-end text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer">إلغاء الطلب</DropdownMenuItem>
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
      </main>
    </div>
  );
}
