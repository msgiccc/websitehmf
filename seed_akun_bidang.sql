-- =============================================
-- SEED: Pendaftaran 10 Akun Khusus Bidang HMF
-- Password untuk masing-masing bidang di-enkripsi bcrypt (rounds=12)
-- Username diset sesuai singkatan dari masing-masing bidang
-- =============================================

INSERT INTO "public"."User" ("name", "username", "password")
VALUES 
    -- 1. Lembaga Kesekretariatan
    (
      'Kesekretariatan HMF', 
      'kesek', 
      crypt('hmf-kesek', gen_salt('bf', 12))
    ),
    -- 2. Lembaga Keuangan
    (
      'Keuangan HMF', 
      'keuangan', 
      crypt('hmf-keuangan', gen_salt('bf', 12))
    ),
    -- 3. Bidang Akademik
    (
      'Bidang Akademik HMF', 
      'akademik', 
      crypt('hmf-akademik', gen_salt('bf', 12))
    ),
    -- 4. Bidang Ekonomi dan Bisnis
    (
      'Ekonomi Bisnis HMF', 
      'ekbis', 
      crypt('hmf-ekbis', gen_salt('bf', 12))
    ),
    -- 5. Bidang Kaderisasi
    (
      'Bidang Kaderisasi HMF', 
      'kaderisasi', 
      crypt('hmf-kaderisasi', gen_salt('bf', 12))
    ),
    -- 6. Bidang Kerohanian
    (
      'Bidang Kerohanian HMF', 
      'kerohanian', 
      crypt('hmf-kerohanian', gen_salt('bf', 12))
    ),
    -- 7. Bidang Komunikasi dan Media Informasi
    (
      'Kominfo HMF', 
      'kominfo', 
      crypt('hmf-kominfo', gen_salt('bf', 12))
    ),
    -- 8. Bidang Penelitian dan Pengembangan
    (
      'Litbang HMF', 
      'litbang', 
      crypt('hmf-litbang', gen_salt('bf', 12))
    ),
    -- 9. Bidang Pengembangan Minat dan Bakat
    (
      'Minat Bakat HMF', 
      'mikat', 
      crypt('hmf-mikat', gen_salt('bf', 12))
    ),
    -- 10. Bidang Sosial dan Politik
    (
      'Sospol HMF', 
      'sospol', 
      crypt('hmf-sospol', gen_salt('bf', 12))
    )
ON CONFLICT ("username") DO NOTHING;
