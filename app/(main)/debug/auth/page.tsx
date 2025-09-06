// app/debug/auth/page.tsx
"use client";

import { supabasePublicClient } from "@/app/utils/supabasePublicClient";
import { useAuth } from "@/components/providers/auth";
import { useState } from "react";

export default function AuthDebug() {
  const { user, loading } = useAuth();
  const [sessionInfo, setSessionInfo] = useState<any>(null);

  const checkSession = async () => {
    const { data, error } = await supabasePublicClient.auth.getSession();
    setSessionInfo({ data, error });
  };

  return (
    <div className="p-4">
      <h1>Auth Debug</h1>
      <p>Loading: {loading.toString()}</p>
      <p>User: {user ? user.email : "None"}</p>
      <button onClick={checkSession}>Check Session</button>
      {sessionInfo && <pre>{JSON.stringify(sessionInfo, null, 2)}</pre>}
    </div>
  );
}
