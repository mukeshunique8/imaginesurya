"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import Swal from "sweetalert2";
import { showError, showSuccess } from "@/lib/helpers/swalHelper";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    }
  }, []);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      showError(error.message, "Login Failed");
    } else {
      showSuccess("Logged in successfully!");
      setTimeout(() => router.push("/admin/dashboard"), 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div ref={formRef} className="w-full max-w-md bg-card shadow-lg p-6 rounded-2xl border border-border">
        <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Admin Login</h2>
        <Input autoFocus placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-4" />
        <Button className="w-full mt-6" onClick={handleLogin}>
          Sign In
        </Button>
      </div>
    </div>
  );
}
