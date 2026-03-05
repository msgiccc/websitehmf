-- Schema untuk tabel BearrLink
-- Jalankan di Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public."BearrLink" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kategori VARCHAR(20) NOT NULL CHECK (kategori IN ('bank_soal', 'ebook', 'aplikasi', 'responsi', 'referensi')),
    judul VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    url TEXT NOT NULL,
    tipe_url VARCHAR(20) NOT NULL DEFAULT 'lainnya' CHECK (tipe_url IN ('drive', 'form', 'list', 'wa', 'lainnya')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    urutan INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger update updated_at
CREATE OR REPLACE FUNCTION update_bearr_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER bearr_updated_at_trigger
BEFORE UPDATE ON public."BearrLink"
FOR EACH ROW EXECUTE FUNCTION update_bearr_updated_at();

-- RLS
ALTER TABLE public."BearrLink" ENABLE ROW LEVEL SECURITY;

-- Publik bisa baca yang aktif
CREATE POLICY "BearrLink: read active for public"
ON public."BearrLink" FOR SELECT
USING (is_active = TRUE);

-- Admin bisa baca semua
CREATE POLICY "BearrLink: read all for authenticated"
ON public."BearrLink" FOR SELECT
TO authenticated
USING (TRUE);

-- Authenticated bisa insert/update/delete
CREATE POLICY "BearrLink: write for authenticated"
ON public."BearrLink" FOR ALL
TO authenticated
USING (TRUE)
WITH CHECK (TRUE);

-- Seed data awal
INSERT INTO public."BearrLink" (kategori, judul, deskripsi, url, tipe_url, is_active, urutan) VALUES
('bank_soal', 'Bank Soal Fisika HMF', 'Kumpulan soal-soal ujian dari berbagai mata kuliah fisika yang dikurasi oleh HMF.', 'https://drive.google.com/drive/folders/1Z4XzSVsMdHcQLY7CD-H4Trm4qpFAFeEu', 'drive', TRUE, 0),
('referensi', 'Referensi Belajar & Catatan Mahasiswa', 'Catatan dan referensi belajar sumbangan dari mahasiswa Fisika UPI yang bisa diakses publik.', 'https://drive.google.com/drive/folders/1Q7hM4erZhQ1Ci2Y7x8C8FMhW4C_M9f4N', 'drive', TRUE, 0),
('ebook', 'Form Pengajuan E-Book', 'Ingin mengajukan e-book untuk koleksi digital HMF? Isi formulir di bawah ini.', 'https://docs.google.com/forms/d/e/1FAIpQLSfjPpeRP--Q308llVg3OmKvmF2D5Hg_9lHQnS_SQk2EVNtS4g/viewform', 'form', TRUE, 0),
('ebook', 'Daftar E-Book Tersedia', 'Lihat daftar lengkap e-book yang sudah tersedia di perpustakaan digital HMF.', 'https://docs.google.com/file/d/12fgHIBWpmtnQdZQsRRRWp831Kdvcs5FC/edit?filetype=msword', 'list', TRUE, 1),
('aplikasi', 'Form Pengajuan Aplikasi', 'Punya rekomendasi atau ingin mengajukan aplikasi baru ke daftar BEARR? Isi formulir tersebut.', 'https://docs.google.com/forms/d/e/1FAIpQLSev7IjtMVUFRdN5FG9VCu-DlJuMvR8fO7aqdJB0KXI8hxNdlA/viewform', 'form', TRUE, 0),
('aplikasi', 'Daftar Aplikasi Rekomendasi', 'Lihat daftar lengkap aplikasi yang direkomendasikan HMF untuk mahasiswa Fisika.', 'https://docs.google.com/document/d/1JHrSYUtC8AcEQusZyIkr9H-FzFipRFnMBEmP7LkRiKY/edit?tab=t.0', 'list', TRUE, 1),
('responsi', 'Responsi via WhatsApp', 'Hubungi tim responsi HMF melalui WhatsApp untuk pertanyaan akademik dan persiapan ujian.', 'https://wa.me/', 'wa', FALSE, 0);
