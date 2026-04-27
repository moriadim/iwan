import { Navbar } from "@/components/navbar";

export default function GenericPage({ title, content }: { title: string, content: string }) {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <h1 className="text-5xl font-bold mb-8 text-primary">{title}</h1>
        <div className="prose prose-invert max-w-none text-zinc-400 text-lg leading-relaxed">
          <p>{content}</p>
        </div>
      </main>
    </div>
  );
}
