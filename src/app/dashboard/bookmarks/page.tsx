"use client";

import { ArticleCard } from "@/components/common/ArticleCard";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { motion } from "framer-motion";

const mockBookmarks = [
  {
    id: "1",
    slug: "breakthrough-ai-development-2024",
    title: "Major Breakthrough in AI Development",
    excerpt: "Researchers announce groundbreaking advancement...",
    content: "",
    coverImage:
      "https://images.unsplash.com/photo-1677442d019cecf3d4f3d4c6c1f6c6c7?w=1200&h=600&fit=crop",
    author: {
      id: "1",
      name: "Sarah Chen",
      email: "sarah@example.com",
    },
    category: "technology",
    tags: ["AI", "machine-learning"],
    sourceType: "ai-generated" as const,
    publishedAt: new Date("2024-11-26"),
    updatedAt: new Date("2024-11-26"),
    views: 4521,
    readTime: 5,
    featured: true,
    status: "published" as const,
  },
];

export default function BookmarksPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">Bookmarked Articles</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your saved articles for later reading
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {mockBookmarks.map((article) => (
          <motion.div key={article.id} variants={itemVariants}>
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
