import type { NextAuthConfig } from 'next-auth';

// Config minimal untuk middleware (edge-safe, tanpa bcryptjs/supabase)
export const authConfig = {
    pages: {
        signIn: '/login',
    },
    providers: [],
} satisfies NextAuthConfig;
