-- =============================================
-- MIGRATION: Menambahkan Tabel ShortLink
-- =============================================

CREATE TABLE IF NOT EXISTS "public"."ShortLink" (
    "id"          uuid DEFAULT gen_random_uuid() NOT NULL,
    "slug"        text NOT NULL UNIQUE,
    "url_asli"    text NOT NULL,
    "jumlah_klik" integer DEFAULT 0 NOT NULL,
    "isPublic"    boolean DEFAULT true NOT NULL,
    "createdAt"   timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY ("id")
);

-- Pastikan kolom userId ada (Dibutuhkan bagi yang sudah terlanjur membuat tabel ini di versi sebelumnya)
ALTER TABLE "public"."ShortLink" ADD COLUMN IF NOT EXISTS "userId" uuid REFERENCES "public"."User"("id") ON DELETE CASCADE;

-- Tambahkan sample data awal (dikaitkan ke NULL jika tidak diketahui, atau dikaitkan ke owner pertama).
-- Disini saya kaitkan ke userID NULL untuk sementara.
INSERT INTO "public"."ShortLink" ("slug", "url_asli", "jumlah_klik", "isPublic", "userId")
VALUES 
    ('oprec', 'https://docs.google.com/forms/d/e/1FAIpQLSfx...', 12, true, NULL),
    ('ig', 'https://instagram.com/hmf_fpmipaupi', 105, true, NULL),
    ('mabim2024', 'https://drive.google.com/drive/folders/...', 45, false, NULL)
ON CONFLICT ("slug") DO NOTHING;
