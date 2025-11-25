'use client';

import { motion } from 'framer-motion';
import { ArticleCard } from '@/components/common/ArticleCard';
import { trpc } from '@/lib/trpc/client';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { containerVariants, itemVariants } from '@/lib/animation-variants';

export function FeaturedArticles() {
  const { data: articles, isLoading } = trpc.article.getFeatured.useQuery();

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
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Featured Stories</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Handpicked stories that matter most
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {articles?.map((article) => (
          <motion.div key={article.id} variants={itemVariants}>
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
