-- =============================================
-- HMF FPMIPA UPI - FULL DATABASE SETUP SCRIPT
-- Jalankan SELURUH script ini di Supabase SQL Editor
-- =============================================

-- Enable pgcrypto untuk hashing password
CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- =============================================
-- TABEL 1: User (Admin Login)
-- =============================================
CREATE TABLE IF NOT EXISTS "public"."User" (
    "id"        uuid DEFAULT gen_random_uuid() NOT NULL,
    "name"      text NOT NULL,
    "username"  text NOT NULL UNIQUE,
    "password"  text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY ("id")
);


-- =============================================
-- TABEL 2: Kabinet (Info Kabinet Aktif)
-- =============================================
CREATE TABLE IF NOT EXISTS "public"."Kabinet" (
    "id"          uuid DEFAULT gen_random_uuid() NOT NULL,
    "namaKabinet" text NOT NULL,
    "periode"     text NOT NULL,
    "logoUrl"     text NOT NULL DEFAULT '/niskala.png',
    "visi"        text NOT NULL,
    "misi"        text NOT NULL,
    "isAktif"     boolean DEFAULT true NOT NULL,
    "createdAt"   timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY ("id")
);


-- =============================================
-- TABEL 3: Pengurus
-- =============================================
CREATE TABLE IF NOT EXISTS "public"."Pengurus" (
    "id"           uuid DEFAULT gen_random_uuid() NOT NULL,
    "nama"         text NOT NULL,
    "npm"          text NOT NULL,
    "jabatan"      text NOT NULL,
    "divisi"       text NOT NULL,
    "angkatan"     text NOT NULL,
    "fotoUrl"      text NOT NULL,
    "linkedinUrl"  text,
    "instagramUrl" text,
    PRIMARY KEY ("id")
);


-- =============================================
-- TABEL 4: Artikel
-- =============================================
CREATE TYPE "public"."StatusArtikel" AS ENUM ('DRAFT', 'PUBLISHED');

CREATE TABLE IF NOT EXISTS "public"."Artikel" (
    "id"        uuid DEFAULT gen_random_uuid() NOT NULL,
    "judul"     text NOT NULL,
    "slug"      text NOT NULL UNIQUE,
    "ringkasan" text NOT NULL,
    "konten"    text NOT NULL,
    "thumbnail" text NOT NULL,
    "author"    text NOT NULL,
    "status"    "public"."StatusArtikel" DEFAULT 'DRAFT' NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY ("id")
);


-- =============================================
-- TABEL 5: ProgramKerja
-- Kolom "bidang" berisi id dari KATEGORI_PROGRAM:
--   lembaga-kesekretariatan, lembaga-keuangan,
--   bidang-akademik, bidang-ekonomi-dan-bisnis,
--   bidang-kaderisasi, bidang-kerohanian,
--   bidang-komunikasi-dan-media-informasi,
--   bidang-penelitian-dan-pengembangan,
--   bidang-pengembangan-minat-dan-bakat,
--   bidang-sosial-dan-politik
-- =============================================
CREATE TYPE "public"."StatusProker" AS ENUM ('PLANNING', 'ONGOING', 'COMPLETED');

CREATE TABLE IF NOT EXISTS "public"."ProgramKerja" (
    "id"                 uuid DEFAULT gen_random_uuid() NOT NULL,
    "nama"               text NOT NULL,
    "deskripsi"          text NOT NULL,
    "status"             "public"."StatusProker" DEFAULT 'PLANNING' NOT NULL,
    "bidang"             text NOT NULL DEFAULT 'lembaga-kesekretariatan',
    PRIMARY KEY ("id")
);


-- =============================================
-- TABEL 6: BidangLembaga
-- =============================================
CREATE TABLE IF NOT EXISTS "public"."BidangLembaga" (
    "slug"       text NOT NULL,
    "name"       text NOT NULL,
    "shortName"  text NOT NULL,
    "desc"       text NOT NULL,
    "icon"       text NOT NULL,
    "color"      text NOT NULL,
    PRIMARY KEY ("slug")
);

-- =============================================
-- TABEL 7: Galeri
-- =============================================
CREATE TYPE "public"."KategoriGaleri" AS ENUM ('KEGIATAN', 'PRESTASI');

CREATE TABLE IF NOT EXISTS "public"."Galeri" (
    "id"        uuid DEFAULT gen_random_uuid() NOT NULL,
    "judul"     text NOT NULL,
    "imageUrl"  text NOT NULL,
    "kategori"  "public"."KategoriGaleri" NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY ("id")
);


-- =============================================
-- SEED: Admin Default
-- Username: admin | Password: password123
-- Hash dibuat dengan bcrypt (bf = blowfish) rounds=12
-- Compatible dengan bcryptjs di Node.js
-- =============================================
INSERT INTO "public"."User" ("name", "username", "password")
VALUES (
    'Administrator',
    'admin',
    crypt('password123', gen_salt('bf', 12))
)
ON CONFLICT ("username") DO NOTHING;


-- =============================================
-- SEED: Data Kabinet Niskala Cakra Murni
-- (Bisa diubah nanti dari admin dashboard)
-- =============================================
INSERT INTO "public"."Kabinet" ("namaKabinet", "periode", "logoUrl", "visi", "misi", "isAktif")
VALUES (
    'Niskala Cakra Murni',
    '2025/2026',
    '/niskala.png',
    'Mewujudkan HMF FPMIPA UPI sebagai himpunan yang MURNI — Mantap dalam karakter, Unggul dalam prestasi, Religius dalam nilai, Nyata dalam kontribusi, dan Inovatif dalam gerakan.',
    'Memperkuat solidaritas dan kebersamaan seluruh warga fisika sebagai pondasi gerak bersama.
Meningkatkan kualitas akademik dan pengembangan diri anggota melalui program yang terstruktur.
Menumbuhkan jiwa kepemimpinan dan kaderisasi yang berkelanjutan.
Membangun relasi internal dan eksternal yang harmonis untuk memperluas jaringan himpunan.
Mewujudkan transparansi dan akuntabilitas dalam pengelolaan organisasi.',
    true
)
ON CONFLICT DO NOTHING;


-- =============================================
-- SEED: Sample Pengurus (bisa dihapus setelah input data asli)
-- =============================================
INSERT INTO "public"."Pengurus" ("nama", "npm", "jabatan", "divisi", "angkatan", "fotoUrl", "linkedinUrl", "instagramUrl")
VALUES
    ('Mahendra Putra',   '2100123', 'Ketua Himpunan',       'Pimpinan',                              '2021', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Mahendra&backgroundColor=transparent', '', ''),
    ('Alya Rahma',       '2200456', 'Wakil Ketua Himpunan', 'Pimpinan',                              '2022', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Alya&backgroundColor=transparent', '', ''),
    ('Gilang Baskara',   '2101003', 'Ketua',                'Lembaga Kesekretariatan',               '2021', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Gilang&backgroundColor=transparent', '', ''),
    ('Nadia Saphira',    '2201004', 'Staff',                'Lembaga Kesekretariatan',               '2022', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Nadia&backgroundColor=transparent', '', ''),
    ('Reza Rahadian',    '2101005', 'Ketua',                'Lembaga Keuangan',                      '2021', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Reza&backgroundColor=transparent', '', ''),
    ('Iqbaal Ramadhan',  '2101007', 'Ketua Bidang',         'Bidang Akademik',                       '2021', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Iqbaal&backgroundColor=transparent', '', ''),
    ('Angga Yunanda',    '2101009', 'Ketua Bidang',         'Bidang Ekonomi dan Bisnis',             '2021', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Angga&backgroundColor=transparent', '', ''),
    ('Dian Sastro',      '2101011', 'Ketua Bidang',         'Bidang Kaderisasi',                     '2021', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Dian&backgroundColor=transparent', '', ''),
    ('Chelsea Islan',    '2101013', 'Ketua Bidang',         'Bidang Kerohanian',                     '2021', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Chelsea&backgroundColor=transparent', '', ''),
    ('Tara Basro',       '2101014', 'Ketua Bidang',         'Bidang Komunikasi dan Media Informasi', '2021', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Tara&backgroundColor=transparent', '', ''),
    ('Arya Saloka',      '2201015', 'Staff Bidang',         'Bidang Komunikasi dan Media Informasi', '2022', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Arya&backgroundColor=transparent', '', ''),
    ('Amanda Manopo',    '2101016', 'Ketua Bidang',         'Bidang Penelitian dan Pengembangan',    '2021', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Amanda&backgroundColor=transparent', '', ''),
    ('Jefri Nichol',     '2101017', 'Ketua Bidang',         'Bidang Pengembangan Minat dan Bakat',   '2021', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jefri&backgroundColor=transparent', '', ''),
    ('Aghniny Haque',    '2101018', 'Ketua Bidang',         'Bidang Sosial dan Politik',             '2021', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Aghniny&backgroundColor=transparent', '', '');


-- =============================================
-- SEED: Sample Artikel
-- =============================================
INSERT INTO "public"."Artikel" ("judul", "slug", "ringkasan", "konten", "thumbnail", "author", "status")
VALUES (
    'Selamat Datang di Website HMF FPMIPA UPI',
    'selamat-datang-hmf-fpmipa-upi',
    'Website resmi Himpunan Mahasiswa Fisika FPMIPA UPI kini hadir dengan tampilan baru yang lebih modern dan informatif.',
    'Himpunan Mahasiswa Fisika (HMF) FPMIPA UPI dengan bangga memperkenalkan website resmi yang telah diperbarui. Website ini menjadi pusat informasi bagi seluruh warga fisika UPI untuk mengakses berita, program kerja, dan berbagai kegiatan himpunan.

Melalui website ini, kami berkomitmen untuk menyajikan informasi yang akurat, transparan, dan mudah diakses oleh seluruh civitas akademika Departemen Pendidikan Fisika FPMIPA UPI.

Selamat menjelajahi website kami!',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop',
    'Tim Kominfo HMF',
    'PUBLISHED'
)
ON CONFLICT ("slug") DO NOTHING;


-- =============================================
-- SEED: Sample Program Kerja (per bidang)
-- =============================================
INSERT INTO "public"."ProgramKerja" ("nama", "deskripsi", "status", "bidang")
VALUES
    -- Lembaga Kesekretariatan
    ('Pembaruan Basis Data Mahasiswa Aktif',
     'Pengumpulan dan pembaruan data identitas lengkap mahasiswa aktif 4 angkatan Departemen Pendidikan Fisika.',
     'ONGOING', 'lembaga-kesekretariatan'),

    ('Pembuatan Kalender dan Timeline Program Kerja',
     'Pengumpulan dan publikasi tanggal pelaksanaan program kerja tiap bidang/lembaga setiap bulannya.',
     'COMPLETED', 'lembaga-kesekretariatan'),

    -- Lembaga Keuangan
    ('Perancangan Anggaran HMF (RAPBO)',
     'Pembuatan Rancangan Anggaran Pendapatan dan Belanja Organisasi untuk semua program kerja.',
     'COMPLETED', 'lembaga-keuangan'),

    -- Bidang Akademik
    ('Phyfest (Physics Festival)',
     'Program wadah pengembangan potensi keilmuan di bidang fisika melalui perlombaan, webinar, dan informasi keilmuan.',
     'PLANNING', 'bidang-akademik'),

    ('BEARR (Bank Soal, E-book, Aplikasi, Responsi, Referensi)',
     'Memfasilitasi mahasiswa dalam memperoleh ilmu dan memperluas wawasan perkuliahan melalui bank soal dan referensi belajar.',
     'ONGOING', 'bidang-akademik'),

    -- Bidang Ekonomi dan Bisnis
    ('Dana Usaha',
     'Kegiatan danus harian, bulanan, dan impuls (Instagram, e-commerce, pulsa) untuk pemasukan dana non-IUK.',
     'ONGOING', 'bidang-ekonomi-dan-bisnis'),

    -- Bidang Kaderisasi
    ('Restitusi (Registrasi untuk Silaturrahmi)',
     'Kegiatan silaturahmi antara mahasiswa baru dengan panitia dan antar sesama mahasiswa baru angkatan baru.',
     'PLANNING', 'bidang-kaderisasi'),

    ('MABIM (Masa Bimbingan)',
     'Kegiatan bimbingan dan pematerian bagi anggota muda oleh mentor dan pemateri yang ditunjuk.',
     'PLANNING', 'bidang-kaderisasi'),

    -- Bidang Kerohanian
    ('AQUR (Amalan Qur''an)',
     'Program membaca, memahami, dan mengamalkan Al-Qur''an bersama melalui BucinQu dan Jumat Berkah.',
     'ONGOING', 'bidang-kerohanian'),

    -- Bidang Komunikasi dan Media Informasi
    ('Media Desain',
     'Mengolah informasi menjadi multimedia yang menarik untuk disebarluaskan kepada warga fisika dan khalayak umum.',
     'ONGOING', 'bidang-komunikasi-dan-media-informasi'),

    ('Content Creator',
     'Tim YouTube dan TikTok HMF FPMIPA UPI yang bertugas membuat konten kreatif di platform digital.',
     'ONGOING', 'bidang-komunikasi-dan-media-informasi'),

    -- Bidang Penelitian dan Pengembangan
    ('Monitoring dan Evaluasi (MONEV)',
     'Pengumpulan informasi dan analisis kinerja seluruh pengurus HMF secara dua arah melalui format penilaian.',
     'PLANNING', 'bidang-penelitian-dan-pengembangan'),

    -- Bidang Pengembangan Minat dan Bakat
    ('Polarisasi (Pekan Olahraga dan Seni Fisika Bumi Siliwangi)',
     'Kompetisi seni dan olahraga untuk warga mahasiswa pendidikan fisika dan fisika UPI.',
     'PLANNING', 'bidang-pengembangan-minat-dan-bakat'),

    -- Bidang Sosial dan Politik
    ('Advokesma (Advokasi Kesma)',
     'Program membantu mahasiswa dalam masalah Akademik, Keuangan, serta pelayanan Informasi Beasiswa.',
     'ONGOING', 'bidang-sosial-dan-politik'),

    ('Fisika Mengabdi',
     'Kegiatan pemberdayaan masyarakat di daerah tertentu sebagai wujud kontribusi nyata warga fisika.',
     'PLANNING', 'bidang-sosial-dan-politik');


-- =============================================
-- SEED: Sample Galeri
-- =============================================
INSERT INTO "public"."Galeri" ("judul", "imageUrl", "kategori")
VALUES
    ('Pekan Olahraga Mahasiswa HMF',
     'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop',
     'KEGIATAN'),
    ('Juara 1 Olimpiade Fisika Nasional',
     'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&auto=format&fit=crop',
     'PRESTASI'),
    ('Malam Keakraban Kabinet Niskala',
     'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&auto=format&fit=crop',
     'KEGIATAN'),
    ('Mahasiswa Berprestasi Departemen Fisika',
     'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop',
     'PRESTASI');


-- =============================================
-- SELESAI
-- Login admin: username=admin, password=password123
-- Ganti data sample dengan data asli dari admin dashboard!
-- =============================================
- -   = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =  
 - -   T A B E L   8 :   P r o f i l  
 - -   = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =  
 C R E A T E   T A B L E   I F   N O T   E X I S T S   " p u b l i c " . " P r o f i l "   (  
         " i d "                                   u u i d   D E F A U L T   g e n _ r a n d o m _ u u i d ( )   N O T   N U L L ,  
         " s e j a r a h _ p 1 "                   t e x t   N O T   N U L L ,  
         " s e j a r a h _ p 2 "                   t e x t   N O T   N U L L ,  
         " s e j a r a h _ c a r d 1 "             t e x t   N O T   N U L L ,  
         " s e j a r a h _ c a r d 2 "             t e x t   N O T   N U L L ,  
         " l a m b a n g _ d e s c "               t e x t   N O T   N U L L ,  
         " l a m b a n g _ t u l i s a n "         t e x t   N O T   N U L L ,  
         " l a m b a n g _ m a h k o t a "         t e x t   N O T   N U L L ,  
         " l a m b a n g _ l i n g k a r a n "     t e x t   N O T   N U L L ,  
         " l a m b a n g _ s a y a p "             t e x t   N O T   N U L L ,  
         " l a m b a n g _ e l e k t r o n "       t e x t   N O T   N U L L ,  
         " l a m b a n g _ s e g i t i g a "       t e x t   N O T   N U L L ,  
         " w a r n a _ b i r u "                   t e x t   N O T   N U L L ,  
         " w a r n a _ m e r a h "                 t e x t   N O T   N U L L ,  
         " w a r n a _ p u t i h "                 t e x t   N O T   N U L L ,  
         " m a r s _ c i p t a a n "               t e x t   N O T   N U L L ,  
         " m a r s _ l i r i k "                   t e x t   N O T   N U L L ,  
         " h y m n e _ c i p t a a n "             t e x t   N O T   N U L L ,  
         " h y m n e _ l i r i k "                 t e x t   N O T   N U L L ,  
         " i s A k t i f "                         b o o l e a n   D E F A U L T   t r u e   N O T   N U L L ,  
         P R I M A R Y   K E Y   ( " i d " )  
 ) ;  
  
 - -   H a p u s   d u m m y   s e b e l u m n y a   j i k a   a d a   d u p l i k a t   a g a r   r a p i   ( j i k a   m a u )  
 - -   D E L E T E   F R O M   " p u b l i c " . " P r o f i l " ;  
  
 I N S E R T   I N T O   " p u b l i c " . " P r o f i l "   (  
         " s e j a r a h _ p 1 " ,   " s e j a r a h _ p 2 " ,   " s e j a r a h _ c a r d 1 " ,   " s e j a r a h _ c a r d 2 " ,  
         " l a m b a n g _ d e s c " ,   " l a m b a n g _ t u l i s a n " ,   " l a m b a n g _ m a h k o t a " ,   " l a m b a n g _ l i n g k a r a n " ,   " l a m b a n g _ s a y a p " ,   " l a m b a n g _ e l e k t r o n " ,   " l a m b a n g _ s e g i t i g a " ,  
         " w a r n a _ b i r u " ,   " w a r n a _ m e r a h " ,   " w a r n a _ p u t i h " ,  
         " m a r s _ c i p t a a n " ,   " m a r s _ l i r i k " ,   " h y m n e _ c i p t a a n " ,   " h y m n e _ l i r i k "  
 )   V A L U E S   (  
         ' H i m p u n a n   M a h a s i s w a   F i s i k a   y a n g   s e k a r a n g   d i k e n a l   t e r n y a t a   m e m i l i k i   s e j a r a h   y a n g   m e n a r i k   d a n   p a t u t   k i t a   k e t a h u i .   T a n g g a l   p a s t i   b e r d i r i n y a   m a s i h   d a l a m   p e m b i c a r a a n ,   n a m u n   d a r i   b e b e r a p a   s u m b e r   d a n   a l u m n i   m a k a   s e j a r a h   s i n g k a t   b e r d i r i n y a   H M F   a d a l a h   s e b a g a i   b e r i k u t . ' ,  
         ' H i m p u n a n   p e r t a m a   k a l i   l a h i r   d i l a t a r   b e l a k a n g i   o l e h   s e k u m p u l a n   m a h a s i s w a   f i s i k a   y a n g   m e l a k s a n a k a n   a k t i f i t a s   p o s i t i f   s e l a i n   a k t i f i t a s   k u l i a h .   D a r i   b e b e r a p a   p e m i k i r a n ,   a k h i r n y a   d i b e n t u k l a h   s e b u a h   w a d a h   y a n g   d i s e b u t   P e r s a t u a n   M a h a s i s w a   F i s i k a   y a n g   d i s i n g k a t   P E R M A F   p a d a   t a n g g a l   3 0   J u n i   1 9 5 4 .   O r g a n i s a s i   i n i   m e m i l i k i   t u j u a n   y a n g   m u l i a   y a i t u   u n t u k   m e w a d a h i   m a h a s i s w a   f i s i k a   d a n   m e m b a n t u   m a h a s i s w a   f i s i k a   b a i k   d a l a m   b i d a n g   a k a d e m i k   m a u p u n   s o s i a l . ' ,  
         ' D a r i   t a h u n - k e t a h u n   o r g a n i s a s i   i n i   m e n u n j u k k a n   e k s i s t e n s i n y a   s e b a g a i   o r g a n i s a s i   y a n g   l a h i r   d a r i   p e n j e l m a a n   a s p i r a s i   m a h a s i s w a   d a n   m e l a k s a n a k a n   k e g i a t a n   u n t u k   m a h a s i s w a .   A k h i r n y a   d a r i   P E R M A F   b e r u b a h   n a m a   m e n j a d i   * H i m p u n a n   M a h a s i s w a   F i s i k a   J u r u s a n   P e n d i d i k a n   F i s i k a *   d a n   a k h i r n y a   b e r u b a h   l a g i   m e n j a d i   * H i m p u n a n   M a h a s i s w a   F i s i k a *   y a n g   d i s i n g k a t   m e n j a d i   * H M F * .   H M F   F P M I P A   U P I   m e n j a d i   s a l a h   s a t u   h i m p u n a n   y a n g   e k s i s   b e r j u a n g   u n t u k   m a h a s i s w a   d a n   i t u   d i b u k t i k a n   s a m p a i   s e k a r a n g . ' ,  
         ' U n t u k   m e n g e t a h u i   p e r k e m b a n g a n   H M F   F P M I P A   U P I   m a s a   k i n i ,   d a p a t   d i l i h a t   m e l a l u i   w e b s i t e   d a n   a k u n   m e d i a   s o s i a l   a k t i f n y a .   T e r m a s u k   p r o f i l   k a b i n e t   t e r b a r u k a n   d a p a t   d i l i h a t   d i   m e n u   n a v i g a s i   b a g i a n   a t a s   w e b s i t e   i n i . ' ,  
         ' L a m b a n g   H M F   F P M I P A   U P I   t e r d i r i   d a r i   b e r b a g a i   b a g i a n   y a n g   m e m p u n y a i   m a k s u d   s e b a g a i   b e r i k u t   : ' ,  
         ' T u l i s a n   H i m p u n a n   M a h a s i s w a   F i s i k a   F P M I P A   U P I   d a n   s i n g k a t a n   H M F   d a l a m   l i n g k a r a n   b i r u   m e n u n j u k a n   n a m a   o r g a n i s a s i . ' ,  
         ' M a h k o t a   s e g i l i m a   w a r n a   p u t i h   b e r t e p i k a n   b i r u   p a d a   b e n t u k   l u a r   m e l a m b a n g k a n   m e n j a l a n k a n   k e g i a t a n   b e r d a s a r k a n   P a n c a s i l a ,   U U D   1 9 4 5 ,   s e r t a   T r i d h a r m a   P T . ' ,  
         ' M e m p u n y a i   a r t i   b a h w a   k e g i a t a n   b e r l a n d a s k a n   a s a s   k e k e l u a r g a a n ,   s e g a l a   a s p e k   p e m e c a h a n   m a s a l a h   d i s e l e s a i k a n   s e c a r a   m u s y a w a r a h   m u f a k a t . ' ,  
         ' B e r w a r n a   p u t i h   b e r a r t i   m e m i l i k i   b i d a n g - b i d a n g   d e n g a n   t u g a s n y a   m a s i n g - m a s i n g   a k a n   t e t a p i   s a l i n g   m e m b a n t u   m e n c a p a i   t u j u a n . ' ,  
         ' B e r a r t i   H M F   m e m i l i k i   s i f a t   d i n a m i s   d a n   a k t i f   s e s u a i   d e n g a n   p e r a t u r a n   d a n   h u k u m   y a n g   b e r l a k u   d a n   d a p a t   d i p e r t a n g g u n g j a w a b k a n . ' ,  
         ' M e n g a r a h   k e   b a w a h   b e r a r t i   H M F   m e m i l i k i   d a s a r   y a n g   k u a t   d e n g a n   a k a r   y a n g   k o k o h   s e h i n g g a   m a n t a p   w a l a u p u n   m e n d a p a t   t a n t a n g a n . ' ,  
         ' H M F   d i j i w a i   s e m a n g a t   p e n g a b d i a n   y a n g   t i n g g i   u n t u k   m e n c a p a i   t u j u a n   m u l i a . ' ,  
         ' B e r a r t i   H M F   F P M I P A   U P I   m e m i l i k i   e n e r g i   y a n g   s a n g a t   b e s a r   s e b a g a i   m o d a l   d a l a m   b e r a k t i f i t a s . ' ,  
         ' M e m i l i k i   k e r a g a m a n   p o t e n s i   a n g g o t a   y a n g   b e r p a d u   u n t u k   m e n c a p a i   t u j u a n   o r g a n i s a s i   y a n g   s a m a . ' ,  
         ' D o n i   N u r d i a n s y a h ' ,  
         ' K i b a r k a n   b a k t i   d i   j i w a \ n M e m b a n g u n   H M F   t e r c i n t a \ n S e m a n g a t k a n   t e k a d   d i h a t i \ n U n t u k   f i s i k a   U P I \ n \ n A y o   b e r g e r a k \ n A y o   m e m b a n g u n \ n W u j u d k a n   c i t a   c i n t a   m u   u n t u k   f i s i k a \ n B u l a t k a n   h a t i   t u k   r a i h   p r e s t a s i \ n B e r s a m a   d i   f i s i k a   U P I ' ,  
         ' D o n i   N u r d i a n s y a h ' ,  
         ' F i s i k a   b u m i   s i l i w a n g i \ n T e m p a t   k u   b e r n a u n g   d a n   b e r d i r i \ n C e r a h k a n   n e g e r i   b a k t i   i b u   p e r t i w i \ n F i s i k a   j a y a l a h   d i h a t i \ n \ n F i s i k a   b u m i   s i l i w a n g i \ n T e m p a t k u   m e r a i h   p r e s t a s i \ n K i b a r k a n   p a n j i   h a r u m k a n   n e g e r i \ n F i s i k a   J a y a l a h   d i   h a t i '  
 ) ;  
 