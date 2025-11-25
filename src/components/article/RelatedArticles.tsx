'use client';

import { Article } from '@/types';
import { ArticleCard } from '@/components/common/ArticleCard';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animation-variants';

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">
        Related Articles
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {articles.map((article) => (
          <motion.div key={article.id} variants={itemVariants}>
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
