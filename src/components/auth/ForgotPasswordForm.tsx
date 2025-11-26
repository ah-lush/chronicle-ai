"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Send } from "lucide-react";
import Link from "next/link";

const ForgotPasswordForm = () => {
  return (
    <div className="w-full max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl p-8 sm:p-10 lg:p-12 space-y-6 sm:space-y-8">
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Reset Password
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-foreground/60">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        <form className="space-y-4 sm:space-y-5">
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
                required
              />
            </div>
            <p className="text-xs text-foreground/50">
              We&apos;ll send a password reset link to this email
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold h-11 sm:h-12 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/30"
          >
            Send Reset Link <Send className="w-4 h-4" />
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50"></div>
          </div>
        </div>

        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-sm sm:text-base text-cyan-400 hover:text-cyan-300 font-medium transition group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Link>

        <div className="bg-secondary/20 rounded-lg p-4 space-y-2">
          <p className="text-xs sm:text-sm text-foreground/60 text-center">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-2 transition"
            >
              Sign in
            </Link>
          </p>
          <p className="text-xs text-foreground/50 text-center">
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
    </div>
  );
};

export default ForgotPasswordForm;
