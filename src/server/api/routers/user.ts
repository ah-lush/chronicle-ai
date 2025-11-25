import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';
import { mockUsers } from '@/lib/mock-data';

export const userRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const user = mockUsers.find((u) => u.id === input.id);
      if (!user) throw new Error('User not found');
      return user;
    }),

  getProfile: protectedProcedure.query(({ ctx }) => {
    const user = mockUsers.find((u) => u.id === ctx.auth.id);
    if (!user) throw new Error('User not found');
    return user;
  }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        bio: z.string().optional(),
        avatar: z.string().url().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      const user = mockUsers.find((u) => u.id === ctx.auth.id);
      if (!user) throw new Error('User not found');

      return {
        ...user,
        ...input,
        updatedAt: new Date(),
      };
    }),
});
