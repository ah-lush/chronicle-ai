import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Mail, Lock, Github, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Login | Chronicle AI',
  description: 'Sign in to your Chronicle AI account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageTransition>
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="bg-card rounded-xl border border-border p-8 space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
              <p className="text-foreground/60">
                Sign in to your Chronicle AI account
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition"
                  >
                    Forgot password?
                  </Link>
                </div>
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

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold h-11 flex items-center justify-center gap-2"
              >
                Sign In <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-foreground/50">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <Button
              type="button"
              variant="outline"
              className="w-full border-border text-foreground hover:bg-secondary/50 h-11"
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-foreground/60">
              Don't have an account?{' '}
              <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </div>
  );
}
