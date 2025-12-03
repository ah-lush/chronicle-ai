"use client";

import { ArticleCard } from "@/components/common/ArticleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORIES } from "@/lib/constants";
import { trpc } from "@/lib/trpc/client";
import { motion } from "framer-motion";
import { Loader2, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const ArticlesPage = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const queryParams = useMemo(
    () => ({
      page,
      limit: 12,
      ...(debouncedSearch && { search: debouncedSearch }),
      ...(category && category !== "all" && { category }),
      sortBy: "published_at" as const,
      sortOrder: "desc" as const,
    }),
    [page, debouncedSearch, category]
  );

  const [allArticles, setAllArticles] = useState<any[]>([]);

  const { data, isLoading, isFetching } =
    trpc.article.getPublicArticles.useQuery(queryParams);

  useEffect(() => {
    if (data?.articles) {
      if (page === 1) {
        setAllArticles(data.articles);
      } else {
        setAllArticles((prev) => {
          const existingIds = new Set(prev.map((a) => a.id));
          const newArticles = data.articles.filter(
            (a) => !existingIds.has(a.id)
          );
          return [...prev, ...newArticles];
        });
      }
    }
  }, [data, page]);

  const hasNextPage = data
    ? data.pagination.page < data.pagination.totalPages
    : false;

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setCategory(value === "all" ? undefined : value);
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setSearch("");
    setCategory(undefined);
    setPage(1);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetching) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetching]);

  const hasFilters = search || category;

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-linear-to-br from-primary/10 via-background to-accent/5 border-b border-border">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
              Explore Articles
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover insightful stories, expert opinions, and
              thought-provoking content
            </p>
          </motion.div>
        </div>
      </div>

      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-10 h-11 bg-card border-border focus:ring-2 focus:ring-primary/20"
              />
              {search && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            <Select
              value={category || "all"}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-full sm:w-48 h-11 bg-card border-border">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="sm:w-auto border-border"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-56 w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        ) : allArticles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-6">
              {hasFilters
                ? "Try adjusting your filters or search terms"
                : "No published articles available yet"}
            </p>
            {hasFilters && (
              <Button onClick={clearFilters}>Clear Filters</Button>
            )}
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {allArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </motion.div>

            <div ref={observerTarget} className="py-12 text-center">
              {isFetching && (
                <div className="flex items-center justify-center gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <span className="text-muted-foreground">
                    Loading more articles...
                  </span>
                </div>
              )}
              {!hasNextPage && allArticles.length > 0 && (
                <p className="text-muted-foreground">You've reached the end</p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ArticlesPage;
