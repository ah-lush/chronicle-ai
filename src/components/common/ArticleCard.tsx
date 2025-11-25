'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured';
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/article/${article.slug}`}>
        <div className="group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow duration-300">
          {/* Image */}
          <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {article.sourceType === 'ai-generated' && (
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="text-xs">
                  AI Generated
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Category Badge */}
            <div className="mb-2">
              <Badge variant="outline" className="text-xs capitalize">
                {article.category}
              </Badge>
            </div>

            {/* Title */}
            <h3 className="font-bold text-lg line-clamp-2 mb-2 group-hover:text-blue-600 transition">
              {article.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
              {article.excerpt}
            </p>

            {/* Metadata */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span>{format(article.publishedAt, 'MMM dd, yyyy')}</span>
                <span>•</span>
                <span>{article.readTime} min read</span>
              </div>
              <span>{article.views.toLocaleString()} views</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
