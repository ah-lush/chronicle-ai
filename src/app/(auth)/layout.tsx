import { Header } from "@/components/layout/Header";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
