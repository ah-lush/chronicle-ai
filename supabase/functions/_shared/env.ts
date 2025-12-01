export function getEnv(key: string, required = true): string {
  const value = Deno.env.get(key);

  if (!value && required) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value ?? "";
}

export function getEnvOrDefault(key: string, defaultValue: string): string {
  return Deno.env.get(key) ?? defaultValue;
}

export const env = {
  supabase: {
    url: () => getEnv("SUPABASE_URL"),
    anonKey: () => getEnv("SUPABASE_ANON_KEY"),
    serviceRoleKey: () => getEnv("SUPABASE_SERVICE_ROLE_KEY"),
  },
  aws: {
    region: () => getEnvOrDefault("AWS_REGION", "us-east-1"),
    accessKeyId: () => getEnv("AWS_ACCESS_KEY_ID"),
    secretAccessKey: () => getEnv("AWS_SECRET_ACCESS_KEY"),
    s3Bucket: () => getEnv("AWS_S3_BUCKET"),
  },
} as const;
