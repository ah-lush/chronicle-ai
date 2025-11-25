import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Mail, Lock, User, Github, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Sign Up | Chronicle AI',
  description: 'Create a Chronicle AI account',
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageTransition>
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="bg-card rounded-xl border border-border p-8 space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
              <p className="text-foreground/60">
                Join Chronicle AI to start reading and sharing
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-3 top-3 text-foreground/40" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10 bg-secondary/50 border-border text-foreground placeholder:text-foreground/40"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-3 text-foreground/40" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 bg-secondary/50 border-border text-foreground placeholder:text-foreground/40"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-3 text-foreground/40" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-secondary/50 border-border text-foreground"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-3 text-foreground/40" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-secondary/50 border-border text-foreground"
                    required
                  />
                </div>
              </div>

              {/* Terms */}
              <p className="text-xs text-foreground/60 leading-relaxed">
                By signing up, you agree to our{' '}
                <Link href="/terms" className="text-cyan-400 hover:text-cyan-300 transition">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 transition">
                  Privacy Policy
                </Link>
              </p>

              {/* Sign Up Button */}
              <Button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold h-11 flex items-center justify-center gap-2"
              >
                Create Account <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-foreground/50">
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Social Sign Up */}
            <Button
              type="button"
              variant="outline"
              className="w-full border-border text-foreground hover:bg-secondary/50 h-11"
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm text-foreground/60">
              Already have an account?{' '}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </div>
  );
}
