"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Lock, Mail, User, Loader2 } from "lucide-react";
import { Logo } from "@/components/logo";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
    } else {
      toast.success("تم تسجيل الدخول بنجاح");
      router.push("/dashboard");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
    } else {
      toast.success("تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
         <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center px-6">
        <div className="hidden lg:block">
          <div className="mb-12">
             <Link href="/">
                <Logo className="text-primary text-4xl" />
             </Link>
          </div>
          <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
             <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                alt="Luxury Interior"
                fill
                className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12 text-white">
                <h2 className="text-4xl font-bold mb-4 font-sans tracking-tight">نرحب بك في عالم إيوان</h2>
                <p className="text-lg text-gray-300 font-light leading-relaxed">
                  سجل دخولك للوصول إلى العروض الحصرية وإدارة زياراتك العقارية بكل سهولة.
                </p>
             </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-md bg-card/60 backdrop-blur-xl border-white/10 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="text-center pb-8 pt-10">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
                 <Lock className="text-primary w-8 h-8" />
              </div>
              <CardTitle className="text-3xl font-bold tracking-tight">بوابة الملاك والمستأجرين</CardTitle>
              <CardDescription className="text-lg mt-2">اختر طريقتك للمتابعة</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full" dir="rtl">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-zinc-900/50 p-1 rounded-xl h-12">
                  <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-md font-medium">تسجيل الدخول</TabsTrigger>
                  <TabsTrigger value="signup" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-md font-medium">حساب جديد</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleSignIn} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-md">البريد الإلكتروني</Label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-3 w-5 h-5 text-zinc-500" />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="example@iwan.com" 
                          className="pr-10 h-12 bg-zinc-900/40 border-white/5 rounded-xl focus:ring-primary" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center mb-1">
                        <Label htmlFor="password tracking-tight" className="text-md">كلمة المرور</Label>
                        <Link href="#" className="text-sm text-primary hover:underline">نسيت كلمة المرور؟</Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute right-3 top-3 w-5 h-5 text-zinc-500" />
                        <Input 
                          id="password" 
                          type="password" 
                          className="pr-10 h-12 bg-zinc-900/40 border-white/5 rounded-xl focus:ring-primary" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required 
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 text-lg rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all font-bold" disabled={isLoading}>
                      {isLoading ? <Loader2 className="animate-spin" /> : "دخول"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-md">الاسم الكامل</Label>
                      <div className="relative">
                        <User className="absolute right-3 top-3 w-5 h-5 text-zinc-500" />
                        <Input 
                          id="name" 
                          type="text" 
                          placeholder="محمد أحمد" 
                          className="pr-10 h-12 bg-zinc-900/40 border-white/5 rounded-xl focus:ring-primary" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="signup-email" className="text-md tracking-tight">البريد الإلكتروني</Label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-3 w-5 h-5 text-zinc-500" />
                        <Input 
                          id="signup-email" 
                          type="email" 
                          placeholder="name@domain.com" 
                          className="pr-10 h-12 bg-zinc-900/40 border-white/5 rounded-xl focus:ring-primary" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-md tracking-tight">كلمة المرور</Label>
                      <div className="relative">
                        <Lock className="absolute right-3 top-3 w-5 h-5 text-zinc-500" />
                        <Input 
                          id="signup-password" 
                          type="password" 
                          className="pr-10 h-12 bg-zinc-900/40 border-white/5 rounded-xl focus:ring-primary" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required 
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 text-lg rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all font-bold" disabled={isLoading}>
                       {isLoading ? <Loader2 className="animate-spin" /> : "إنشاء حساب"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pb-10">
              <div className="relative w-full text-center">
                 <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                 <span className="relative bg-card px-2 text-sm text-muted-foreground uppercase">أو عبر</span>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                 <Button variant="outline" className="rounded-xl h-11 border-white/5 bg-zinc-900/40 hover:bg-white/5">Google</Button>
                 <Button variant="outline" className="rounded-xl h-11 border-white/5 bg-zinc-900/40 hover:bg-white/5">Apple ID</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
