"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArticleDetailSkeleton } from "./ArticleDetailSkeleton";
import { ArticleImageModal } from "./ArticleImageModal";

interface ArticleDetailPageProps {
  articleId: string;
}

export function ArticleDetailPage({ articleId }: ArticleDetailPageProps) {
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const { data: article, isLoading } = trpc.article.getById.useQuery({
    id: articleId,
  });

  if (isLoading) {
    return <ArticleDetailSkeleton />;
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Article not found</h2>
          <Button onClick={() => router.push("/articles")}>
            Back to Articles
          </Button>
        </div>
      </div>
    );
  }

  const publishedDate = article.published_at
    ? new Date(article.published_at)
    : new Date(article.created_at);

  const articleImages = article.article_images || [];
  const hasImages = articleImages.length > 0;

  const openImageCarousel = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImageCarousel = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null && hasImages) {
      setSelectedImageIndex((selectedImageIndex + 1) % articleImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null && hasImages) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + articleImages.length) % articleImages.length
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
        {article.cover_image ? (
          <>
            <Image
              src={article.cover_image}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/80" />
          </>
        ) : (
          <div className="w-full h-full bg-linear-to-br from-primary/20 to-accent/20" />
        )}

        <div className="absolute top-6 left-6 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/articles")}
            className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
          <div className="max-w-4xl mx-auto space-y-4">
            <Badge
              variant="secondary"
              className="text-xs capitalize bg-primary/90 text-white hover:bg-primary border-none"
            >
              {article.category}
            </Badge>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg"
            >
              {article.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-6 text-white/90 text-sm"
            >
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={article?.user_info?.avatar_url ?? undefined}
                  />
                  <AvatarFallback>
                    {article?.user_info?.full_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span>{article?.user_info?.full_name ?? "Anonymous"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(publishedDate, "MMMM dd, yyyy")}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-6 py-2">
            {article.summary}
          </p>
        </motion.div>

        {article.tags && article.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {article.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-sm px-3 py-1 bg-muted/50"
              >
                #{tag}
              </Badge>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
        >
          <div
            className="leading-relaxed text-foreground"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </motion.div>

        {hasImages && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {articleImages.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="relative aspect-video rounded-lg overflow-hidden cursor-pointer border border-border hover:border-primary"
                  onClick={() => openImageCarousel(index)}
                >
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </article>

      <ArticleImageModal
        images={articleImages}
        selectedIndex={selectedImageIndex}
        onClose={closeImageCarousel}
        onNext={nextImage}
        onPrevious={prevImage}
      />
    </div>
  );
}
