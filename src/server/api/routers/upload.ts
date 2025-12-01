import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const uploadRouter = createTRPCRouter({
  getPresignedUrl: protectedProcedure
    .input(
      z.object({
        fileName: z.string().min(1, "File name is required"),
        fileType: z.string().min(1, "File type is required"),
        folder: z.string().default("articles"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { data, error } = await ctx.supabase.functions.invoke<{
          presignedUrl: string;
          publicUrl: string;
          key: string;
          expiresIn: number;
        }>("s3-presigned-url", {
          body: {
            fileName: input.fileName,
            fileType: input.fileType,
            folder: input.folder,
          },
        });

        if (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to generate presigned URL",
            cause: error,
          });
        }

        if (!data) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "No response from upload service",
          });
        }

        return data;
      } catch (error) {
        console.error("Error getting presigned URL:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "Failed to generate presigned URL",
        });
      }
    }),
});
