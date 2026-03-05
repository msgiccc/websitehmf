-- ==========================================
-- FILE DATA SEED: MATA KULIAH KURIKULUM UPI (D025 & D515)
-- ==========================================

INSERT INTO public."MataKuliah" (kode, nama, sks, semester_rekomendasi, prodi, kategori) VALUES
-- === SEMESTER 1 ===
('KU100', 'Pendidikan Agama Islam', 2, 1, 'Umum', 'MKU'),
('KU105', 'Pendidikan Pancasila', 2, 1, 'Umum', 'MKU'),
('FI111', 'Fisika Dasar 1', 4, 1, 'Umum', 'Wajib'),
('FI112', 'Eksperimen Fisika Dasar 1', 1, 1, 'Umum', 'Wajib'),
('FI113', 'Matematika Dasar 1', 3, 1, 'Umum', 'Wajib'),
('FI114', 'Kimia Dasar', 3, 1, 'Umum', 'Wajib'),
('FI115', 'Bahasa Inggris Profesi', 2, 1, 'Umum', 'Wajib'),
('KD300', 'Landasan Pendidikan', 2, 1, 'PendFisika', 'MKDK'),

-- === SEMESTER 2 ===
('KU106', 'Pendidikan Kewarganegaraan', 2, 2, 'Umum', 'MKU'),
('KU107', 'Bahasa Indonesia', 2, 2, 'Umum', 'MKU'),
('FI121', 'Fisika Dasar 2', 4, 2, 'Umum', 'Wajib'),
('FI122', 'Eksperimen Fisika Dasar 2', 1, 2, 'Umum', 'Wajib'),
('FI123', 'Matematika Dasar 2', 3, 2, 'Umum', 'Wajib'),
('FI124', 'Biologi Umum', 3, 2, 'Umum', 'Wajib'),
('FI125', 'Pengantar Ilmu Komputer', 3, 2, 'Umum', 'Wajib'),
('KD301', 'Psikologi Pendidikan', 2, 2, 'PendFisika', 'MKDK'),

-- === SEMESTER 3 ===
('FI211', 'Mekanika', 4, 3, 'Umum', 'Wajib'),
('FI212', 'Termodinamika', 3, 3, 'Umum', 'Wajib'),
('FI213', 'Fisika Matematika 1', 3, 3, 'Umum', 'Wajib'),
('FI214', 'Elektronika Dasar 1', 3, 3, 'Umum', 'Wajib'),
('FI215', 'Eksperimen Elektronika Dasar 1', 1, 3, 'Umum', 'Wajib'),
('FI216', 'Kurikulum Pembelajaran Fisika', 3, 3, 'PendFisika', 'MKKF'),
('FI217', 'Algoritma dan Pemrograman', 3, 3, 'Fisika', 'Wajib'),

-- === SEMESTER 4 ===
('FI221', 'Gelombang dan Optik', 3, 4, 'Umum', 'Wajib'),
('FI222', 'Fisika Modern', 3, 4, 'Umum', 'Wajib'),
('FI223', 'Fisika Matematika 2', 3, 4, 'Umum', 'Wajib'),
('FI224', 'Elektronika Dasar 2', 3, 4, 'Umum', 'Wajib'),
('FI225', 'Eksperimen Fisika Lanjutan', 2, 4, 'Umum', 'Wajib'),
('FI226', 'Strategi Pembelajaran Fisika', 3, 4, 'PendFisika', 'MKKF'),
('FI227', 'Media Pembelajaran Fisika', 3, 4, 'PendFisika', 'MKKF'),
('FI228', 'Fisika Komputasi', 3, 4, 'Fisika', 'Wajib'),

-- === SEMESTER 5 ===
('FI311', 'Fisika Kuantum', 4, 5, 'Umum', 'Wajib'),
('FI312', 'Fisika Statistik', 3, 5, 'Umum', 'Wajib'),
('FI313', 'Fisika Inti', 3, 5, 'Umum', 'Wajib'),
('FI314', 'Evaluasi Pembelajaran Fisika', 3, 5, 'PendFisika', 'MKKF'),
('FI315', 'Fisika Sekolah 1', 3, 5, 'PendFisika', 'MKKF'),
('FI316', 'Metodologi Penel. Pend. Fisika', 2, 5, 'PendFisika', 'MKKF'),
('FI317', 'Elektromagnetika', 4, 5, 'Fisika', 'Wajib'),
('FI318', 'Metodologi Penelitian Fisika', 2, 5, 'Fisika', 'Wajib'),
('PI310', 'Pilihan Bebas Pend. Fisika', 2, 5, 'PendFisika', 'Pilihan'),
('PI311', 'Pilihan Bebas Fisika Murni', 2, 5, 'Fisika', 'Pilihan'),

-- === SEMESTER 6 ===
('FI321', 'Fisika Zat Padat', 3, 6, 'Umum', 'Wajib'),
('FI322', 'Eksperimen Fisika Modern', 2, 6, 'Umum', 'Wajib'),
('FI323', 'Fisika Sekolah 2', 3, 6, 'PendFisika', 'MKKF'),
('FI324', 'Seminar Pend. Fisika', 2, 6, 'PendFisika', 'MKKF'),
('FI325', 'Microteaching', 2, 6, 'PendFisika', 'MKKF'),
('FI326', 'Seminar Fisika', 2, 6, 'Fisika', 'Wajib'),
('KU300', 'Pendidikan Inklusif/Karakter', 2, 6, 'PendFisika', 'MKDK'),
('PI320', 'Pilihan Bebas Fisika Murni Lanjut', 2, 6, 'Fisika', 'Pilihan'),

-- === SEMESTER 7 ===
('KU400', 'KKN (Kuliah Kerja Nyata)', 2, 7, 'Umum', 'Wajib'),
('FI411', 'PPL (Program Pengalaman Lapangan)', 4, 7, 'PendFisika', 'Wajib'),
('FI412', 'PKL (Praktik Kerja Lapangan)', 4, 7, 'Fisika', 'Wajib'),

-- === SEMESTER 8 ===
('FI499', 'Skripsi Pendidikan Fisika', 6, 8, 'PendFisika', 'Wajib'),
('FI498', 'Skripsi Fisika', 6, 8, 'Fisika', 'Wajib')
ON CONFLICT DO NOTHING;
