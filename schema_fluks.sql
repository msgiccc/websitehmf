-- ============================================================
-- Schema FLUKS - Fasilitas Layanan Usaha dan Kebutuhan Sekitar
-- Etalase digital danusan divisi Ekobis HMF FPMIPA UPI
-- ============================================================
-- Jalankan di Supabase SQL Editor

CREATE TABLE IF NOT EXISTS "FluksItem" (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama TEXT NOT NULL,
    deskripsi TEXT,
    harga INTEGER NOT NULL DEFAULT 0,           -- dalam Rupiah, 0 = gratis
    kategori TEXT NOT NULL DEFAULT 'lainnya',   -- 'makanan','aplikasi','merchandise','layanan','lainnya'
    foto_url TEXT,
    link_order TEXT,                             -- URL/link order (IG, WA, dll)
    tipe_link TEXT NOT NULL DEFAULT 'instagram', -- 'instagram','whatsapp','lainnya'
    stok TEXT DEFAULT 'tersedia',                -- 'tersedia','terbatas','habis'
    badge TEXT,                                  -- opsional: 'Terlaris', 'Baru', 'Diskon', dsb
    is_active BOOLEAN DEFAULT TRUE,
    urutan INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fluks_kategori ON "FluksItem"(kategori);
CREATE INDEX IF NOT EXISTS idx_fluks_active   ON "FluksItem"(is_active);
CREATE INDEX IF NOT EXISTS idx_fluks_urutan   ON "FluksItem"(urutan ASC);

ALTER TABLE "FluksItem" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active fluks items" ON "FluksItem"
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Allow all operations on FluksItem" ON "FluksItem"
    FOR ALL USING (true)
    WITH CHECK (true);
