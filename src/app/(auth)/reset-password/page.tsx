import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { PageTransition } from "@/components/layout/PageTransition";

export const metadata = {
  title: "Reset Password | Chronicle AI",
  description: "Create a new password",
};

export default function ResetPasswordPage() {
  return (
    <div className="h-full bg-background">
      <PageTransition>
        <Suspense fallback={<div className="w-full max-w-xl lg:max-w-2xl mx-auto px-4 py-8">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </PageTransition>
    </div>
  );
}
