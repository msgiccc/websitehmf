-- Menambahkan kolom kuota pada tabel User
ALTER TABLE "public"."User"
ADD COLUMN IF NOT EXISTS "shortlink_quota" integer DEFAULT 5 NOT NULL;
