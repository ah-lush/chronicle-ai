import { TRPCError } from "@trpc/server";
import type { Context } from "@/server/api/trpc";

export const authService = {
  async signUp(
    ctx: Context,
    data: {
      email: string;
      password: string;
      fullName?: string;
    }
  ) {
    const { data: authData, error } = await ctx.supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
        },
        emailRedirectTo: undefined,
      },
    });

    if (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: error.message,
      });
    }

    return authData;
  },

  async signIn(
    ctx: Context,
    data: {
      email: string;
      password: string;
    }
  ) {
    const { data: authData, error } =
      await ctx.supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

    if (error) {
      if (error.message === "Email not confirmed") {
        await ctx.supabase.auth.resend({
          type: "signup",
          email: data.email,
          options: {
            emailRedirectTo: undefined,
          },
        });

        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Email not confirmed",
        });
      }

      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: error.message,
      });
    }
    return authData;
  },

  async signOut(ctx: Context) {
    const { error } = await ctx.supabase.auth.signOut();

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }

    return { success: true };
  },

  async getProfile(ctx: Context, userId: string) {
    const { data, error } = await ctx.supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Profile not found",
      });
    }

    return data;
  },

  async updateProfile(
    ctx: Context,
    userId: string,
    data: {
      fullName?: string;
      avatarUrl?: string;
    }
  ) {
    const { data: profile, error } = await ctx.supabase
      .from("profiles")
      .update({
        full_name: data.fullName,
        avatar_url: data.avatarUrl,
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }

    return profile;
  },

  async resetPassword(ctx: Context, email: string) {
    const { error } = await ctx.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`,
    });

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }

    return { success: true };
  },

  async verifyOtp(
    ctx: Context,
    data: {
      email: string;
      token: string;
      type: "signup" | "email" | "recovery";
    }
  ) {
    const { data: authData, error } = await ctx.supabase.auth.verifyOtp({
      email: data.email,
      token: data.token,
      type: data.type,
    });

    if (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: error.message,
      });
    }

    return authData;
  },

  async resendOtp(
    ctx: Context,
    data: {
      email: string;
      type: "signup" | "recovery";
    }
  ) {
    if (data.type === "recovery") {
      const { error } = await ctx.supabase.auth.resetPasswordForEmail(
        data.email,
        {
          redirectTo: undefined,
        }
      );
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    } else {
      const { error } = await ctx.supabase.auth.resend({
        type: "signup",
        email: data.email,
        options: {
          emailRedirectTo: undefined,
        },
      });
      if (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error.message,
        });
      }
    }

    return { success: true };
  },
};
