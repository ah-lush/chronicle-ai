"use client";

import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun, User, X, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-foreground">Chronicle</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-foreground/70 hover:text-cyan-400 transition"
            >
              Home
            </Link>
            <Link
              href="/articles"
              className="text-sm font-medium text-foreground/70 hover:text-cyan-400 transition"
            >
              Explore
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isMounted && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
            )}

            <Button
              onClick={() => router.push("/login")}
              variant="ghost"
              size="icon-sm"
            >
              <User className="w-4 h-4" />
            </Button>
          </div>

          <button
            className="md:hidden text-foreground/70"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden pb-4 pt-2 border-t border-border space-y-2">
            <Link
              href="/"
              className="block py-2 text-sm font-medium text-foreground/70 hover:text-cyan-400"
            >
              Home
            </Link>
            <Link
              href="/articles"
              className="block py-2 text-sm font-medium text-foreground/70 hover:text-cyan-400"
            >
              Explore
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
