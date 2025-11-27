"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const [showPassword, setShowPassword] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const { setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { refetch: fetchProfile } = trpc.auth.getProfile.useQuery(undefined, {
    enabled: false,
  });

  const signInMutation = trpc.auth.signIn.useMutation({
    onSuccess: async () => {
      const { data: profile } = await fetchProfile();
      if (profile) {
        setUser({
          ...profile,
          role: (profile.role as "user" | "admin") ?? "user",
          created_at: profile.created_at ?? new Date().toISOString(),
          updated_at: profile.updated_at ?? new Date().toISOString(),
        });
        toast.success("Welcome back!");
        router.push(redirectTo);
      }
    },
    onError: (error) => {
      if (error.data?.code === "FORBIDDEN") {
        toast.info(
          "We've sent a verification code to your email. Please verify to continue."
        );
        router.push(
          `/verify-otp?email=${encodeURIComponent(currentEmail)}&type=signup`
        );
      } else {
        toast.error(error.message || "Login failed. Please try again.");
      }
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setCurrentEmail(data.email);
    signInMutation.mutate(data);
  };

  return (
    <div className="w-full max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl p-8 sm:p-10 lg:p-12 space-y-6 sm:space-y-8">
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-foreground/60">
            Sign in to continue your reading journey
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-5"
        >
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email Address
            </Label>
            <div className="relative group">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-cyan-400 transition-colors" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10 sm:pl-11 h-11 sm:h-12 bg-secondary/30 border-border/50 text-foreground placeholder:text-foreground/40 focus:border-cyan-400/50 focus:ring-cyan-400/20 transition-all"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-cyan-400 transition-colors" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 sm:pl-11 pr-11 h-11 sm:h-12 bg-secondary/30 border-border/50 text-foreground focus:border-cyan-400/50 focus:ring-cyan-400/20 transition-all"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={signInMutation.isPending}
          >
            {signInMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                Sign In <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        <p className="text-center text-xs sm:text-sm text-foreground/60">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-2 transition"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
