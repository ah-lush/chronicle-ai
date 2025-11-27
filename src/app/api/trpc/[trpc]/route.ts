import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/api/root';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { Context } from '@/server/api/trpc';

const handler = async (req: Request) => {
  const supabase = await createServerSupabaseClient();

  // Get user session
  const { data: { session } } = await supabase.auth.getSession();

  // Get user profile if authenticated
  let auth: Context['auth'] = null;
  if (session) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    auth = {
      id: session.user.id,
      role: profile?.role ?? 'user',
    };
  }

  return fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req,
    createContext: (): Context => ({
      supabase,
      auth,
    }),
  });
};

export { handler as GET, handler as POST };
