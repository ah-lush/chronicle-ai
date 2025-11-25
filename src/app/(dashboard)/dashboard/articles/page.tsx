'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animation-variants';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';

const articles = [
  {
    id: '1',
    title: 'The Future of AI',
    status: 'published' as const,
    views: 1234,
    date: '2024-11-26',
  },
  {
    id: '2',
    title: 'Climate Change Solutions',
    status: 'draft' as const,
    views: 0,
    date: '2024-11-25',
  },
  {
    id: '3',
    title: 'Space Exploration',
    status: 'pending' as const,
    views: 0,
    date: '2024-11-24',
  },
];

export default function ArticlesPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Articles</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and view all your articles</p>
        </div>
        <Link href="/dashboard/create">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            New Article
          </Button>
        </Link>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <Tabs defaultValue="published" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          {(['published', 'draft', 'pending'] as const).map((status) => (
            <TabsContent key={status} value={status} className="space-y-4">
              {articles
                .filter((a) => a.status === status)
                .map((article) => (
                  <motion.div
                    key={article.id}
                    variants={itemVariants}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{article.title}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>{article.date}</span>
                        {article.views > 0 && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {article.views} views
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
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
