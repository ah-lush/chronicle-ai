import { Suspense } from "react";
import VerifyOtpForm from "@/components/auth/VerifyOtpForm";
import { PageTransition } from "@/components/layout/PageTransition";

export const metadata = {
  title: "Verify Code | Chronicle AI",
  description: "Verify your email address or reset password",
};

export default function VerifyOtpPage() {
  return (
    <div className="h-full bg-background">
      <PageTransition>
        <Suspense fallback={<div className="w-full max-w-xl lg:max-w-2xl mx-auto px-4 py-8">Loading...</div>}>
          <VerifyOtpForm />
        </Suspense>
      </PageTransition>
    </div>
  );
}
