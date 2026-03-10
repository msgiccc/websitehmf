-- Migration Script: Menambahkan Fitur Lambang Kabinet ke tabel Kabinet

ALTER TABLE "public"."Kabinet"
ADD COLUMN IF NOT EXISTS "lambangUrl" text,
ADD COLUMN IF NOT EXISTS "filosofiLambang" text;

-- Update data Kabinet yang sudah ada dengan nilai default (opsional)
-- UPDATE "public"."Kabinet" SET "lambangUrl" = '/logo.png', "filosofiLambang" = 'Lambang kabinet mencerminkan...' WHERE "lambangUrl" IS NULL;
