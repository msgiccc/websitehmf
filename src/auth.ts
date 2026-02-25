import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { supabase } from '@/lib/supabase';
import { compare } from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                const { data: user, error } = await supabase
                    .from('User')
                    .select('*')
                    .eq('username', credentials.username as string)
                    .single();

                if (error || !user) {
                    throw new Error("Invalid username or password");
                }

                const isValid = await compare(credentials.password as string, user.password);

                if (!isValid) {
                    throw new Error("Invalid username or password");
                }

                return {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = (user as any).username;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                (session.user as any).username = token.username as string;
            }
            return session;
        },
    },
});
