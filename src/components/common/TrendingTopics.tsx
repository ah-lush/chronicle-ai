'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { containerVariants, itemVariants } from '@/lib/animation-variants';

const trendingTopics = [
  { id: '1', topic: 'Artificial Intelligence', articles: 1234 },
  { id: '2', topic: 'Climate Change', articles: 892 },
  { id: '3', topic: 'Space Exploration', articles: 756 },
  { id: '4', topic: 'Quantum Computing', articles: 634 },
  { id: '5', topic: 'Renewable Energy', articles: 521 },
];

export function TrendingTopics() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-3"
    >
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h3 className="font-bold text-lg">Trending Topics</h3>
      </div>

      {trendingTopics.map((topic) => (
        <motion.div
          key={topic.id}
          variants={itemVariants}
          className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <p className="font-medium text-sm">{topic.topic}</p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {topic.articles} articles
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
