import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware berjalan di Edge Runtime — tidak bisa menggunakan Node.js libs (bcryptjs, dll).
 * Proteksi dilakukan dengan cek cookie session NextAuth.
 * Double-protection ada di setiap server action via requireAdmin() di admin-actions.ts.
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Cek session cookie NextAuth (nama berbeda di http vs https)
    const sessionToken =
        request.cookies.get('next-auth.session-token') ||
        request.cookies.get('__Secure-next-auth.session-token');

    // Proteksi semua route /admin/*
    if (pathname.startsWith('/admin')) {
        if (!sessionToken) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Redirect ke /admin jika sudah login dan mencoba akses /login
    if (pathname === '/login' && sessionToken) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/login'],
};
