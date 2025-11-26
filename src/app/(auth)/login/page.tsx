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
        <LoginForm />
      </PageTransition>
    </div>
  );
}
