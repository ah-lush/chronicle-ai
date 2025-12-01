import { createTRPCRouter, publicProcedure } from './trpc';
import { authRouter } from './routers/auth';
import { articleRouter } from './routers/article';
import { userRouter } from './routers/user';
import { searchRouter } from './routers/search';
import { adminRouter } from './routers/admin';
import { uploadRouter } from './routers/upload';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  article: articleRouter,
  user: userRouter,
  search: searchRouter,
  admin: adminRouter,
  upload: uploadRouter,
  health: publicProcedure.query(() => ({ ok: true })),
});

export type AppRouter = typeof appRouter;
