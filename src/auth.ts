import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { supabase } from '@/lib/supabase';
import { compare } from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
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
                    const { data: user, error } = await supabase
                        .from('User')
                        .select('id, name, username, password')
                        .eq('username', credentials.username as string)
                        .single();

                    if (error || !user) return null;

                    const isValid = await compare(credentials.password as string, user.password);
                    if (!isValid) return null;

                    return {
                        id: user.id,
                        name: user.name,
                        username: user.username,
                    };
                } catch {
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
