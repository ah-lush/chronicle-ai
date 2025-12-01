import { corsHeaders } from "./cors.ts";

export function jsonResponse(
  data: unknown,
  status = 200,
  additionalHeaders: Record<string, string> = {}
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
      ...additionalHeaders,
    },
  });
}

export function errorResponse(
  error: string | Error,
  status = 500,
  details?: unknown
): Response {
  const message = typeof error === "string" ? error : error.message;

  return jsonResponse(
    {
      error: message,
      ...(details && { details }),
    },
    status
  );
}

export function validationError(message: string, details?: unknown): Response {
  return errorResponse(message, 400, details);
}

export function unauthorizedError(message = "Unauthorized"): Response {
  return errorResponse(message, 401);
}

export function forbiddenError(message = "Forbidden"): Response {
  return errorResponse(message, 403);
}

export function notFoundError(message = "Resource not found"): Response {
  return errorResponse(message, 404);
}

export function serverError(error: Error | string): Response {
  console.error("Server error:", error);
  return errorResponse(error, 500);
}
