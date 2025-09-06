import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function requireAdminSession() {
  console.log("\n=== Auth Guard Debug ===");

  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    });

    // First check session, then user
    console.log("Auth Guard - Checking session...");
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.log("❌ Auth guard session error:", sessionError.message);
      return null;
    }

    if (!sessionData.session) {
      console.log("❌ Auth guard: No session found");
      return null;
    }

    console.log("Auth Guard - Session found, verifying user...");
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    console.log("Auth Guard - User result:", user ? user.email : "Not found");

    if (userError) {
      console.log("❌ Auth guard user error:", userError.message);
      return null;
    }

    if (!user) {
      console.log("❌ Auth guard: No user found");
      return null;
    }

    console.log("✅ Auth guard success:", user.email);
    console.log("=== End Auth Guard Debug ===\n");
    return user;
  } catch (error) {
    console.error("❌ Auth guard error:", error);
    console.log("=== End Auth Guard Debug ===\n");
    return null;
  }
}
