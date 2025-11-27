import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '@/server/api/trpc';
import { authService } from '@/server/services/auth.service';

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        fullName: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => authService.signUp(ctx, input)),

  signIn: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(({ ctx, input }) => authService.signIn(ctx, input)),

  signOut: protectedProcedure
    .mutation(({ ctx }) => authService.signOut(ctx)),

  getProfile: protectedProcedure
    .query(({ ctx }) => authService.getProfile(ctx, ctx.auth.id)),

  updateProfile: protectedProcedure
    .input(
      z.object({
        fullName: z.string().optional(),
        avatarUrl: z.string().url().optional(),
      })
    )
    .mutation(({ ctx, input }) => authService.updateProfile(ctx, ctx.auth.id, input)),

  resetPassword: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(({ ctx, input }) => authService.resetPassword(ctx, input.email)),

  verifyOtp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        token: z.string().min(6).max(8),
        type: z.enum(['signup', 'email', 'recovery']),
      })
    )
    .mutation(({ ctx, input }) => authService.verifyOtp(ctx, input)),

  resendOtp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        type: z.enum(['signup', 'recovery']),
      })
    )
    .mutation(({ ctx, input }) => authService.resendOtp(ctx, input)),
});
