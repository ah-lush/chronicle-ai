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
        <ResetPasswordForm />
      </PageTransition>
    </div>
  );
}
