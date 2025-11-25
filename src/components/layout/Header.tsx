'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, Zap, Search, User, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from 'next-themes';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-foreground">Chronicle</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-foreground/70 hover:text-cyan-400 transition">
              Home
            </Link>
            <Link href="/search" className="text-sm font-medium text-foreground/70 hover:text-cyan-400 transition">
              Explore
            </Link>
            <Link href="/category/technology" className="text-sm font-medium text-foreground/70 hover:text-cyan-400 transition">
              Technology
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-foreground/50" />
              <Input
                placeholder="Search articles..."
                className="pl-10 w-48 bg-secondary/50 border-border/50 text-foreground placeholder:text-foreground/40"
              />
            </div>

            {isMounted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="text-foreground/70 hover:text-cyan-400"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            )}

            <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-cyan-400">
              <User className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground/70" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 pt-2 border-t border-border space-y-2">
            <Link href="/" className="block py-2 text-sm font-medium text-foreground/70 hover:text-cyan-400">
              Home
            </Link>
            <Link href="/search" className="block py-2 text-sm font-medium text-foreground/70 hover:text-cyan-400">
              Explore
            </Link>
            <Link href="/category/technology" className="block py-2 text-sm font-medium text-foreground/70 hover:text-cyan-400">
              Technology
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
