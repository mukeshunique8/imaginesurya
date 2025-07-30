import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function requireAdminSession() {
  const cookieStore = cookies();

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      async get(name: string) {
        return (await cookieStore).get(name)?.value;
      },
      set() {
        // optional for read-only session usage
      },
      remove() {
        // optional for read-only session usage
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  return user;
}
