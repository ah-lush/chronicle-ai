"use client";

import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { UserDashboard } from "@/components/dashboard/UserDashboard";
import { useUserRole } from "@/hooks/useUserRole";

export default function DashboardPage() {
  const { role } = useUserRole();

  return role === "user" ? <UserDashboard /> : <AdminDashboard />;
}
