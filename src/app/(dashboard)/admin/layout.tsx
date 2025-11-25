import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

export const metadata = {
  title: 'Admin Dashboard | Chronicle AI',
  description: 'Manage Chronicle AI platform',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout isAdmin>{children}</DashboardLayout>;
}
