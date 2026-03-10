-- ============================================================
-- FLUKS v2 - Update Schema + Seed Data + Form Config
-- ============================================================
-- Jalankan di Supabase SQL Editor

-- 1. Tabel Config FLUKS (untuk URL Form Order global)
CREATE TABLE IF NOT EXISTS "FluksConfig" (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    form_order_url TEXT NOT NULL DEFAULT '',
    catatan TEXT,                           -- pesan/info tambahan di halaman FLUKS publik
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pastikan hanya ada 1 baris config
INSERT INTO "FluksConfig" (form_order_url, catatan)
VALUES (
    'https://docs.google.com/forms/d/e/1FAIpQLScbPcRTrOhSKHt7CMXkO6S69sCkct-0UviKms9_4B6rVRpMDQ/viewform',
    'Hubungi admin FLUKS HMF jika ada pertanyaan.'
) ON CONFLICT DO NOTHING;

ALTER TABLE "FluksConfig" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read fluks config" ON "FluksConfig"
    FOR SELECT USING (true);

CREATE POLICY "Allow all operations on FluksConfig" ON "FluksConfig"
    FOR ALL USING (true)
    WITH CHECK (true);

-- ============================================================
-- 2. Seed Data Buku ke FluksItem
-- ============================================================
-- Hapus data lama jika ada (opsional — komentari baris ini jika tidak mau hapus)
-- TRUNCATE TABLE "FluksItem";

INSERT INTO "FluksItem" (nama, harga, kategori, stok, badge, is_active, urutan) VALUES
-- === BUKU SATUAN ===
('Fisika u/ Sains & Teknik Jilid 1 - Paul A. Tipler',   405000, 'buku', 'tersedia', NULL,       true, 1),
('Fisika u/ Sains & Teknik Jilid 2 - Paul A. Tipler',   609000, 'buku', 'tersedia', NULL,       true, 2),
('Kalkulus Purcell Jilid 1',                             347000, 'buku', 'tersedia', NULL,       true, 3),
('Kalkulus Purcell Jilid 2',                             346000, 'buku', 'tersedia', NULL,       true, 4),
('Fisika Dasar Halliday Resnick Walker Jilid 1',         445000, 'buku', 'tersedia', NULL,       true, 5),
('Fisika Dasar Halliday Resnick Walker Jilid 2',         491000, 'buku', 'tersedia', NULL,       true, 6),
('Fisika Dasar Halliday Resnick Walker Jilid 3',         339000, 'buku', 'tersedia', NULL,       true, 7),
('Fisika Prinsip & Aplikasi Jilid 1 - Douglas C. Giancoli', 420000, 'buku', 'tersedia', NULL,   true, 8),
('Fisika Prinsip & Aplikasi Jilid 2 - Douglas C. Giancoli', 358000, 'buku', 'tersedia', NULL,   true, 9),
-- === BUKU PAKET ===
('Paket Tipler Jilid 1+2',                               989000,  'buku', 'tersedia', 'Paket',   true, 10),
('Paket Giancoli 1+2',                                   753000,  'buku', 'tersedia', 'Paket',   true, 11),
('Paket Halliday 1+2+3',                                1237500,  'buku', 'tersedia', 'Paket',   true, 12),
('Paket Kalkulus 1+2',                                   668000,  'buku', 'tersedia', 'Paket',   true, 13),
('Paket Kalkulus 1+2 & Tipler 1',                       1060500,  'buku', 'tersedia', 'Terlaris',true, 14),
('Paket Fisika Dasar Tipler 1+2 & Kalkulus 1',          1323500,  'buku', 'tersedia', 'Terlaris',true, 15);

-- Tambahkan deskripsi untuk paket yang direkomendasikan
UPDATE "FluksItem"
    SET deskripsi = '⭐ DIREKOMENDASIKAN! Hemat dibanding beli satuan.'
    WHERE nama LIKE 'Paket%' AND badge = 'Terlaris';
