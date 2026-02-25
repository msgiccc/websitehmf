import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-build-only-change-in-production',
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminRoute = nextUrl.pathname.startsWith('/admin');
            if (isAdminRoute) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn && nextUrl.pathname === '/login') {
                return Response.redirect(new URL('/admin', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
