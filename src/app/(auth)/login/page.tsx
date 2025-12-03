import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";
import { PageTransition } from "@/components/layout/PageTransition";

export const metadata = {
  title: "Login | Chronicle AI",
  description: "Sign in to your Chronicle AI account",
};

export default function LoginPage() {
  return (
    <div className="h-full bg-background">
      <PageTransition>
        <Suspense fallback={<div className="w-full max-w-xl lg:max-w-2xl mx-auto px-4 py-8">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </PageTransition>
    </div>
  );
}
