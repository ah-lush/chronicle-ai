'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animation-variants';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function MonitoringPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">System Monitoring</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor platform health and performance
        </p>
      </motion.div>

      {/* Health Status */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <motion.div variants={itemVariants}>
          <StatsCard label="API Status" value="Operational" icon="✅" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard label="Database" value="Healthy" icon="💾" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard label="Cache" value="95% Hit" icon="⚡" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard label="Uptime" value="99.9%" icon="📈" />
        </motion.div>
      </motion.div>

      {/* Logs */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Recent Logs</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">System process completed successfully</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">2 minutes ago</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
