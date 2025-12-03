import { appRouter } from '@/server/api/root';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const createCaller = async () => {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  return appRouter.createCaller({
    supabase,
    auth: session ? {
      id: session.user.id,
      role: session.user.user_metadata?.role ?? 'user'
    } : null,
  });
};
