'use client';

import { motion } from 'framer-motion';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-32 -left-32 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 -bottom-32 -right-32 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered News Intelligence</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-foreground"
          >
            Discover News That{' '}
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text">
              Matters
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto"
          >
            Chronicle AI analyzes thousands of sources to bring you intelligent, curated news coverage on topics you care about.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-4 top-3.5 text-foreground/50" />
                <Input
                  placeholder="Search for events, topics, or people..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-12 h-12 text-base bg-card border-border text-foreground"
                />
              </div>
              <Button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-600 text-black h-12 px-8 font-semibold"
              >
                Search
              </Button>
            </div>
          </motion.form>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold flex items-center gap-2">
              Explore Latest <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="border-border text-foreground hover:bg-card">Learn More</Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-3 gap-4 mt-16 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-cyan-400">10K+</p>
            <p className="text-sm text-foreground/60">Articles</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-teal-400">8</p>
            <p className="text-sm text-foreground/60">Categories</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-cyan-400">50K+</p>
            <p className="text-sm text-foreground/60">Readers</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
