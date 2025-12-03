"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { CATEGORIES } from "@/lib/constants";
import { trpc } from "@/lib/trpc/client";
import type { ArticleStatus } from "@/types/article";
import { motion } from "framer-motion";
import { Edit, Eye, Loader2, Search, Trash2, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ChangeStatusModal } from "./ChangeStatusModal";

const ArticlesInfo = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<ArticleStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const limit = 10;
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<{
    id: string;
    title: string;
    status: ArticleStatus;
  } | null>(null);

  const { data, isLoading, refetch } = trpc.article.getArticles.useQuery({
    page,
    limit,
    status: activeTab === "ALL" ? undefined : activeTab,
    category,
    search: search.trim() || undefined,
    sortBy: "created_at",
    sortOrder: "desc",
  });

  const deleteMutation = trpc.article.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Article deleted",
        description: "The article has been deleted successfully.",
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Error deleting article",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: string, title: string) => {
    if (
      confirm(
        `Are you sure you want to delete "${title}"? This action cannot be undone.`
      )
    ) {
      deleteMutation.mutate({ id });
    }
  };

  const handleStatusChange = (id: string, title: string, status: ArticleStatus) => {
    setSelectedArticle({ id, title, status });
    setStatusModalOpen(true);
  };

  const handleStatusModalClose = () => {
    setStatusModalOpen(false);
    setSelectedArticle(null);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as ArticleStatus | "ALL");
    setPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

  const articles = data?.articles || [];
  const pagination = data?.pagination || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">My Articles</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and view all your articles
          </p>
        </div>
        <Link href="/dashboard/create">
          <Button>New Article</Button>
        </Link>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 space-y-4"
      >
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <form onSubmit={handleSearch} className="flex gap-2 mt-2">
              <Input
                id="search"
                placeholder="Search by title, content, tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button type="submit" size="icon" variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={category}
              onValueChange={(value) => {
                setCategory(value === "all" ? undefined : value);
                setPage(1);
              }}
            >
              <SelectTrigger id="category" className="mt-2">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setCategory(undefined);
                setActiveTab("ALL");
                setPage(1);
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6"
      >
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ALL">
              All {pagination.total > 0 && `(${pagination.total})`}
            </TabsTrigger>
            <TabsTrigger value="PUBLISHED">Published</TabsTrigger>
            <TabsTrigger value="DRAFT">Draft</TabsTrigger>
            <TabsTrigger value="ARCHIVED">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  {search || category
                    ? "No articles found matching your filters."
                    : "No articles yet. Create your first article!"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-lg">{article.title}</h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            article.status === "PUBLISHED"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : article.status === "DRAFT"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                          }`}
                        >
                          {article.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {article.summary}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                        <span>Category: {article.category}</span>
                        <span>•</span>
                        <span>
                          {new Date(article.created_at).toLocaleDateString()}
                        </span>
                        {article.published_at && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              Published{" "}
                              {new Date(
                                article.published_at
                              ).toLocaleDateString()}
                            </span>
                          </>
                        )}
                        {article.tags && article.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              Tags: {article.tags.slice(0, 3).join(", ")}
                              {article.tags.length > 3 &&
                                ` +${article.tags.length - 3}`}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() =>
                          handleStatusChange(
                            article.id,
                            article.title,
                            article.status
                          )
                        }
                        title="Change status"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Link href={`/dashboard/edit/${article.id}`}>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          title="Edit article"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="icon-sm"
                        onClick={() => handleDelete(article.id, article.title)}
                        disabled={deleteMutation.isPending}
                        title="Delete article"
                      >
                        {deleteMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, pagination.total)} of {pagination.total}{" "}
              articles
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from(
                  { length: Math.min(5, pagination.totalPages) },
                  (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  }
                )}
                {pagination.totalPages > 5 && (
                  <>
                    <span className="px-2">...</span>
                    <Button
                      variant={
                        page === pagination.totalPages ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setPage(pagination.totalPages)}
                    >
                      {pagination.totalPages}
                    </Button>
                  </>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPage((p) => Math.min(pagination.totalPages, p + 1))
                }
                disabled={page === pagination.totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </motion.div>

      {selectedArticle && (
        <ChangeStatusModal
          isOpen={statusModalOpen}
          onClose={handleStatusModalClose}
          articleId={selectedArticle.id}
          articleTitle={selectedArticle.title}
          currentStatus={selectedArticle.status}
          onSuccess={refetch}
        />
      )}
    </motion.div>
  );
};

export default ArticlesInfo;
