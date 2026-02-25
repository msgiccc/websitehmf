import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Hanya proteksi route /admin
    if (pathname.startsWith('/admin')) {
        // Check for session cookie (NextAuth session token)
        const sessionToken =
            request.cookies.get('next-auth.session-token') ||
            request.cookies.get('__Secure-next-auth.session-token');

        if (!sessionToken) {
            // Redirect ke halaman login jika tidak ada sesi
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    // Hanya jalankan middleware untuk /admin dan /login
    matcher: ['/admin/:path*', '/login'],
};
