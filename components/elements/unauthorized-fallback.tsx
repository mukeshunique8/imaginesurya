"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ADMINROUTES } from "@/lib/data/routes";
import FullPageLoader from "./full-page-loader";

export default function UnauthorizedFallback() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);
    router.push(ADMINROUTES.LOGIN);
  };

  if (loading) return <FullPageLoader />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl font-semibold text-red-500 mb-4">Unauthorized Access</h1>
      <p className="text-muted-foreground mb-6">You must be logged in as an admin to access this page.</p>
      <Button onClick={handleLogin} className="px-6 py-2">
        Login
      </Button>
    </div>
  );
}
