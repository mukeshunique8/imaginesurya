// components/providers/auth-provider.tsx
"use client";

import { ADMINROUTES } from "@/lib/data/routes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { User } from "@supabase/supabase-js";

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser: User | null;
}

export default function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState(!initialUser);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const pathname = usePathname();
  const redirectingRef = useRef(false);

  useEffect(() => {
    // If we have an initial user from server, we're authenticated
    if (initialUser) {
      setIsLoading(false);
      setUser(initialUser);
      return;
    }

    // Don't check auth on login page
    if (pathname === ADMINROUTES.LOGIN) {
      setIsLoading(false);
      return;
    }

    // Check auth state
    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);

      if (event === "SIGNED_OUT") {
        setUser(null);
        if (pathname !== ADMINROUTES.LOGIN && !redirectingRef.current) {
          redirectingRef.current = true;
          router.push(ADMINROUTES.LOGIN);
        }
      } else if (event === "SIGNED_IN" && session) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
        redirectingRef.current = false;
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, router, pathname, initialUser]);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.log("Client-side: No authenticated user");
        setUser(null);
        if (pathname !== ADMINROUTES.LOGIN && !redirectingRef.current) {
          redirectingRef.current = true;
          router.push(ADMINROUTES.LOGIN);
        }
        return;
      }

      console.log("Client-side: User authenticated:", user.email);
      setUser(user);
      redirectingRef.current = false;
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
      if (pathname !== ADMINROUTES.LOGIN && !redirectingRef.current) {
        redirectingRef.current = true;
        router.push(ADMINROUTES.LOGIN);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show loading on dashboard pages without user (before redirect)
  if (!user && pathname !== ADMINROUTES.LOGIN) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
