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
                // Validasi input
                if (!credentials?.username || !credentials?.password) return null;

                try {
                    // Query user dari Supabase
                    const { data: user, error } = await supabase
                        .from('User')
                        .select('*')
                        .eq('username', credentials.username as string)
                        .single();

                    // Kembalikan null (bukan throw) agar NextAuth menampilkan
                    // error "CredentialsSignin" ke form, bukan redirect ke /api/auth/error
                    if (error || !user) return null;

                    // Cek password
                    const isValid = await compare(credentials.password as string, user.password);
                    if (!isValid) return null;

                    // Login berhasil
                    return {
                        id: user.id,
                        name: user.name,
                        username: user.username,
                    };
                } catch {
                    // Jika ada error (Supabase down, tabel belum ada, dll) — return null
                    return null;
                }
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
