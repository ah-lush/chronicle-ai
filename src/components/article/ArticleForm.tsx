"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultipleImageUpload } from "@/components/ui/multiple-image-upload";
import { Textarea } from "@/components/ui/textarea";
import { useS3Upload } from "@/hooks/use-s3-upload";
import { useToast } from "@/hooks/use-toast";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { CATEGORIES } from "@/lib/constants";
import { trpc } from "@/lib/trpc/client";
import {
  articleFormSchema,
  type ArticleFormInput,
  type CreateArticleInput,
} from "@/types/article";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const ArticleForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [coverImageFile, setCoverImageFile] = useState<File | undefined>();
  const [articleImageFiles, setArticleImageFiles] = useState<File[]>([]);

  const { uploadCategorizedImages, progress, isUploading } = useS3Upload();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ArticleFormInput>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      coverImage: null,
      articleImages: [],
      category: "",
      tags: [],
      status: "DRAFT",
    },
  });

  const createArticle = trpc.article.create.useMutation({
    onSuccess: (data) => {
      toast({
        title: "Article created successfully!",
        description: `Your article "${data.title}" has been ${
          data.status === "PUBLISHED" ? "published" : "saved as draft"
        }.`,
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Error creating article",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const categoryOptions = CATEGORIES.map((cat) => ({
    value: cat.slug,
    label: cat.name,
  }));

  const onSubmit = async (data: CreateArticleInput) => {
    try {
      const { coverImageUrl, articleImageUrls } = await uploadCategorizedImages(
        {
          coverImage: coverImageFile,
          articleImages: articleImageFiles,
        }
      );

      createArticle.mutate({
        ...data,
        coverImage: coverImageUrl || data.coverImage,
        articleImages:
          articleImageUrls.length > 0 ? articleImageUrls : data.articleImages,
        status: "PUBLISHED",
      } as CreateArticleInput);
    } catch (error) {
      toast({
        title: "Error uploading images",
        description:
          error instanceof Error ? error.message : "Failed to upload images",
        variant: "destructive",
      });
    }
  };

  const onSaveAsDraft = async () => {
    try {
      const values = control._formValues as CreateArticleInput;

      const { coverImageUrl, articleImageUrls } = await uploadCategorizedImages(
        {
          coverImage: coverImageFile,
          articleImages: articleImageFiles,
        }
      );

      createArticle.mutate({
        ...values,
        coverImage: coverImageUrl || values.coverImage,
        articleImages:
          articleImageUrls.length > 0 ? articleImageUrls : values.articleImages,
        status: "DRAFT",
      } as CreateArticleInput);
    } catch (error) {
      toast({
        title: "Error uploading images",
        description:
          error instanceof Error ? error.message : "Failed to upload images",
        variant: "destructive",
      });
    }
  };

  const isLoading = createArticle.isPending || isUploading;

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
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6"
      >
        <div>
          <Label htmlFor="title">Article Title</Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="Enter article title"
            className="mt-2"
            disabled={isLoading}
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            {...register("summary")}
            placeholder="Brief summary of the article"
            className="mt-2"
            rows={3}
            disabled={isLoading}
          />
          {errors.summary && (
            <p className="text-sm text-red-500 mt-1">
              {errors.summary.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="cover-image">Cover Image</Label>
          <Controller
            name="coverImage"
            control={control}
            render={({ field }) => (
              <ImageUpload
                id="cover-image"
                value={field.value || undefined}
                onChange={(url) => field.onChange(url)}
                onFileChange={setCoverImageFile}
                className="mt-2"
              />
            )}
          />
          {errors.coverImage && (
            <p className="text-sm text-red-500 mt-1">
              {errors.coverImage.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            {...register("content")}
            placeholder="Write your article content here..."
            className="mt-2"
            rows={10}
            disabled={isLoading}
          />
          {errors.content && (
            <p className="text-sm text-red-500 mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="article-images">Article Images</Label>
          <Controller
            name="articleImages"
            control={control}
            render={({ field }) => (
              <MultipleImageUpload
                id="article-images"
                value={field.value || []}
                onChange={(urls) => field.onChange(urls)}
                onFilesChange={setArticleImageFiles}
                maxImages={10}
                className="mt-2"
              />
            )}
          />
          {errors.articleImages && (
            <p className="text-sm text-red-500 mt-1">
              {errors.articleImages.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Combobox
                options={categoryOptions}
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Select a category"
                searchPlaceholder="Search categories..."
                emptyMessage="No category found."
                className="mt-2"
              />
            )}
          />
          {errors.category && (
            <p className="text-sm text-red-500 mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <Input
                id="tags"
                value={field.value?.join(", ") || ""}
                onChange={(e) => {
                  const tagsArray = e.target.value
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean);
                  field.onChange(tagsArray);
                }}
                placeholder="tag1, tag2, tag3"
                className="mt-2"
                disabled={isLoading}
              />
            )}
          />
          {errors.tags && (
            <p className="text-sm text-red-500 mt-1">{errors.tags.message}</p>
          )}
        </div>

        <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
          <Button type="submit" disabled={isLoading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading {progress.uploaded}/{progress.total} images...
              </>
            ) : createArticle.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              "Publish Article"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onSaveAsDraft}
            disabled={isLoading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading {progress.uploaded}/{progress.total} images...
              </>
            ) : createArticle.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save as Draft"
            )}
          </Button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default ArticleForm;
