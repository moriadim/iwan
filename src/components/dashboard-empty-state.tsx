import { Button } from "@/components/ui/button";
import { Home, PlusCircle } from "lucide-react";
import Link from "next/link";

export function DashboardEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center bg-card/20 rounded-[40px] border border-dashed border-white/10 backdrop-blur-xl">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <Home className="text-primary w-10 h-10" />
      </div>
      <h3 className="text-2xl font-bold mb-2">لا توجد زيارات مجدولة بعد</h3>
      <p className="text-zinc-500 mb-8 max-w-sm">
        ابدأ باستكشاف عقاراتنا الفاخرة وجدول أول زيارة لك لمعاينة منزل أحلامك.
      </p>
      <Link href="/">
        <Button className="bg-primary text-primary-foreground rounded-2xl px-8 h-12 flex items-center gap-2 font-bold transition-all hover:scale-105">
          <PlusCircle size={20} />
          استكشف العقارات
        </Button>
      </Link>
    </div>
  );
}
