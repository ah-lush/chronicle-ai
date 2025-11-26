"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";
import { ImageUpload } from "@/components/ui/image-upload";
import { MultipleImageUpload } from "@/components/ui/multiple-image-upload";
import { CATEGORIES } from "@/lib/constants";

export default function CreatePage() {
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState<string | undefined>();
  const [coverImageFile, setCoverImageFile] = useState<File | undefined>();
  const [articleImages, setArticleImages] = useState<string[]>([]);
  const [articleImageFiles, setArticleImageFiles] = useState<File[]>([]);

  const categoryOptions = CATEGORIES.map((cat) => ({
    value: cat.slug,
    label: cat.name,
  }));

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">Create Article</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Write and publish your own article
        </p>
      </motion.div>

      <motion.form
        variants={itemVariants}
        className="space-y-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6"
      >
        <div>
          <Label htmlFor="title">Article Title</Label>
          <Input
            id="title"
            placeholder="Enter article title"
            className="mt-2"
            required
          />
        </div>

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

        <div>
          <Label htmlFor="cover-image">Cover Image</Label>
          <ImageUpload
            id="cover-image"
            value={coverImage}
            onChange={setCoverImage}
            onFileChange={setCoverImageFile}
            className="mt-2"
          />
        </div>

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

        <div>
          <Label htmlFor="article-images">Article Images</Label>
          <MultipleImageUpload
            id="article-images"
            value={articleImages}
            onChange={setArticleImages}
            onFilesChange={setArticleImageFiles}
            maxImages={10}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Combobox
            options={categoryOptions}
            value={category}
            onValueChange={setCategory}
            placeholder="Select a category"
            searchPlaceholder="Search categories..."
            emptyMessage="No category found."
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input id="tags" placeholder="tag1, tag2, tag3" className="mt-2" />
        </div>

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
