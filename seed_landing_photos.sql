-- Menambahkan 4 Slot Foto untuk Landing Page pada tabel Kabinet
ALTER TABLE "public"."Kabinet"
ADD COLUMN IF NOT EXISTS "heroPhoto1" text,
ADD COLUMN IF NOT EXISTS "heroPhoto2" text,
ADD COLUMN IF NOT EXISTS "heroPhoto3" text,
ADD COLUMN IF NOT EXISTS "heroPhoto4" text;
