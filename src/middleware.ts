import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export default NextAuth(authConfig).auth((req) => {
    // Middleware kosong penghubung Auth.js v5 pada Vercel App Router.
    // Ini menangkap dan meneruskan JWT Header ke Server Components dengan selamat.
});

// Jalankan middleware ini pada route selain aset statis/API
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
