"use client";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { trpc } from "@/lib/trpc/client";
import { motion } from "framer-motion";

export default function ContentPage() {
  const { data: response, isLoading } = trpc.admin.getAllArticles.useQuery({});

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
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Review and moderate all content on the platform
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6"
      >
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
          </TabsList>

          {(["all", "pending", "published"] as const).map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              <p>coming soon</p>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
