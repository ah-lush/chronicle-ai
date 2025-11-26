import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { PageTransition } from "@/components/layout/PageTransition";

export const metadata = {
  title: "Forgot Password | Chronicle AI",
  description: "Reset your Chronicle AI password",
};

export default function ForgotPasswordPage() {
  return (
    <div className="h-full bg-background">
      <PageTransition>
        <ForgotPasswordForm />
      </PageTransition>
    </div>
  );
}
