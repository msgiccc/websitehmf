-- =============================================
-- TABEL: ProgramUnggulan
-- =============================================
CREATE TABLE IF NOT EXISTS "public"."ProgramUnggulan" (
    "id"           uuid DEFAULT gen_random_uuid() NOT NULL,
    "nama"         text NOT NULL,
    "deskripsi"    text NOT NULL,
    "iconSvg"      text,
    "kabinetId"    uuid NOT NULL,
    "createdAt"    timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY ("id")
);

-- Relasi
ALTER TABLE "public"."ProgramUnggulan"
  ADD CONSTRAINT "ProgramUnggulan_kabinetId_fkey" 
  FOREIGN KEY ("kabinetId") REFERENCES "public"."Kabinet"("id") ON DELETE CASCADE;

-- Insert Data Awal
INSERT INTO "public"."ProgramUnggulan" ("nama", "deskripsi", "iconSvg", "kabinetId")
SELECT
    'Pelatihan Kewirausahaan',
    'Program inisiatif pengembangan skill berwirausaha bagi anggota untuk menciptakan ekosistem bisnis mahasiswa yang inovatif, mandiri, dan berdaya saing tinggi dalam menghadapi tantangan industri kreatif.',
    '<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>',
    id
FROM "public"."Kabinet"
WHERE "namaKabinet" = 'Niskala Cakra Murni'
LIMIT 1;
