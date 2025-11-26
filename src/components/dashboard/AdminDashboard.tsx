"use client";

import { StatsCard } from "@/components/dashboard/StatsCard";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { trpc } from "@/lib/trpc/client";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { FileText, CheckCircle, Clock, Eye } from "lucide-react";

const AdminDashboard = () => {
  const { data: stats, isLoading } = trpc.admin.getStats.useQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Platform overview and management
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={itemVariants}>
          <StatsCard
            label="Total Articles"
            value={stats?.totalArticles || 0}
            icon={FileText}
            iconColor="text-blue-600"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            label="Published"
            value={stats?.publishedArticles || 0}
            icon={CheckCircle}
            iconColor="text-green-600"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            label="Pending Review"
            value={stats?.pendingArticles || 0}
            icon={Clock}
            iconColor="text-orange-600"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            label="Total Views"
            value={(stats?.totalViews || 0).toLocaleString()}
            icon={Eye}
            iconColor="text-purple-600"
          />
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="font-bold mb-4">Content Types</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>AI Generated</span>
              <span className="font-bold">{stats?.aiGeneratedCount || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>User Posted</span>
              <span className="font-bold">{stats?.userPostedCount || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="font-bold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              Review Pending Articles
            </button>
            <button className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              View User Reports
            </button>
            <button className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              System Health Check
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
