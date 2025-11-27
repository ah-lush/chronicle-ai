"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be at least 6 digits")
    .max(8, "OTP must be at most 8 digits"),
});

type OtpFormData = z.infer<typeof otpSchema>;

const VerifyOtpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "signup";

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const verifyOtpMutation = trpc.auth.verifyOtp.useMutation({
    onSuccess: () => {
      if (type === "signup") {
        toast.success("Email verified successfully! Please sign in.");
        router.push("/login");
      } else {
        toast.success("Code verified! Please set your new password.");
        router.push(`/reset-password?email=${email}`);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const resendOtpMutation = trpc.auth.resendOtp.useMutation({
    onSuccess: () => {
      toast.success("Verification code sent! Check your email.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: OtpFormData) => {
    verifyOtpMutation.mutate({
      email,
      token: data.otp,
      type: type as "signup" | "email" | "recovery",
    });
  };

  const handleResend = () => {
    if (!email) {
      toast.error("Email address not found. Please go back and try again.");
      return;
    }
    resendOtpMutation.mutate({ email, type: type as "signup" | "recovery" });
  };

  return (
    <div className="w-full max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl p-8 sm:p-10 lg:p-12 space-y-6 sm:space-y-8">
        <div className="space-y-2 text-center">
          <div className="mx-auto w-12 h-12 bg-cyan-400/10 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-cyan-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {type === "signup" ? "Verify Your Email" : "Verify Reset Code"}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-foreground/60">
            We sent a verification code to{" "}
            <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="otp"
              className="text-sm font-medium text-foreground text-center block"
            >
              Enter Verification Code
            </Label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={8}
                onChange={(value) => setValue("otp", value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                  <InputOTPSlot index={6} />
                  <InputOTPSlot index={7} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {errors.otp && (
              <p className="text-xs text-red-500 text-center">
                {errors.otp.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={verifyOtpMutation.isPending}
          >
            {verifyOtpMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                Verify Code <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        <div className="space-y-4">
          <p className="text-center text-xs sm:text-sm text-foreground/60">
            Did not receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resendOtpMutation.isPending}
              className="text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-2 transition disabled:opacity-50"
            >
              {resendOtpMutation.isPending ? "Sending..." : "Resend"}
            </button>
          </p>
          <p className="text-center text-xs sm:text-sm text-foreground/60">
            <Link
              href={type === "signup" ? "/signup" : "/forgot-password"}
              className="text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-2 transition"
            >
              Back to {type === "signup" ? "Sign Up" : "Password Reset"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpForm;
