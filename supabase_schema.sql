-- HMF Website Database Schema

-- Users / Admin
CREATE TABLE "public"."User" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "name" text NOT NULL,
    "username" text NOT NULL UNIQUE,
    "password" text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY ("id")
);

-- Pengurus
CREATE TABLE "public"."Pengurus" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "nama" text NOT NULL,
    "npm" text NOT NULL,
    "jabatan" text NOT NULL,
    "divisi" text NOT NULL,
    "angkatan" text NOT NULL,
    "fotoUrl" text NOT NULL,
    "linkedinUrl" text,
    "instagramUrl" text,
    PRIMARY KEY ("id")
);

-- Artikel
CREATE TYPE "public"."StatusArtikel" AS ENUM ('DRAFT', 'PUBLISHED');

CREATE TABLE "public"."Artikel" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "judul" text NOT NULL,
    "slug" text NOT NULL UNIQUE,
    "ringkasan" text NOT NULL,
    "konten" text NOT NULL,
    "thumbnail" text NOT NULL,
    "author" text NOT NULL,
    "status" "public"."StatusArtikel" DEFAULT 'DRAFT'::"public"."StatusArtikel" NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY ("id")
);

-- Program Kerja
-- CATATAN: Kolom "bidang" berisi id dari KATEGORI_PROGRAM (contoh: 'bidang-akademik', 'lembaga-keuangan')
CREATE TYPE "public"."StatusProker" AS ENUM ('PLANNING', 'ONGOING', 'COMPLETED');

CREATE TABLE "public"."ProgramKerja" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "nama" text NOT NULL,
    "deskripsi" text NOT NULL,
    "tanggalPelaksanaan" timestamp with time zone NOT NULL,
    "status" "public"."StatusProker" DEFAULT 'PLANNING'::"public"."StatusProker" NOT NULL,
    "penanggungJawab" text NOT NULL,
    "bidang" text NOT NULL DEFAULT 'lembaga-kesekretariatan',
    PRIMARY KEY ("id")
);

-- Galeri
CREATE TYPE "public"."KategoriGaleri" AS ENUM ('KEGIATAN', 'PRESTASI');

CREATE TABLE "public"."Galeri" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "judul" text NOT NULL,
    "imageUrl" text NOT NULL,
    "kategori" "public"."KategoriGaleri" NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY ("id")
);

-- Kabinet (informasi kabinet aktif: nama, periode, logo, visi, misi)
CREATE TABLE "public"."Kabinet" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "namaKabinet" text NOT NULL,
    "periode" text NOT NULL,
    "logoUrl" text NOT NULL DEFAULT '/niskala.png',
    "visi" text NOT NULL,
    "misi" text NOT NULL,
    "isAktif" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY ("id")
);

-- =============================================
-- SEED DATA: Admin default
-- Password: password123 (bcrypt hash, rounds=12)
-- =============================================
INSERT INTO "public"."User" ("name", "username", "password") VALUES
('Administrator', 'admin', '$2y$12$Kj6j93j1xP95lOQ.m8e4aOoX4O9v7bXZ9.p7h4cW7bN/5XN.Dq2xO');

-- =============================================
-- MIGRASI (jalankan jika tabel sudah ada):
-- ALTER TABLE "public"."ProgramKerja"
--     ADD COLUMN IF NOT EXISTS "bidang" text NOT NULL DEFAULT 'lembaga-kesekretariatan';
-- =============================================
