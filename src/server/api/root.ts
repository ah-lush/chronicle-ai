import { createTRPCRouter, publicProcedure } from './trpc';
import { articleRouter } from './routers/article';
import { userRouter } from './routers/user';
import { searchRouter } from './routers/search';
import { adminRouter } from './routers/admin';

export const appRouter = createTRPCRouter({
  article: articleRouter,
  user: userRouter,
  search: searchRouter,
  admin: adminRouter,
  health: publicProcedure.query(() => ({ ok: true })),
});

export type AppRouter = typeof appRouter;
