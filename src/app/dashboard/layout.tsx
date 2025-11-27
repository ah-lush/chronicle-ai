"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useAuthStore } from "@/store/auth.store";

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();

  const userT = {
    name: user?.full_name ?? "John Doe",
    email: user?.email ?? "",
    image: user?.avatar_url ?? "",
  };

  return (
    <SidebarProvider>
      <AppSidebar userRole={user?.role} />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <DashboardHeader user={userT} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
