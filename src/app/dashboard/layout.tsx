"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useUserRole } from "@/hooks/useUserRole";

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role, isLoaded } = useUserRole();

  // TODO: Get user data from session/auth
  const user = {
    name: "John Doe",
    email: "john@example.com",
    image: undefined,
  };

  // Wait for role to be loaded from localStorage
  if (!isLoaded) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar userRole={role} />
      <SidebarInset>
        <DashboardHeader user={user} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
