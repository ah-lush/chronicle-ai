"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { motion } from "framer-motion";
import {
  Zap,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import type { Database } from "@/types/supabase";

type AgentJob = Database["public"]["Tables"]["agent_jobs"]["Row"];

const AiGenerateActionPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");

  const { data: jobsData, refetch } = trpc.ai.getJobs.useQuery({
    limit: 20,
    offset: 0,
  });

  const createJobMutation = trpc.ai.createJob.useMutation({
    onSuccess: () => {
      toast.success("AI generation started!");
      setOpen(false);
      setPrompt("");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    createJobMutation.mutate({ query: prompt });
  };

  const getStatusColor = (
    status: string
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "COMPLETED":
        return "default";
      case "FAILED":
        return "destructive";
      case "QUEUED":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "FAILED":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "QUEUED":
        return <Clock className="w-4 h-4 text-gray-500" />;
      default:
        return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />;
    }
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
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">AI Article Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Let AI help you generate articles on any topic
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Zap className="w-4 h-4 mr-2" />
              New Generation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate AI Article</DialogTitle>
              <DialogDescription>
                Enter a prompt to generate an article. Our AI will research the
                topic and create a comprehensive article.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="prompt">What should the article be about?</Label>
                <Input
                  id="prompt"
                  placeholder="e.g., Write an article about Zohran Momdani"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="mt-2"
                  disabled={createJobMutation.isPending}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={createJobMutation.isPending}
              >
                {createJobMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Generate Article
                  </>
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold">Generation Jobs</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track your AI article generation progress
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Prompt</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobsData?.jobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <p className="text-gray-500">No jobs yet. Create one to get started!</p>
                </TableCell>
              </TableRow>
            ) : (
              jobsData?.jobs.map((job: AgentJob) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(job.status)}
                      <Badge variant={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium truncate">{job.query}</p>
                      {job.current_step && (
                        <p className="text-xs text-gray-500">{job.current_step}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={job.progress || 0} className="w-24" />
                      <span className="text-sm text-gray-500">
                        {job.progress || 0}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(job.created_at), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell>
                    {job.article_id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/dashboard/articles/${job.article_id}`)}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6"
      >
        <p className="text-sm text-blue-900 dark:text-blue-300">
          Our AI will search the internet, gather relevant sources, and write a
          comprehensive article based on your input. Generated articles are
          always marked as "AI-Generated" for transparency.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AiGenerateActionPage;
