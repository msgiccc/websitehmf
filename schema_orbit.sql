-- ============================================================
-- Schema ORBIT - Operan Ragam Barang dan Inventaris Terjangkau
-- Pasar barang bekas mahasiswa untuk alat penunjang kuliah
-- ============================================================
-- Jalankan di Supabase SQL Editor

CREATE TABLE IF NOT EXISTS "OrbitItem" (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    judul TEXT NOT NULL,
    deskripsi TEXT,
    harga INTEGER NOT NULL DEFAULT 0,           -- dalam Rupiah, 0 = gratis/hibah
    kondisi TEXT NOT NULL DEFAULT 'baik',        -- 'baru','baik','cukup','butuh_perbaikan'
    kategori TEXT NOT NULL DEFAULT 'lainnya',   -- 'buku','jas_lab','alat_ukur','alat_tulis','elektronik','lainnya'
    foto_url TEXT,                               -- URL foto barang (bisa Supabase Storage atau link ext)
    penjual_nama TEXT NOT NULL,
    penjual_instagram TEXT NOT NULL,            -- username IG tanpa @, untuk DM
    is_terjual BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk performa
CREATE INDEX IF NOT EXISTS idx_orbit_kategori ON "OrbitItem"(kategori);
CREATE INDEX IF NOT EXISTS idx_orbit_active ON "OrbitItem"(is_active, is_terjual);
CREATE INDEX IF NOT EXISTS idx_orbit_created ON "OrbitItem"(created_at DESC);

-- Enable RLS
ALTER TABLE "OrbitItem" ENABLE ROW LEVEL SECURITY;

-- Policy: siapa saja bisa baca listing aktif
CREATE POLICY "Anyone can view active orbit items" ON "OrbitItem"
    FOR SELECT USING (is_active = TRUE);

-- Policy: service role bisa semua operasi (untuk Admin Dashboard Next.js)
CREATE POLICY "Service role can do everything" ON "OrbitItem"
    FOR ALL USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- Trigger untuk auto-update updated_at
CREATE OR REPLACE FUNCTION update_orbit_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orbit_updated_at_trigger
    BEFORE UPDATE ON "OrbitItem"
    FOR EACH ROW EXECUTE FUNCTION update_orbit_updated_at();
