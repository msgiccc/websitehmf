import { createClient } from "@supabase/supabase-js";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn("NEXT_PUBLIC_SUPABASE_URL is not defined");
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined");
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
