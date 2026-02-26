import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
    // Coba AUTH_SECRET (NextAuth v5 default) lalu NEXTAUTH_SECRET (compat)
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? 'fallback-change-in-prod',
    trustHost: true,
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    providers: [
        Credentials({
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                try {
                    // Dynamic import agar tidak crash saat module di-load di edge/serverless
                    const { createClient } = await import('@supabase/supabase-js');
                    const { compare } = await import('bcryptjs');

                    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
                    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

                    if (!supabaseUrl || !supabaseKey) {
                        console.error('[auth] Supabase env vars not set');
                        return null;
                    }

                    const client = createClient(supabaseUrl, supabaseKey);

                    const { data: user, error } = await client
                        .from('User')
                        .select('id, name, username, password')
                        .eq('username', credentials.username as string)
                        .single();

                    if (error || !user) {
                        console.error('[auth] User not found:', error?.message);
                        return null;
                    }

                    const isValid = await compare(credentials.password as string, user.password);

                    if (!isValid) {
                        console.error('[auth] Invalid password');
                        return null;
                    }

                    console.log('[auth] Login success:', user.username);
                    return {
                        id: user.id,
                        name: user.name,
                        username: user.username,
                    };
                } catch (err) {
                    console.error('[auth] authorize error:', err);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = (user as any).username;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                (session.user as any).username = token.username as string;
            }
            return session;
        },
    },
});
