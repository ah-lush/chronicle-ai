"use client";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc/client";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Trash2, Check, Eye } from "lucide-react";

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
              {response?.items.map((article) => (
                <motion.div
                  key={article.id}
                  variants={itemVariants}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{article.title}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{article.author.name}</span>
                      <span>•</span>
                      <span>
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span className="capitalize">{article.sourceType}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon-sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    {article.status !== "published" && (
                      <Button variant="success" size="icon-sm">
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <Button variant="destructive" size="icon-sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
