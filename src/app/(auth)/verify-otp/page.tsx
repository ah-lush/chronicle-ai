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
        <VerifyOtpForm />
      </PageTransition>
    </div>
  );
}
