import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
    // Exclude API routes, Next.js internals, and ALL static file types from middleware
    matcher: ['/((?!api|_next/static|_next/image|.*\\.(png|ico|svg|jpg|jpeg|gif|webp|css|js)$).*)'],
};
