'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animation-variants';
import { StatsCard } from '@/components/dashboard/StatsCard';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const chartData = [
  { month: 'Jan', views: 400, reads: 240 },
  { month: 'Feb', views: 600, reads: 350 },
  { month: 'Mar', views: 800, reads: 500 },
  { month: 'Apr', views: 1200, reads: 800 },
  { month: 'May', views: 1600, reads: 1100 },
  { month: 'Jun', views: 2100, reads: 1400 },
];

export default function AnalyticsPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your article performance and reader engagement
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={itemVariants}>
          <StatsCard label="Total Views" value="8.5K" icon="👁️" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard label="Total Reads" value="5.2K" icon="📖" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard label="Avg Read Time" value="4.5 min" icon="⏱️" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard label="Engagement Rate" value="62%" icon="📈" />
        </motion.div>
      </motion.div>

      {/* Charts */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Views Chart */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6"
        >
          <h3 className="font-bold mb-4">Views Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Reads Chart */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6"
        >
          <h3 className="font-bold mb-4">Reads Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="reads" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
