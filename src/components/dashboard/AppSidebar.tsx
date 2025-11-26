"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Plus,
  Zap,
  Bookmark,
  BarChart3,
  Settings,
  Users,
  Monitor,
  FileStack,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/useUserRole";

interface AppSidebarProps {
  userRole?: "user" | "admin";
}

const userNavItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/articles", label: "My Articles", icon: FileText },
  { href: "/dashboard/create", label: "Create Article", icon: Plus },
  { href: "/dashboard/ai-generate", label: "AI Generator", icon: Zap },
  { href: "/dashboard/bookmarks", label: "Bookmarks", icon: Bookmark },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
];

const adminNavItems = [
  { href: "/dashboard/content", label: "Content", icon: FileStack },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/ai-config", label: "AI Config", icon: Zap },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/monitoring", label: "Monitoring", icon: Monitor },
];

export function AppSidebar({ userRole = "user" }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { clearRole } = useUserRole();

  const handleLogout = () => {
    clearRole();
    router.push("/");
  };

  return (
    <Sidebar>
      <SidebarHeader className="h-14 border-b">
        <Link href="/" className="flex items-center gap-2 px-4">
          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg shrink-0"></div>
          <span className="font-bold text-lg">Chronicle</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {userNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className="h-10 px-3 font-medium transition-colors"
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3"
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {userRole === "admin" && (
          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Administration
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {adminNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.label}
                        className="h-10 px-3 font-medium transition-colors"
                      >
                        <Link
                          href={item.href}
                          className="flex items-center gap-3"
                        >
                          <Icon className="h-5 w-5 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/settings"}
                  tooltip="Settings"
                  className="h-10 px-3 font-medium transition-colors"
                >
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3"
                  >
                    <Settings className="h-5 w-5 shrink-0" />
                    <span className="truncate">Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
