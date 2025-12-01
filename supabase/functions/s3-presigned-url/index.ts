import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { S3Client } from "npm:@aws-sdk/client-s3@3";
import { PutObjectCommand } from "npm:@aws-sdk/client-s3@3";
import { getSignedUrl } from "npm:@aws-sdk/s3-request-presigner@3";
import { authenticateRequest } from "../_shared/auth.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { env } from "../_shared/env.ts";
import { jsonResponse, serverError } from "../_shared/response.ts";
import {
  parseJsonBody,
  sanitizeFileName,
  validateRequired,
} from "../_shared/validation.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { user } = await authenticateRequest(req);

    const body = await parseJsonBody<{
      fileName: string;
      fileType: string;
      folder?: string;
    }>(req);

    const { fileName, fileType, folder = "articles" } = body;

    validateRequired(body, ["fileName", "fileType"]);

    const awsAccessKeyId = env.aws.accessKeyId();
    const awsSecretAccessKey = env.aws.secretAccessKey();
    const awsRegion = env.aws.region();
    const awsS3Bucket = env.aws.s3Bucket();

    // Create S3 client with explicit credentials
    const s3Client = new S3Client({
      region: awsRegion,
      credentials: {
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecretAccessKey,
      },
    });

    const timestamp = Date.now();
    const sanitized = sanitizeFileName(fileName);
    const key = `${folder}/${user.id}/${timestamp}-${sanitized}`;

    const command = new PutObjectCommand({
      Bucket: awsS3Bucket,
      Key: key,
      ContentType: fileType,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    const publicUrl = `https://${awsS3Bucket}.s3.${awsRegion}.amazonaws.com/${key}`;

    return jsonResponse({
      presignedUrl,
      publicUrl,
      key,
      expiresIn: 3600,
    });
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }

    console.error("S3 presigned URL error:", error);

    return serverError(
      error instanceof Error ? error : new Error(String(error))
    );
  }
});
