# Deployment Guide HMF FPMIPA UPI

Situs Next.js ini sudah siap untuk di-deploy ke Vercel atau Hosting Node.js pilihan Anda.

## Persyaratan Lingkungan (Environment Variables)
Anda wajib mengatur environment di server tujuan (misal di Settings Vercel) secara sama persis dengan yang ada di `.env` lokal:

```env
# Supabase Public Keys
NEXT_PUBLIC_SUPABASE_URL="https://nzhguanewxobdpehrixb.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."

# Authentication NEXT AUTH (Wajib diisi di Production)
NEXTAUTH_SECRET="supersecret_hmf_website_token_123_ganti_ini_di_prod"
NEXTAUTH_URL="https://URL-DOMAIN-ANDA.com"
```

## Cara Deploy ke Vercel
Vercel adalah cara paling mudah untuk meng-hosting project Next.js.
1. Buat akun di [Vercel](https://vercel.com).
2. Install Vercel CLI via terminal (langkah opsional jika ingin dari CLI): `npm i -g vercel`
3. Jalankan `vercel` di dalam folder project ini.
4. Atau, hubungkan akun GitHub Anda ke Vercel dan *import* repository ini dari dashboard Web Vercel.  
5. Pada saat proses *import*, pastikan Anda menyalin Keys dari instruksi di atas ke dalam menu "Environment Variables" sebelum menekan tombol "Deploy".

## Mengubah Password Default Admin
Saat ini password admin default (username: `admin`, password: `adminpassword`) di-_seed_ secara manual di tabel SQL. Jika Anda sudah deploy, harap masuk ke dashboard **Supabase** -> **Table Editor** -> **Users** lalu atur password baru yang sudah di-*hash bcrypt*. Atau, Anda bisa mencabut fungsi seed SQL tersebut dan menggunakan sistem registrasi internal jika diperlukan di kemudian hari.

## Konfigurasi Fitur Image Upload Lanjutan (Phase Berikutnya)
Saat ini sistem CMS menggunakan Mock Image Array (URL Placeholder). Untuk penggunaan Production, Anda disarankan untuk menghubungkan fungsi `uploadImage` (pada file `src/lib/upload.ts`) dengan **Supabase Storage** bucket. 
