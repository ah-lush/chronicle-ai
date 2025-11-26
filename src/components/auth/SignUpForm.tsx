"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl p-8 sm:p-10 lg:p-12 space-y-6 sm:space-y-8">
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-foreground/60">
            Join Chronicle AI to start your reading journey
          </p>
        </div>

        <form className="space-y-4 sm:space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-foreground"
            >
              Full Name
            </Label>
            <div className="relative group">
              <User className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-cyan-400 transition-colors" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="pl-10 sm:pl-11 h-11 sm:h-12 bg-secondary/30 border-border/50 text-foreground placeholder:text-foreground/40 focus:border-cyan-400/50 focus:ring-cyan-400/20 transition-all"
                required
              />
            </div>
          </div>

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
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </Label>
            <div className="relative group">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-cyan-400 transition-colors" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 sm:pl-11 pr-11 h-11 sm:h-12 bg-secondary/30 border-border/50 text-foreground focus:border-cyan-400/50 focus:ring-cyan-400/20 transition-all"
                required
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
            <p className="text-xs text-foreground/50">
              Must be at least 8 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-foreground"
            >
              Confirm Password
            </Label>
            <div className="relative group">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-cyan-400 transition-colors" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 sm:pl-11 pr-11 h-11 sm:h-12 bg-secondary/30 border-border/50 text-foreground focus:border-cyan-400/50 focus:ring-cyan-400/20 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Create Account <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <p className="text-center text-xs sm:text-sm text-foreground/60">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-2 transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
