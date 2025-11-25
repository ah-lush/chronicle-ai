import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Forgot Password | Chronicle AI',
  description: 'Reset your Chronicle AI password',
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <PageTransition>
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6">
              {/* Email */}
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-2">
                  <Mail className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Send Reset Link
              </Button>
            </form>

            {/* Back to Login */}
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 mt-6 text-sm text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </div>
  );
}
