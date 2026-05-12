import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Hanya aktifkan proteksi jika environment variable VERCEL_ENV adalah production/preview
  // ATAU selalu aktifkan (saat ini selalu aktif untuk menahan pengunjung luar)
  
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  // Izinkan akses ke aset statis agar tampilan tidak rusak jika di bypass
  if (url.pathname.startsWith('/_next/') || url.pathname === '/favicon.ico') {
    return NextResponse.next();
  }

  // Cek apakah header authorization ada
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // === GANTI USERNAME DAN PASSWORD DI BAWAH INI ===
    if (user === 'admin' && pwd === 'hmf123') {
      return NextResponse.next(); // Lolos
    }
  }

  // Jika password salah atau belum memasukkan password
  return new NextResponse('Website HMF Sedang Dalam Mode Development. Silakan masukkan password.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Development Mode"',
    },
  });
}

export const config = {
  // Lindungi semua rute KECUALI file statis bawaan Next.js
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
