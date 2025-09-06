// 4. app/utils/supabasePublicClient.ts - Ensure proper client setup
import { createBrowserClient } from "@supabase/ssr";

export const supabasePublicClient = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
