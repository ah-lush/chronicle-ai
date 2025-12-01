import { validationError } from "./response.ts";

export function validateRequired<T extends Record<string, unknown>>(
  data: T,
  fields: (keyof T)[]
): void {
  const missing = fields.filter((field) => !data[field]);

  if (missing.length > 0) {
    throw validationError(`Missing required fields: ${missing.join(", ")}`, {
      missing,
    });
  }
}

export async function parseJsonBody<T = Record<string, unknown>>(
  req: Request
): Promise<T> {
  try {
    return (await req.json()) as T;
  } catch (error) {
    throw validationError("Invalid JSON in request body", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
}
