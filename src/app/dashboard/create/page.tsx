'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animation-variants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORIES } from '@/lib/constants';

export default function CreatePage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">Create Article</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Write and publish your own article
        </p>
      </motion.div>

      {/* Form */}
      <motion.form variants={itemVariants} className="space-y-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        {/* Title */}
        <div>
          <Label htmlFor="title">Article Title</Label>
          <Input
            id="title"
            placeholder="Enter article title"
            className="mt-2"
            required
          />
        </div>

        {/* Excerpt */}
        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            placeholder="Brief summary of the article"
            className="mt-2"
            rows={3}
            required
          />
        </div>

        {/* Content */}
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            placeholder="Write your article content here..."
            className="mt-2"
            rows={10}
            required
          />
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.id} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tags */}
        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            placeholder="tag1, tag2, tag3"
            className="mt-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
          <Button type="submit">Publish Article</Button>
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
        </div>
      </motion.form>
    </motion.div>
  );
}
