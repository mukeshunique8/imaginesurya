import AppSidebar from "@/components/dashboard-elements/AppSidebar";
import DashboardNavbar from "@/components/dashboard-elements/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { requireAdminSession } from "@/app/utils/authGuard";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import { ADMINROUTES } from "@/lib/data/routes";

export default async function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    // Get user on server side
    const user = await requireAdminSession();

    // If no user, redirect
    if (!user) {
      console.log("Dashboard layout: No user found, redirecting to login");
      redirect(ADMINROUTES.LOGIN);
    }

    console.log("Dashboard layout: User authenticated:", user.email);

    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

    return (
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <DashboardNavbar />
          <div className="flex-1 p-6">{children}</div>
        </main>
      </SidebarProvider>
    );
  } catch (error) {
    console.error("Dashboard layout error:", error);
    redirect(ADMINROUTES.LOGIN);
  }
}
