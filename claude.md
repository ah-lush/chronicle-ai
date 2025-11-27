# Chronicle AI - Architecture Guide

> **Quick reference for Next.js + tRPC + Supabase architecture patterns**

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **API:** tRPC 11.7
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (@supabase/ssr)
- **State:** React Query (server) + Zustand (client UI)
- **UI:** shadcn/ui + Tailwind CSS v4
- **Validation:** Zod

---

## Architecture Pattern

### Hybrid Approach: tRPC + Edge Functions

| Use Case | Technology | Why |
|----------|-----------|-----|
| CRUD Operations | tRPC | Fast, type-safe, close to DB |
| AI Generation | Supabase Edge Functions | Heavy compute, globally distributed |
| Email Sending | Supabase Edge Functions | Bulk operations, non-blocking |
| Scheduled Jobs | pg_cron + Edge Functions | Database-triggered automation |

### Data Flow

```
CLIENT:  Component → tRPC Hook → Zustand Store
             ↓
SERVER:  tRPC Router → Service → Supabase Client
             ↓                      ↓
         Database            Edge Functions (AI/Email/Heavy Compute)
```

---

## Folder Structure

```
chronicle-ai/
├── supabase/                           # Supabase backend
│   ├── functions/                      # Edge functions (Deno)
│   │   ├── ai-image-gen/index.ts
│   │   ├── email-service/index.ts
│   │   └── _shared/cors.ts
│   ├── migrations/                     # SQL migrations
│   └── config.toml
│
├── src/
│   ├── app/                            # Next.js pages
│   │   ├── (auth)/                     # Auth pages
│   │   ├── (public)/                   # Public pages
│   │   ├── dashboard/                  # Protected pages
│   │   ├── api/trpc/[trpc]/route.ts   # tRPC endpoint
│   │   └── middleware.ts               # Auth middleware
│   │
│   ├── components/{feature}/           # React components
│   │   ├── auth/
│   │   ├── article/
│   │   ├── dashboard/
│   │   └── ui/                         # shadcn/ui
│   │
│   ├── server/
│   │   ├── api/
│   │   │   ├── trpc.ts                # tRPC config
│   │   │   ├── root.ts                # Main router
│   │   │   └── routers/{feature}.ts   # Feature routers
│   │   └── services/{feature}.service.ts  # Business logic
│   │
│   ├── lib/
│   │   ├── supabase/                  # 4 client types
│   │   │   ├── client.ts              # Browser
│   │   │   ├── server.ts              # Server components
│   │   │   ├── middleware.ts          # Middleware
│   │   │   └── admin.ts               # Service role
│   │   ├── trpc/client.ts
│   │   └── utils.ts
│   │
│   ├── hooks/use-{name}.ts            # Custom hooks
│   ├── store/{feature}.store.ts       # Zustand stores
│   └── types/
│       └── supabase.ts                # Auto-generated types
```

---

## File Path Rules

```typescript
// ✅ Components
/src/components/{feature}/{ComponentName}.tsx       // PascalCase

// ✅ tRPC Routers
/src/server/api/routers/{feature}.ts                // lowercase

// ✅ Services
/src/server/services/{feature}.service.ts           // lowercase + .service.ts

// ✅ Supabase Clients
/src/lib/supabase/{client|server|middleware|admin}.ts

// ✅ Zustand Stores
/src/store/{feature}.store.ts                       // lowercase + .store.ts

// ✅ Hooks
/src/hooks/use-{hook-name}.ts                       // kebab-case + use- prefix

// ✅ Types
/src/types/{feature}.ts                             // lowercase

// ✅ Edge Functions
/supabase/functions/{function-name}/index.ts        // kebab-case folder

// ✅ Migrations
/supabase/migrations/YYYYMMDDHHMMSS_description.sql
```

---

## Data Flow Patterns

### Pattern 1: CRUD (tRPC)
```
Component → tRPC Hook → Router → Service → Supabase → DB
```

```typescript
// Component
const { data } = trpc.article.getAll.useQuery({ page: 1 });

// Router
export const articleRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(({ ctx, input }) => articleService.getAll(ctx.supabase, input))
});

// Service
export const articleService = {
  async getAll(supabase: SupabaseClient, { page }) {
    const { data, error } = await supabase.from('articles').select();
    if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    return data;
  }
};
```

### Pattern 2: Heavy Compute (Edge Functions)
```
Component → tRPC Hook → Router → Service → Edge Function → External API
```

```typescript
// Component
const { mutate } = trpc.ai.generateImage.useMutation();

// Router
export const aiRouter = createTRPCRouter({
  generateImage: protectedProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(({ ctx, input }) => aiService.generate(ctx.supabase, input))
});

// Service
export const aiService = {
  async generate(supabase, { prompt }) {
    const { data } = await supabase.functions.invoke('ai-image-gen', {
      body: { prompt }
    });
    return data;
  }
};

// Edge Function (supabase/functions/ai-image-gen/index.ts)
serve(async (req) => {
  const { prompt } = await req.json();
  const image = await openai.images.generate({ prompt });
  return new Response(JSON.stringify({ url: image.url }));
});
```

### Pattern 3: Auth Flow
```
Login Form → Supabase Auth → Cookie → Middleware → tRPC Context
```

```typescript
// Login Component
const supabase = createClient();
await supabase.auth.signInWithPassword({ email, password });

// Middleware
export async function middleware(request: NextRequest) {
  const { supabase } = createMiddlewareClient(request);
  const { data: { session } } = await supabase.auth.getSession();

  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// tRPC Context
const { data: { session } } = await supabase.auth.getSession();
return {
  supabase,
  auth: session ? { id: session.user.id, role: session.user.user_metadata.role } : null
};
```

---

## Supabase Client Usage

```typescript
// Browser (client components)
import { createClient } from '@/lib/supabase/client';

// Server (server components, tRPC)
import { createServerClient } from '@/lib/supabase/server';

// Middleware (auth checks)
import { createMiddlewareClient } from '@/lib/supabase/middleware';

// Admin (edge function calls, background jobs)
import { createAdminClient } from '@/lib/supabase/admin';
```

---

## Quick Reference

### New Feature Checklist
1. Create migration: `supabase migration new {name}`
2. Generate types: `supabase gen types typescript > src/types/supabase.ts`
3. Create service: `/src/server/services/{feature}.service.ts`
4. Create router: `/src/server/api/routers/{feature}.ts`
5. Add to root router: `/src/server/api/root.ts`
6. Create component: `/src/components/{feature}/{Component}.tsx`

### Common Commands
```bash
npm run dev                          # Start dev server
supabase start                       # Start local Supabase
supabase migration new <name>        # Create migration
supabase gen types typescript        # Generate types
supabase functions deploy <name>     # Deploy edge function
```

### Best Practices
- ✅ Use Zod for all input validation
- ✅ Handle errors in services layer
- ✅ Use `protectedProcedure` for auth-required operations
- ✅ Enable RLS policies on all tables
- ✅ Paginate large result sets
- ✅ Use path aliases (`@/...`)
- ❌ Never use `any` type
- ❌ Never bypass auth checks
- ❌ Never swallow errors silently

---

## When to Use What

**tRPC:** Database queries, CRUD, auth operations
**Edge Functions:** AI generation, email sending, image processing, webhooks
**Zustand:** Client-side UI state (modals, preferences)
**React Query:** Server state (automatic via tRPC)

---

**Last Updated:** 2025-01-28
