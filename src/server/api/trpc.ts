import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';
import superjson from 'superjson';

interface Context {
  auth: { id: string; role: string } | null;
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.auth) {
    throw new Error('Unauthorized');
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

const isAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.auth || ctx.auth.role !== 'admin') {
    throw new Error('Forbidden');
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
export const adminProcedure = t.procedure.use(isAdmin);
