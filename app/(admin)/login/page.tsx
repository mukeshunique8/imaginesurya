"use client";

import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showError, showSuccess } from "@/lib/helpers/swalHelper";
import { supabasePublicClient } from "@/app/utils/supabasePublicClient";
import { ADMINROUTES } from "@/lib/data/routes";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabasePublicClient.auth.getSession();
      if (session) {
        console.log("User already logged in, redirecting...");
        router.push(ADMINROUTES.DASHBOARD);
      }
    };
    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Attempting login...");

      const { data, error } = await supabasePublicClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        showError(error.message, "Login Failed");
        return;
      }

      if (!data.session || !data.user) {
        console.error("No session or user data received");
        showError("Login failed - no session created", "Login Failed");
        return;
      }

      console.log("Login successful!");
      console.log("User:", data.user.email);
      console.log("Session exists:", !!data.session);

      showSuccess("Logged in successfully!");

      // Use router.push instead of window.location.href for better Next.js integration
      // Add a small delay to ensure session is properly set
      setTimeout(() => {
        router.push(ADMINROUTES.DASHBOARD);
      }, 1000);
    } catch (error: any) {
      console.error("Login catch error:", error);
      showError(error.message || "An unexpected error occurred", "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card shadow-lg p-6 rounded-2xl border border-border">
        <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Admin Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />

          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-4" required disabled={loading} />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Debug info */}
        <div className="text-xs text-gray-500 text-center">
          <p>Debug: Check browser console for login details</p>
        </div>
      </div>
    </div>
  );
}
