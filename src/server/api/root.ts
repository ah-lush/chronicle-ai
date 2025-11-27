import { createTRPCRouter, publicProcedure } from './trpc';
import { authRouter } from './routers/auth';
import { articleRouter } from './routers/article';
import { userRouter } from './routers/user';
import { searchRouter } from './routers/search';
import { adminRouter } from './routers/admin';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  article: articleRouter,
  user: userRouter,
  search: searchRouter,
  admin: adminRouter,
  health: publicProcedure.query(() => ({ ok: true })),
});

export type AppRouter = typeof appRouter;
