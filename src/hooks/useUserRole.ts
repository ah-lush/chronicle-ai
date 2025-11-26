"use client";

import { useState, useEffect } from "react";

export type UserRole = "user" | "admin";

const ROLE_STORAGE_KEY = "chronicle-user-role";

export function useUserRole() {
  const [role, setRole] = useState<UserRole>("user");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load role from localStorage on mount
  useEffect(() => {
    const storedRole = localStorage.getItem(ROLE_STORAGE_KEY) as UserRole | null;
    if (storedRole === "user" || storedRole === "admin") {
      setRole(storedRole);
    }
    setIsLoaded(true);
  }, []);

  // Save role to localStorage whenever it changes
  const updateRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem(ROLE_STORAGE_KEY, newRole);
  };

  // Clear role from localStorage
  const clearRole = () => {
    localStorage.removeItem(ROLE_STORAGE_KEY);
    setRole("user");
  };

  return { role, updateRole, clearRole, isLoaded };
}
