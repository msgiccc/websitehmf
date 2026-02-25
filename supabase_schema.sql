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
    "status" "public"."StatusArtikel" DEFAULT 'DRAFT'::"StatusArtikel" NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY ("id")
);

-- Program Kerja
CREATE TYPE "public"."StatusProker" AS ENUM ('PLANNING', 'ONGOING', 'COMPLETED');

CREATE TABLE "public"."ProgramKerja" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "nama" text NOT NULL,
    "deskripsi" text NOT NULL,
    "tanggalPelaksanaan" timestamp with time zone NOT NULL,
    "status" "public"."StatusProker" DEFAULT 'PLANNING'::"StatusProker" NOT NULL,
    "penanggungJawab" text NOT NULL,
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

-- Buat satu admin default (password: password123, sudah di-hash dengan bcrypt rounds=12)
INSERT INTO "public"."User" ("name", "username", "password") VALUES
('Administrator', 'admin', '$2y$12$Kj6j93j1xP95lOQ.m8e4aOoX4O9v7bXZ9.p7h4cW7bN/5XN.Dq2xO');
