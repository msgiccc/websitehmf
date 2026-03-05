export interface MataKuliah {
    id: string;
    kode: string;
    nama: string;
    sks: number;
    semester: number;
    kategori?: 'Wajib' | 'Pilihan' | 'MKU' | 'MKKF';
}

// Simulasi Data Mata Kuliah Kurikulum Pendidikan Fisika / Fisika Murni UPI (Generalisasi)
export const DATA_MATKUL: MataKuliah[] = [
    // Semester 1
    { id: 'm1_1', kode: 'KU100', nama: 'Pendidikan Agama Islam', sks: 2, semester: 1, kategori: 'MKU' },
    { id: 'm1_2', kode: 'KU105', nama: 'Pendidikan Pancasila', sks: 2, semester: 1, kategori: 'MKU' },
    { id: 'm1_3', kode: 'FI111', nama: 'Fisika Dasar 1', sks: 4, semester: 1, kategori: 'Wajib' },
    { id: 'm1_4', kode: 'FI112', nama: 'Eksperimen Fisika Dasar 1', sks: 1, semester: 1, kategori: 'Wajib' },
    { id: 'm1_5', kode: 'FI113', nama: 'Matematika Dasar 1', sks: 3, semester: 1, kategori: 'Wajib' },
    { id: 'm1_6', kode: 'FI114', nama: 'Kimia Dasar', sks: 3, semester: 1, kategori: 'Wajib' },
    { id: 'm1_7', kode: 'FI115', nama: 'Bahasa Inggris Profesi', sks: 2, semester: 1, kategori: 'Wajib' },

    // Semester 2
    { id: 'm2_1', kode: 'KU106', nama: 'Pendidikan Kewarganegaraan', sks: 2, semester: 2, kategori: 'MKU' },
    { id: 'm2_2', kode: 'KU107', nama: 'Bahasa Indonesia', sks: 2, semester: 2, kategori: 'MKU' },
    { id: 'm2_3', kode: 'FI121', nama: 'Fisika Dasar 2', sks: 4, semester: 2, kategori: 'Wajib' },
    { id: 'm2_4', kode: 'FI122', nama: 'Eksperimen Fisika Dasar 2', sks: 1, semester: 2, kategori: 'Wajib' },
    { id: 'm2_5', kode: 'FI123', nama: 'Matematika Dasar 2', sks: 3, semester: 2, kategori: 'Wajib' },
    { id: 'm2_6', kode: 'FI124', nama: 'Biologi Umum', sks: 3, semester: 2, kategori: 'Wajib' },
    { id: 'm2_7', kode: 'FI125', nama: 'Pengantar Ilmu Komputer', sks: 3, semester: 2, kategori: 'Wajib' },

    // Semester 3
    { id: 'm3_1', kode: 'FI211', nama: 'Mekanika', sks: 4, semester: 3, kategori: 'Wajib' },
    { id: 'm3_2', kode: 'FI212', nama: 'Termodinamika', sks: 3, semester: 3, kategori: 'Wajib' },
    { id: 'm3_3', kode: 'FI213', nama: 'Fisika Matematika 1', sks: 3, semester: 3, kategori: 'Wajib' },
    { id: 'm3_4', kode: 'FI214', nama: 'Elektronika Dasar 1', sks: 3, semester: 3, kategori: 'Wajib' },
    { id: 'm3_5', kode: 'FI215', nama: 'Eksperimen Elektronika Dasar 1', sks: 1, semester: 3, kategori: 'Wajib' },
    { id: 'm3_6', kode: 'FI216', nama: 'Kurikulum Pembelajaran Fisika', sks: 3, semester: 3, kategori: 'Wajib' },

    // Semester 4
    { id: 'm4_1', kode: 'FI221', nama: 'Gelombang dan Optik', sks: 3, semester: 4, kategori: 'Wajib' },
    { id: 'm4_2', kode: 'FI222', nama: 'Fisika Modern', sks: 3, semester: 4, kategori: 'Wajib' },
    { id: 'm4_3', kode: 'FI223', nama: 'Fisika Matematika 2', sks: 3, semester: 4, kategori: 'Wajib' },
    { id: 'm4_4', kode: 'FI224', nama: 'Elektronika Dasar 2', sks: 3, semester: 4, kategori: 'Wajib' },
    { id: 'm4_5', kode: 'FI225', nama: 'Eksperimen Fisika Lanjutan', sks: 2, semester: 4, kategori: 'Wajib' },
    { id: 'm4_6', kode: 'FI226', nama: 'Strategi Pembelajaran Fisika', sks: 3, semester: 4, kategori: 'Wajib' },
    { id: 'm4_7', kode: 'FI227', nama: 'Media Pembelajaran Fisika', sks: 3, semester: 4, kategori: 'Wajib' },

    // Semester 5
    { id: 'm5_1', kode: 'FI311', nama: 'Fisika Kuantum', sks: 4, semester: 5, kategori: 'Wajib' },
    { id: 'm5_2', kode: 'FI312', nama: 'Fisika Statistik', sks: 3, semester: 5, kategori: 'Wajib' },
    { id: 'm5_3', kode: 'FI313', nama: 'Fisika Inti', sks: 3, semester: 5, kategori: 'Wajib' },
    { id: 'm5_4', kode: 'FI314', nama: 'Evaluasi Pembelajaran Fisika', sks: 3, semester: 5, kategori: 'Wajib' },
    { id: 'm5_5', kode: 'FI315', nama: 'Fisika Sekolah 1', sks: 3, semester: 5, kategori: 'Wajib' },
    { id: 'm5_6', kode: 'FI316', nama: 'Metodologi Penelitian Pend. Fisika', sks: 2, semester: 5, kategori: 'Wajib' },
    { id: 'm5_7', kode: 'FI310', nama: 'Mata Kuliah Pilihan 1', sks: 2, semester: 5, kategori: 'Pilihan' },

    // Semester 6
    { id: 'm6_1', kode: 'FI321', nama: 'Fisika Zat Padat', sks: 3, semester: 6, kategori: 'Wajib' },
    { id: 'm6_2', kode: 'FI322', nama: 'Eksperimen Fisika Modern', sks: 2, semester: 6, kategori: 'Wajib' },
    { id: 'm6_3', kode: 'FI323', nama: 'Fisika Sekolah 2', sks: 3, semester: 6, kategori: 'Wajib' },
    { id: 'm6_4', kode: 'FI324', nama: 'Seminar Fisika/Pend. Fisika', sks: 2, semester: 6, kategori: 'Wajib' },
    { id: 'm6_5', kode: 'FI325', nama: 'Microteaching', sks: 2, semester: 6, kategori: 'Wajib' },
    { id: 'm6_6', kode: 'FI320', nama: 'Mata Kuliah Pilihan 2', sks: 2, semester: 6, kategori: 'Pilihan' },
    { id: 'm6_7', kode: 'FI330', nama: 'Mata Kuliah Pilihan 3', sks: 2, semester: 6, kategori: 'Pilihan' },

    // Semester 7
    { id: 'm7_1', kode: 'KU400', nama: 'KKN (Kuliah Kerja Nyata)', sks: 2, semester: 7, kategori: 'Wajib' },
    { id: 'm7_2', kode: 'FI411', nama: 'PPL (Program Pengalaman Lapangan)', sks: 4, semester: 7, kategori: 'Wajib' },
    { id: 'm7_3', kode: 'FI410', nama: 'Mata Kuliah Pilihan 4', sks: 2, semester: 7, kategori: 'Pilihan' },
    { id: 'm7_4', kode: 'FI420', nama: 'Mata Kuliah Pilihan 5', sks: 2, semester: 7, kategori: 'Pilihan' },

    // Semester 8
    { id: 'm8_1', kode: 'FI499', nama: 'Skripsi', sks: 6, semester: 8, kategori: 'Wajib' }
];

export const GRADES = [
    { label: 'A', value: 4.0 },
    { label: 'A-', value: 3.7 },
    { label: 'B+', value: 3.4 },
    { label: 'B', value: 3.0 },
    { label: 'B-', value: 2.7 },
    { label: 'C+', value: 2.4 },
    { label: 'C', value: 2.0 },
    { label: 'D', value: 1.0 },
    { label: 'E', value: 0.0 },
];
