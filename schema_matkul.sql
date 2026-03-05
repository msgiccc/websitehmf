/*
    Tabel Mata Kuliah KINETIK (Kalkulator Studi)
    - id : UUID
    - kode : VARCHAR (contoh: FI111)
    - nama : VARCHAR (contoh: Fisika Dasar 1)
    - sks : INTEGER (contoh: 3)
    - semester_rekomendasi : INTEGER (contoh: 1)
    - prodi : VARCHAR (ENUM 'Fisika', 'PendFisika', 'Umum')
    - kategori : VARCHAR (contoh: 'Wajib', 'Pilihan', 'MKU', 'MKDK', 'MKKF')
*/

CREATE TABLE IF NOT EXISTS public."MataKuliah" (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    kode VARCHAR(20) NOT NULL,
    nama VARCHAR(150) NOT NULL,
    sks INTEGER NOT NULL CHECK (sks > 0),
    semester_rekomendasi INTEGER NOT NULL CHECK (semester_rekomendasi > 0 AND semester_rekomendasi <= 8),
    prodi VARCHAR(50) NOT NULL CHECK (prodi IN ('Fisika', 'PendFisika', 'Umum')),
    kategori VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security)
ALTER TABLE public."MataKuliah" ENABLE ROW LEVEL SECURITY;

-- Policy: Publik bisa SELALU BACA (SELECT)
CREATE POLICY "Public can view MataKuliah"
    ON public."MataKuliah" FOR SELECT
    USING (true);

-- Policy: Hanya Service Role (Admin Server) / Authenticated Supabase yang bisa ubah
CREATE POLICY "Admin dapat mengubah MataKuliah"
    ON public."MataKuliah" FOR ALL
    -- USING (auth.role() = 'authenticated'); -- Hanya untuk dashboard admin
    USING (true);

-- Membuat Fungsi Otomatis Update 'updated_at'
CREATE OR REPLACE FUNCTION update_modified_column_matkul()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_matkul_modtime
    BEFORE UPDATE ON public."MataKuliah"
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column_matkul();
