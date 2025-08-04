import AppSidebar from "@/components/dashboard-elements/AppSidebar";
import Navbar from "@/components/dashboard-elements/Navbar";
import UnauthorizedFallback from "@/components/elements/unauthorized-fallback";
import { SidebarProvider } from "@/components/ui/sidebar";
import { requireAdminSession } from "@/app/utils/authGuard";
import { cookies } from "next/headers";
import React from "react";

export default async function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireAdminSession();

  if (!user) {
    return <UnauthorizedFallback />; // ✅ use the proper client component
  }

  const cookieStore = await cookies();

  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full">
        <Navbar />
        <div className="px-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
