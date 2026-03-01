import { auth } from "@/auth";

export default auth((req) => {
    // Middleware kosong ini penting untuk NextAuth v5 di Vercel Edge.
    // Tanpa ini, React Server Components (seperti layout.tsx admin) 
    // sesudah `router.push()` sering gagal membaca Cookie Header hasil signIn() Client.
});

// Hanya jalankan middleware ini pada route admin dan auth
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
