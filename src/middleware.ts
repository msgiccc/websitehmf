import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// Gunakan NextAuth middleware untuk memvalidasi session JWT secara proper
export default NextAuth(authConfig).auth;

export const config = {
    // Proteksi semua route /admin/* dan redirect dari /login jika sudah login
    matcher: ['/admin/:path*', '/login'],
};
