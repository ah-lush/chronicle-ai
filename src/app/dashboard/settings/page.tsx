"use client";

import { useState } from "react";
import { UserSettings } from "@/components/dashboard/UserSettings";
import { AdminSettings } from "@/components/dashboard/AdminSettings";

export default function SettingsPage() {
  const [userRole] = useState<"user" | "admin">("user");

  if (userRole === "admin") {
    return <AdminSettings />;
  }

  return <UserSettings />;
}
