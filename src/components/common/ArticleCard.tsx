"use client";

import { Badge } from "@/components/ui/badge";
import type { PublicArticleWithUserInfo } from "@/types/article";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ArticleCardProps {
  article: PublicArticleWithUserInfo;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const publishedDate = article.published_at
    ? new Date(article.published_at)
    : new Date(article.created_at);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      <Link href={`/articles/${article.id}`}>
        <div className="group h-full overflow-hidden rounded-xl border border-border bg-card hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
          <div className="relative h-56 overflow-hidden bg-muted">
            {article.cover_image ? (
              <Image
                src={article.cover_image}
                alt={article.title}
                fill
                unoptimized
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/20 to-accent/20">
                <span className="text-4xl font-bold text-muted-foreground/30">
                  {article.title.charAt(0)}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="text-xs capitalize bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
              >
                {article.category}
              </Badge>
            </div>

            <h3 className="font-bold text-xl line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {article.title}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {article.summary}
            </p>

            <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Avatar>
                  <AvatarImage
                    src={article?.user_info?.avatar_url ?? undefined}
                  />
                  <AvatarFallback>
                    {article?.user_info?.full_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">
                  {article.user_info?.full_name ?? "Anonymous"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{format(publishedDate, "MMM dd, yyyy")}</span>
              </div>
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
