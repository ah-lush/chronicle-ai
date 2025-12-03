import { adminRouter } from "./routers/admin";
import { aiRouter } from "./routers/ai";
import { articleRouter } from "./routers/article";
import { authRouter } from "./routers/auth";
import { uploadRouter } from "./routers/upload";
import { userRouter } from "./routers/user";
import { createTRPCRouter, publicProcedure } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  article: articleRouter,
  user: userRouter,
  admin: adminRouter,
  upload: uploadRouter,
  ai: aiRouter,
  health: publicProcedure.query(() => ({ ok: true })),
});

export type AppRouter = typeof appRouter;
