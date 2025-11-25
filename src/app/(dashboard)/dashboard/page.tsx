'use client';

import { StatsCard } from '@/components/dashboard/StatsCard';
import { FileText, Eye, Zap, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animation-variants';

export default function DashboardPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's a summary of your account activity
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={itemVariants}>
          <StatsCard
            label="Articles Published"
            value="12"
            icon="📄"
            trend={{ value: 25, isPositive: true }}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            label="Total Views"
            value="4.2K"
            icon="👁️"
            trend={{ value: 12, isPositive: true }}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            label="AI Generated"
            value="5"
            icon="⚡"
            trend={{ value: 40, isPositive: true }}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            label="Bookmarked"
            value="23"
            icon="🔖"
            trend={{ value: 8, isPositive: true }}
          />
        </motion.div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
              <div>
                <p className="font-medium">Published new article</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">2 hours ago</p>
              </div>
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
