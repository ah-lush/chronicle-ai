import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

export const metadata = {
  title: 'Dashboard | Chronicle AI',
  description: 'Manage your Chronicle AI account',
};

export default function DashLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
