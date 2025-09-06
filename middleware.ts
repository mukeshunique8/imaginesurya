// 1. middleware.ts - Improved version with better session handling
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run middleware on dashboard routes
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  console.log(`\n=== Middleware Debug for ${pathname} ===`);

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  try {
    // First try to get session, then user
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    console.log("Middleware - Session check:", sessionData.session ? "Found" : "Not found");

    if (sessionError) {
      console.log("Middleware - Session Error:", sessionError.message);
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!sessionData.session) {
      console.log("❌ Middleware: No session - redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // If we have a session, verify the user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    console.log("Middleware - User result:", user ? user.email : "Not found");

    if (userError || !user) {
      console.log("❌ Middleware: User verification failed - redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    console.log("✅ Middleware: Authentication successful");
    console.log(`=== End Middleware Debug ===\n`);
    return response;
  } catch (error) {
    console.error("❌ Middleware catch error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
