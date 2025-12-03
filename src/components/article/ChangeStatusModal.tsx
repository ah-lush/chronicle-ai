"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { trpc } from "@/lib/trpc/client";
import type { ArticleStatus } from "@/types/article";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ChangeStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleId: string;
  articleTitle: string;
  currentStatus: ArticleStatus;
  onSuccess: () => void;
}

const STATUS_OPTIONS: {
  value: ArticleStatus;
  label: string;
  description: string;
}[] = [
  {
    value: "DRAFT",
    label: "Draft",
    description: "Article is not visible to the public",
  },
  {
    value: "PUBLISHED",
    label: "Published",
    description: "Article is live and visible to everyone",
  },
  {
    value: "ARCHIVED",
    label: "Archived",
    description: "Article is hidden but preserved",
  },
];

export const ChangeStatusModal = ({
  isOpen,
  onClose,
  articleId,
  articleTitle,
  currentStatus,
  onSuccess,
}: ChangeStatusModalProps) => {
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] =
    useState<ArticleStatus>(currentStatus);

  useEffect(() => {
    setSelectedStatus(currentStatus);
  }, [currentStatus, isOpen]);

  const updateStatusMutation = trpc.article.updateStatus.useMutation({
    onSuccess: () => {
      toast({
        title: "Status updated",
        description: `Article status changed to ${selectedStatus}.`,
      });
      onSuccess();
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedStatus === currentStatus) {
      toast({
        title: "No changes",
        description: "Please select a different status.",
        variant: "destructive",
      });
      return;
    }

    updateStatusMutation.mutate({
      id: articleId,
      status: selectedStatus,
    });
  };

  const getStatusColor = (status: ArticleStatus) => {
    switch (status) {
      case "PUBLISHED":
        return "text-green-600 dark:text-green-400";
      case "DRAFT":
        return "text-yellow-600 dark:text-yellow-400";
      case "ARCHIVED":
        return "text-gray-600 dark:text-gray-400";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Change Article Status</DialogTitle>
            <DialogDescription>
              Update the status for{" "}
              <span className="font-semibold">&quot;{articleTitle}&quot;</span>
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-status">Current Status</Label>
              <div
                className={`text-sm font-medium ${getStatusColor(
                  currentStatus
                )}`}
              >
                {currentStatus}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-status">New Status</Label>
              <Select
                value={selectedStatus}
                onValueChange={(value) =>
                  setSelectedStatus(value as ArticleStatus)
                }
              >
                <SelectTrigger id="new-status">
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      disabled={option.value === currentStatus}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{option.label}</span>
                        <span className="text-xs text-gray-500">
                          {option.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedStatus === "PUBLISHED" &&
              currentStatus !== "PUBLISHED" && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    Publishing this article will make it visible to all users
                    and set the publication date.
                  </p>
                </div>
              )}

            {selectedStatus === "ARCHIVED" && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  Archiving will hide this article from public view but preserve
                  its content.
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={updateStatusMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                updateStatusMutation.isPending || selectedStatus === currentStatus
              }
            >
              {updateStatusMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Status"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
