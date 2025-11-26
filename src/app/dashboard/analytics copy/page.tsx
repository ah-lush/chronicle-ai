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
  { month: 'Jan', users: 400, articles: 240 },
  { month: 'Feb', users: 600, articles: 350 },
  { month: 'Mar', users: 800, articles: 500 },
  { month: 'Apr', users: 1200, articles: 800 },
  { month: 'May', users: 1600, articles: 1100 },
  { month: 'Jun', users: 2100, articles: 1400 },
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
        <h1 className="text-3xl font-bold">Platform Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View platform-wide metrics and trends
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
          <StatsCard label="Total Users" value="2.1K" icon="👥" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard label="Total Articles" value="1.4K" icon="📄" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard label="Total Views" value="125K" icon="👁️" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard label="Avg Engagement" value="68%" icon="📊" />
        </motion.div>
      </motion.div>

      {/* Charts */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Users Growth */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6"
        >
          <h3 className="font-bold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Articles Published */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6"
        >
          <h3 className="font-bold mb-4">Articles Published</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="articles" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
