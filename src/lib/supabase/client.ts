import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || supabaseUrl.includes("your-project-url")) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL in .env.local");
    supabaseUrl = "https://placeholder.supabase.co"; // Fallback to avoid crash
  }

  // Ensure URL has protocol
  if (supabaseUrl && !supabaseUrl.startsWith('http')) {
    supabaseUrl = `https://${supabaseUrl}`;
  }
  
  return createBrowserClient(supabaseUrl, supabaseAnonKey || "placeholder-key");
}
