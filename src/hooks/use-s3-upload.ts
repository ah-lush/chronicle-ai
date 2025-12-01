import { trpc } from "@/lib/trpc/client";
import { useState } from "react";
import { useToast } from "./use-toast";

export interface UploadProgress {
  isUploading: boolean;
  total: number;
  uploaded: number;
  percentage: number;
}

export interface UseS3UploadOptions {
  onSuccess?: (urls: string[]) => void;
  onError?: (error: Error) => void;
  onProgress?: (progress: UploadProgress) => void;
  showToast?: boolean;
}

export interface UploadFileOptions {
  file: File;
  folder?: string;
}

export function useS3Upload(options: UseS3UploadOptions = {}) {
  const { onSuccess, onError, onProgress, showToast = false } = options;
  const { toast } = useToast();

  const [progress, setProgress] = useState<UploadProgress>({
    isUploading: false,
    total: 0,
    uploaded: 0,
    percentage: 0,
  });

  const getPresignedUrl = trpc.upload.getPresignedUrl.useMutation();

  const updateProgress = (newProgress: UploadProgress) => {
    setProgress(newProgress);
    onProgress?.(newProgress);
  };

  const uploadFile = async ({
    file,
    folder = "uploads",
  }: UploadFileOptions): Promise<string> => {
    try {
      const data = await getPresignedUrl.mutateAsync({
        fileName: file.name,
        fileType: file.type,
        folder,
      });

      const uploadResponse = await fetch(data.presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload ${file.name} to S3`);
      }

      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error instanceof Error ? error : new Error("Failed to upload file");
    }
  };

  const uploadFiles = async (
    uploads: UploadFileOptions[]
  ): Promise<string[]> => {
    const total = uploads.length;

    if (total === 0) {
      return [];
    }

    updateProgress({
      isUploading: true,
      total,
      uploaded: 0,
      percentage: 0,
    });

    const urls: string[] = [];

    try {
      for (let i = 0; i < uploads.length; i++) {
        const url = await uploadFile(uploads[i]!);
        urls.push(url);

        const uploaded = i + 1;
        const percentage = Math.round((uploaded / total) * 100);

        updateProgress({
          isUploading: true,
          total,
          uploaded,
          percentage,
        });
      }

      updateProgress({
        isUploading: false,
        total: 0,
        uploaded: 0,
        percentage: 0,
      });

      if (showToast) {
        toast({
          title: "Upload successful",
          description: `Successfully uploaded ${total} file${
            total > 1 ? "s" : ""
          }`,
        });
      }

      onSuccess?.(urls);
      return urls;
    } catch (error) {
      updateProgress({
        isUploading: false,
        total: 0,
        uploaded: 0,
        percentage: 0,
      });

      const errorMessage =
        error instanceof Error ? error.message : "Failed to upload files";

      if (showToast) {
        toast({
          title: "Upload failed",
          description: errorMessage,
          variant: "destructive",
        });
      }

      onError?.(error instanceof Error ? error : new Error(errorMessage));
      throw error;
    }
  };

  const uploadCategorizedImages = async (images: {
    coverImage?: File;
    articleImages?: File[];
  }): Promise<{
    coverImageUrl: string | null;
    articleImageUrls: string[];
  }> => {
    const uploads: UploadFileOptions[] = [];

    if (images.coverImage) {
      uploads.push({
        file: images.coverImage,
        folder: "articles/covers",
      });
    }

    if (images.articleImages) {
      uploads.push(
        ...images.articleImages.map((file) => ({
          file,
          folder: "articles/content",
        }))
      );
    }

    const urls = await uploadFiles(uploads);

    return {
      coverImageUrl: images.coverImage ? urls[0] || null : null,
      articleImageUrls: images.coverImage ? urls.slice(1) : urls,
    };
  };

  const uploadCategorizedFiles = async <
    T extends Record<string, File | File[]>
  >(
    files: T,
    folderMapping: Record<keyof T, string>
  ): Promise<Record<keyof T, string | string[]>> => {
    const uploads: UploadFileOptions[] = [];
    const fileKeys: Array<{ key: keyof T; isArray: boolean; index?: number }> =
      [];

    for (const [key, value] of Object.entries(files)) {
      const folder = folderMapping[key as keyof T];

      if (Array.isArray(value)) {
        value.forEach((file, index) => {
          uploads.push({ file, folder });
          fileKeys.push({ key: key as keyof T, isArray: true, index });
        });
      } else if (value) {
        uploads.push({ file: value as File, folder });
        fileKeys.push({ key: key as keyof T, isArray: false });
      }
    }

    const urls = await uploadFiles(uploads);

    const result: Record<keyof T, string | string[]> = {} as Record<
      keyof T,
      string | string[]
    >;
    const arrayResults: Record<keyof T, string[]> = {} as Record<
      keyof T,
      string[]
    >;

    fileKeys.forEach((meta, i) => {
      if (meta.isArray) {
        if (!arrayResults[meta.key]) {
          arrayResults[meta.key] = [];
        }
        arrayResults[meta.key]!.push(urls[i]!);
      } else {
        result[meta.key] = urls[i]!;
      }
    });

    for (const key in arrayResults) {
      result[key] = arrayResults[key]!;
    }

    return result;
  };

  const reset = () => {
    updateProgress({
      isUploading: false,
      total: 0,
      uploaded: 0,
      percentage: 0,
    });
  };

  return {
    uploadFile,
    uploadFiles,
    uploadCategorizedFiles,
    uploadCategorizedImages,
    progress,
    isUploading: progress.isUploading,
    reset,
  };
}
