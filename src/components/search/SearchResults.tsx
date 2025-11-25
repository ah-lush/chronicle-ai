'use client';

import { motion } from 'framer-motion';
import { ArticleCard } from '@/components/common/ArticleCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { trpc } from '@/lib/trpc/client';
import { containerVariants, itemVariants } from '@/lib/animation-variants';

interface SearchResultsProps {
  query: string;
}

export function SearchResults({ query }: SearchResultsProps) {
  const { data: response, isLoading } = trpc.search.articles.useQuery({
    query,
    limit: 20,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!response || response.items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          No articles found for "{query}"
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <motion.p variants={itemVariants} className="text-sm text-gray-600 dark:text-gray-400">
        Found {response.total} result{response.total !== 1 ? 's' : ''} for "{query}"
      </motion.p>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {response.items.map((article) => (
          <motion.div key={article.id} variants={itemVariants}>
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
