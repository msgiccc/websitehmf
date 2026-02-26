'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        // Ekstrak nilai secara eksplisit dari FormData
        // (NextAuth v5 beta tidak selalu handle FormData dengan benar di production)
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        if (!username || !password) {
            return 'Username dan password harus diisi.';
        }

        await signIn('credentials', {
            username,
            password,
            redirectTo: '/admin',
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Username atau password salah.';
                default:
                    return 'Terjadi kesalahan saat login.';
            }
        }
        // Re-throw redirect errors agar Next.js bisa handle navigasi setelah login berhasil
        throw error;
    }
}
