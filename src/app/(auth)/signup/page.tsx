import SignUpForm from "@/components/auth/SignUpForm";
import { PageTransition } from "@/components/layout/PageTransition";

export const metadata = {
  title: "Sign Up | Chronicle AI",
  description: "Create a Chronicle AI account",
};

export default function SignUpPage() {
  return (
    <div className="h-full bg-background">
      <PageTransition>
        <SignUpForm />
      </PageTransition>
    </div>
  );
}
