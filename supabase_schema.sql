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
