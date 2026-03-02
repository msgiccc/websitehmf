import { NextResponse } from 'next/server';
import { getShortLinkBySlug } from '@/lib/data';
import { incrementShortLinkClick } from '@/lib/admin-actions';

// Ini akan menangkap semua request root level yang bukan berupa folder route statis (seperti /kabinet, /login, dll)
export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    // 1. Cari tautan pendek di database
    const shortlink = await getShortLinkBySlug(slug);

    if (shortlink) {
        // 2. Jika ketemu, increment jumlah_klik tanpa me-block response (fire and forget)
        incrementShortLinkClick(shortlink.id).catch(console.error);

        // 3. Redirect ke URL tujuan asli. (307 Temporary Redirect agar analytic browser tidak menge-cache redirect)
        return NextResponse.redirect(shortlink.url_asli, 307);
    }

    // Jika masuk ke sini tapi bukan shortlink (misal salah ketik URL root), 
    // arahkan secara halus kembali ke halaman utama atau halaman 404
    // NEXT.JS otomatis menangani ini jika ada not-found.tsx, tetapi untuk Route Handler kita panggil URL root.
    return NextResponse.redirect(new URL('/', request.url));
}
