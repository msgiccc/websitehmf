export type ProdiType = 'PendFisika' | 'Fisika' | 'Umum';
export type KategoriMatkul = 'Wajib' | 'Pilihan' | 'MKU' | 'MKDK' | 'MKKF';

export interface MataKuliah {
    id: string; // Unique ID (gabungan prodi_kode atau semacamnya)
    kode: string;
    nama: string;
    sks: number;
    semester: number; // Semester default rekomendasi kurikulum
    prodi: ProdiType[]; // Bisa dimiliki kedua prodi ('Umum') atau spesifik
    kategori?: KategoriMatkul;
}

// ----------------------------------------------------
// DATABASE LOKAL MATA KULIAH KURIKULUM UPI (D025 & D515)
// ----------------------------------------------------
export const DATA_MATKUL: MataKuliah[] = [
    // === SEMESTER 1 ===
    { id: 'mku_agama', kode: 'KU100', nama: 'Pendidikan Agama Islam', sks: 2, semester: 1, prodi: ['Umum'], kategori: 'MKU' },
    { id: 'mku_pancasila', kode: 'KU105', nama: 'Pendidikan Pancasila', sks: 2, semester: 1, prodi: ['Umum'], kategori: 'MKU' },
    { id: 'fis_dasar1', kode: 'FI111', nama: 'Fisika Dasar 1', sks: 4, semester: 1, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'eks_fis_dasar1', kode: 'FI112', nama: 'Eksperimen Fisika Dasar 1', sks: 1, semester: 1, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'mat_dasar1', kode: 'FI113', nama: 'Matematika Dasar 1', sks: 3, semester: 1, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'kimia_das', kode: 'FI114', nama: 'Kimia Dasar', sks: 3, semester: 1, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'b_ing', kode: 'FI115', nama: 'Bahasa Inggris Profesi', sks: 2, semester: 1, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'lkp_pend', kode: 'KD300', nama: 'Landasan Pendidikan', sks: 2, semester: 1, prodi: ['PendFisika'], kategori: 'MKDK' },

    // === SEMESTER 2 ===
    { id: 'mku_kwn', kode: 'KU106', nama: 'Pendidikan Kewarganegaraan', sks: 2, semester: 2, prodi: ['Umum'], kategori: 'MKU' },
    { id: 'mku_indo', kode: 'KU107', nama: 'Bahasa Indonesia', sks: 2, semester: 2, prodi: ['Umum'], kategori: 'MKU' },
    { id: 'fis_dasar2', kode: 'FI121', nama: 'Fisika Dasar 2', sks: 4, semester: 2, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'eks_fis_dasar2', kode: 'FI122', nama: 'Eksperimen Fisika Dasar 2', sks: 1, semester: 2, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'mat_dasar2', kode: 'FI123', nama: 'Matematika Dasar 2', sks: 3, semester: 2, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'bio_umum', kode: 'FI124', nama: 'Biologi Umum', sks: 3, semester: 2, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'pik', kode: 'FI125', nama: 'Pengantar Ilmu Komputer', sks: 3, semester: 2, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'psi_pend', kode: 'KD301', nama: 'Psikologi Pendidikan', sks: 2, semester: 2, prodi: ['PendFisika'], kategori: 'MKDK' },

    // === SEMESTER 3 ===
    { id: 'mekanika', kode: 'FI211', nama: 'Mekanika', sks: 4, semester: 3, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'termo', kode: 'FI212', nama: 'Termodinamika', sks: 3, semester: 3, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'fismat1', kode: 'FI213', nama: 'Fisika Matematika 1', sks: 3, semester: 3, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'eldas1', kode: 'FI214', nama: 'Elektronika Dasar 1', sks: 3, semester: 3, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'eks_eldas1', kode: 'FI215', nama: 'Eksperimen Elektronika Dasar 1', sks: 1, semester: 3, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'kur_pend_fis', kode: 'FI216', nama: 'Kurikulum Pembelajaran Fisika', sks: 3, semester: 3, prodi: ['PendFisika'], kategori: 'MKKF' },
    { id: 'algoritma', kode: 'FI217', nama: 'Algoritma dan Pemrograman', sks: 3, semester: 3, prodi: ['Fisika'], kategori: 'Wajib' },

    // === SEMESTER 4 ===
    { id: 'gelopt', kode: 'FI221', nama: 'Gelombang dan Optik', sks: 3, semester: 4, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'fismod', kode: 'FI222', nama: 'Fisika Modern', sks: 3, semester: 4, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'fismat2', kode: 'FI223', nama: 'Fisika Matematika 2', sks: 3, semester: 4, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'eldas2', kode: 'FI224', nama: 'Elektronika Dasar 2', sks: 3, semester: 4, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'eks_lanjut', kode: 'FI225', nama: 'Eksperimen Fisika Lanjutan', sks: 2, semester: 4, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'strat_pend_fis', kode: 'FI226', nama: 'Strategi Pembelajaran Fisika', sks: 3, semester: 4, prodi: ['PendFisika'], kategori: 'MKKF' },
    { id: 'med_pend_fis', kode: 'FI227', nama: 'Media Pembelajaran Fisika', sks: 3, semester: 4, prodi: ['PendFisika'], kategori: 'MKKF' },
    { id: 'komputasi', kode: 'FI228', nama: 'Fisika Komputasi', sks: 3, semester: 4, prodi: ['Fisika'], kategori: 'Wajib' },

    // === SEMESTER 5 ===
    { id: 'fiskuan', kode: 'FI311', nama: 'Fisika Kuantum', sks: 4, semester: 5, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'fisstat', kode: 'FI312', nama: 'Fisika Statistik', sks: 3, semester: 5, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'finti', kode: 'FI313', nama: 'Fisika Inti', sks: 3, semester: 5, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'eval_pend_fis', kode: 'FI314', nama: 'Evaluasi Pembelajaran Fisika', sks: 3, semester: 5, prodi: ['PendFisika'], kategori: 'MKKF' },
    { id: 'fisekol1', kode: 'FI315', nama: 'Fisika Sekolah 1', sks: 3, semester: 5, prodi: ['PendFisika'], kategori: 'MKKF' },
    { id: 'metpen_pend', kode: 'FI316', nama: 'Metodologi Penelitian Pend. Fisika', sks: 2, semester: 5, prodi: ['PendFisika'], kategori: 'MKKF' },
    { id: 'elmag', kode: 'FI317', nama: 'Elektromagnetika', sks: 4, semester: 5, prodi: ['Fisika'], kategori: 'Wajib' },
    { id: 'metpen_fis', kode: 'FI318', nama: 'Metodologi Penelitian Fisika', sks: 2, semester: 5, prodi: ['Fisika'], kategori: 'Wajib' },
    { id: 'pil_pendfis_1', kode: 'PI310', nama: 'Pilihan Pend. Fisika 1', sks: 2, semester: 5, prodi: ['PendFisika'], kategori: 'Pilihan' },
    { id: 'pil_fis_1', kode: 'PI311', nama: 'Pilihan Fisika Murni 1', sks: 2, semester: 5, prodi: ['Fisika'], kategori: 'Pilihan' },

    // === SEMESTER 6 ===
    { id: 'fzp', kode: 'FI321', nama: 'Fisika Zat Padat', sks: 3, semester: 6, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'eks_fismod', kode: 'FI322', nama: 'Eksperimen Fisika Modern', sks: 2, semester: 6, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'fisekol2', kode: 'FI323', nama: 'Fisika Sekolah 2', sks: 3, semester: 6, prodi: ['PendFisika'], kategori: 'MKKF' },
    { id: 'sem_pend', kode: 'FI324', nama: 'Seminar Pend. Fisika', sks: 2, semester: 6, prodi: ['PendFisika'], kategori: 'MKKF' },
    { id: 'micro', kode: 'FI325', nama: 'Microteaching', sks: 2, semester: 6, prodi: ['PendFisika'], kategori: 'MKKF' },
    { id: 'sem_fis', kode: 'FI326', nama: 'Seminar Fisika', sks: 2, semester: 6, prodi: ['Fisika'], kategori: 'Wajib' },
    { id: 'pend_karakter', kode: 'KU300', nama: 'Pendidikan Inklusif/Karakter', sks: 2, semester: 6, prodi: ['PendFisika'], kategori: 'MKDK' },
    { id: 'pil_pendfis_2', kode: 'PI320', nama: 'Pilihan Pend. Fisika 2', sks: 2, semester: 6, prodi: ['PendFisika'], kategori: 'Pilihan' },
    { id: 'pil_pendfis_3', kode: 'PI321', nama: 'Pilihan Pend. Fisika 3', sks: 2, semester: 6, prodi: ['PendFisika'], kategori: 'Pilihan' },
    { id: 'pil_fis_2', kode: 'PI322', nama: 'Pilihan Fisika Murni 2', sks: 2, semester: 6, prodi: ['Fisika'], kategori: 'Pilihan' },

    // === SEMESTER 7 ===
    { id: 'kkn', kode: 'KU400', nama: 'KKN (Kuliah Kerja Nyata)', sks: 2, semester: 7, prodi: ['Umum'], kategori: 'Wajib' },
    { id: 'ppl', kode: 'FI411', nama: 'PPL (Program Pengalaman Lapangan)', sks: 4, semester: 7, prodi: ['PendFisika'], kategori: 'Wajib' },
    { id: 'pkl', kode: 'FI412', nama: 'PKL (Praktik Kerja Lapangan)', sks: 4, semester: 7, prodi: ['Fisika'], kategori: 'Wajib' },
    { id: 'pil_pendfis_4', kode: 'PI410', nama: 'Pilihan Pend. Fisika 4', sks: 2, semester: 7, prodi: ['PendFisika'], kategori: 'Pilihan' },
    { id: 'pil_pendfis_5', kode: 'PI411', nama: 'Pilihan Pend. Fisika 5', sks: 2, semester: 7, prodi: ['PendFisika'], kategori: 'Pilihan' },
    { id: 'pil_fis_3', kode: 'PI412', nama: 'Pilihan Fisika Murni 3', sks: 2, semester: 7, prodi: ['Fisika'], kategori: 'Pilihan' },
    { id: 'pil_fis_4', kode: 'PI413', nama: 'Pilihan Fisika Murni 4', sks: 2, semester: 7, prodi: ['Fisika'], kategori: 'Pilihan' },

    // === SEMESTER 8 ===
    { id: 'skripsi_pend', kode: 'FI499', nama: 'Skripsi Pendidikan Fisika', sks: 6, semester: 8, prodi: ['PendFisika'], kategori: 'Wajib' },
    { id: 'skripsi_fis', kode: 'FI498', nama: 'Skripsi Fisika', sks: 6, semester: 8, prodi: ['Fisika'], kategori: 'Wajib' }
];

// OPSI NILAI BESERTA BOBOTNYA
export const GRADES = [
    { label: 'A', value: 4.0 },
    { label: 'A-', value: 3.7 },
    { label: 'B+', value: 3.4 },
    { label: 'B', value: 3.0 },
    { label: 'B-', value: 2.7 },
    { label: 'C+', value: 2.4 },
    { label: 'C', value: 2.0 },
    { label: 'D', value: 1.0 },
    { label: 'E', value: 0.0 }, // Kosong/Tidak diisi/Belum diambil = null (diabaikan)
];
