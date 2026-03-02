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

-- Tambahkan sample data awal
INSERT INTO "public"."ShortLink" ("slug", "url_asli", "jumlah_klik", "isPublic")
VALUES 
    ('oprec', 'https://docs.google.com/forms/d/e/1FAIpQLSfx...', 12, true),
    ('ig', 'https://instagram.com/hmf_fpmipaupi', 105, true),
    ('mabim2024', 'https://drive.google.com/drive/folders/...', 45, false)
ON CONFLICT ("slug") DO NOTHING;
