'use client';

import { useState, useMemo } from 'react';
import { DATA_MATKUL, GRADES, MataKuliah, ProdiType } from '@/lib/data-matkul';
import { Target, Calculator, BookOpen, GraduationCap, Plus, Search, Trash2, X } from 'lucide-react';

type SelectedCourse = {
    id: string; // Bisa ID unik dari DB atau kombinasi acak untuk manual
    kode: string;
    nama: string;
    sks: number;
    grade: number | null; // null = Belum ada nilai (tidak dihitung IPK)
    isManual?: boolean;
};

type SemesterData = {
    id: number;
    courses: SelectedCourse[];
};

export default function KinetikPage() {
    // ==== STATE UTAMA ====
    const [selectedProdi, setSelectedProdi] = useState<ProdiType>('PendFisika');
    const [semesters, setSemesters] = useState<SemesterData[]>(
        Array.from({ length: 8 }, (_, i) => ({ id: i + 1, courses: [] }))
    );

    // ==== STATE UNTUK MODAL TAMBAH MATKUL ====
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTargetSemester, setActiveTargetSemester] = useState<number>(1);

    // Tab Modal: 'DB' untuk ambil dari List, 'MANUAL' untuk nambah custom
    const [modalTab, setModalTab] = useState<'DB' | 'MANUAL'>('DB');

    // Search DB
    const [searchQuery, setSearchQuery] = useState('');

    // Form Input Manual
    const [manualNama, setManualNama] = useState('');
    const [manualKode, setManualKode] = useState('');
    const [manualSks, setManualSks] = useState<number>(2);

    // ==========================================
    // LOGIKA PERHITUNGAN
    // ==========================================

    // Hitung IPS (Indeks Prestasi Semester) per semester
    const getIpsSemester = (semesterId: number) => {
        const sem = semesters.find(s => s.id === semesterId);
        if (!sem || sem.courses.length === 0) return { ips: "0.00", sksTotal: 0 };

        let sumBobot = 0;
        let sumSksDiampu = 0; // Hanya menghitung SKS yang SUDAH ADA NILAINYA

        sem.courses.forEach(mk => {
            if (mk.grade !== null) {
                sumSksDiampu += mk.sks;
                sumBobot += (mk.grade * mk.sks);
            }
        });

        // Tampilkan SKS di box tersebut adalah total SEMUA SKS yang dimasukkan
        const totalSksMasuk = sem.courses.reduce((acc, curr) => acc + curr.sks, 0);

        if (sumSksDiampu === 0) return { ips: "0.00", sksTotal: totalSksMasuk };
        return { ips: (sumBobot / sumSksDiampu).toFixed(2), sksTotal: totalSksMasuk };
    };

    // Hitung IPK GLOBAL (Semua Komponen yang punya nilai ditarik jadi satu)
    const ipkGlobal = useMemo(() => {
        let totalSksKumulatif = 0;
        let totalBobotKumulatif = 0;

        semesters.forEach(sem => {
            sem.courses.forEach(mk => {
                // Yang grade-nya belum diisi tidak ikut membagi/menambah
                if (mk.grade !== null) {
                    totalSksKumulatif += mk.sks;
                    totalBobotKumulatif += (mk.grade * mk.sks);
                }
            });
        });

        if (totalSksKumulatif === 0) return { ipk: "0.00", sks: 0 };
        return {
            ipk: (totalBobotKumulatif / totalSksKumulatif).toFixed(2),
            sks: totalSksKumulatif
        };
    }, [semesters]);

    // ==========================================
    // FUNGSI AKSI USER (HANDLER)
    // ==========================================

    // Mengubah Nilai / Grade Sebuah Matkul 
    const handleGradeChange = (semesterId: number, mkId: string, val: string) => {
        const numVal = val === "" ? null : parseFloat(val);
        setSemesters(prev => prev.map(sem => {
            if (sem.id !== semesterId) return sem;
            return {
                ...sem,
                courses: sem.courses.map(c => c.id === mkId ? { ...c, grade: numVal } : c)
            };
        }));
    };

    // Menghapus Matkul dari Semester
    const handleDeleteMatkul = (semesterId: number, mkId: string) => {
        setSemesters(prev => prev.map(sem => {
            if (sem.id !== semesterId) return sem;
            return {
                ...sem,
                courses: sem.courses.filter(c => c.id !== mkId)
            };
        }));
    };

    // Panggil Buka Modal (Disetor ID Semester Targetnya)
    const openAddModal = (semesterId: number) => {
        setActiveTargetSemester(semesterId);
        setIsModalOpen(true);
        setSearchQuery("");
        setModalTab('DB');
    };

    // Menambah Matkul dari DB ke Semester Target
    const addMatkulFromDB = (m: MataKuliah) => {
        // Cek apakah sudah ada (mencegah double ID yang sama persis)
        // Meski tidak wajib strictly, UI jadi lebih rapih
        const currentSem = semesters.find(s => s.id === activeTargetSemester);
        if (currentSem?.courses.some(c => c.id === m.id)) {
            alert("Mata kuliah ini sudah ada di semester ini!");
            return;
        }

        const newCourse: SelectedCourse = {
            id: m.id,
            kode: m.kode,
            nama: m.nama,
            sks: m.sks,
            grade: null
        };

        setSemesters(prev => prev.map(sem => {
            if (sem.id !== activeTargetSemester) return sem;
            return { ...sem, courses: [...sem.courses, newCourse] };
        }));

        setIsModalOpen(false); // Tutup otomatis usai pilh
    };

    // Menambah Matkul Manual (Konversi/Luar)
    const addManualMatkul = (e: React.FormEvent) => {
        e.preventDefault();
        if (!manualNama || !manualSks) return;

        const newCourse: SelectedCourse = {
            id: `manual_${Date.now()}`,
            kode: manualKode || '-',
            nama: manualNama,
            sks: Number(manualSks),
            grade: null,
            isManual: true,
        };

        setSemesters(prev => prev.map(sem => {
            if (sem.id !== activeTargetSemester) return sem;
            return { ...sem, courses: [...sem.courses, newCourse] };
        }));

        // Reset & Tutup
        setManualNama('');
        setManualKode('');
        setManualSks(2);
        setIsModalOpen(false);
    };

    // Filter Data DB Berdasarkan Prodi Aktif & Search
    const filteredDBMatkuls = DATA_MATKUL.filter(m => {
        const matchProdi = m.prodi.includes('Umum') || m.prodi.includes(selectedProdi);
        const matchSearch = m.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.kode.toLowerCase().includes(searchQuery.toLowerCase());
        return matchProdi && matchSearch;
    });

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-20">
            {/* Header KINETIK */}
            <div className="bg-[#0B1F3A] text-white py-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A24D]/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E63946]/20 rounded-full blur-3xl -ml-10 -mb-10"></div>

                <div className="container px-4 md:px-8 relative z-10 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl backdrop-blur-md mb-6 border border-white/20 shadow-lg">
                        <Target className="w-8 h-8 text-[#F0C14B]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 flex justify-center items-center gap-3">
                        KINETIK V2.0
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-xs px-2.5 py-1 rounded-md uppercase tracking-widest align-middle shadow-md border border-green-400/50">Free Planner</span>
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-blue-100 mb-4 tracking-wide">
                        Kalkulator Indeks Nilai dan Evaluasi Target IPK Kampus
                    </p>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
                        Alat bantu *Study Planner* interaktif mahasiswa Fisika UPI. Rangkai matkul secara bebas lintas semester, atur nilai imajiner, dan lihat lonjakan IPK gabungan Anda secara *real-time*!
                    </p>
                </div>
            </div>

            {/* CONTAINER DUA KOLOM BESAR */}
            <div className="container px-4 md:px-8 py-8 mt-4">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* LEFT COLUMN: GLOBAL DASHBOARD (STICKY) */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">

                        {/* Selector Prodi */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2"><BookOpen className="w-4 h-4 inline mr-2 align-text-bottom" />Program Studi Basis Data</h3>
                            <div className="flex bg-gray-100/50 p-1.5 rounded-xl border border-gray-200/60">
                                <button
                                    onClick={() => setSelectedProdi('PendFisika')}
                                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${selectedProdi === 'PendFisika' ? 'bg-white text-blue-700 shadow border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Pendidikan Fisika
                                </button>
                                <button
                                    onClick={() => setSelectedProdi('Fisika')}
                                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${selectedProdi === 'Fisika' ? 'bg-white text-blue-700 shadow border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Fisika Murni
                                </button>
                            </div>
                            <p className="text-[11px] text-gray-400 mt-3 text-center">
                                Basis Data otomatis memfilter mata kuliah dari program studi yang sesuai saat *Mencari* di *Pop-up*.
                            </p>
                        </div>

                        {/* Hasil Kumulatif IPK */}
                        <div className="bg-gradient-to-br from-[#0B1F3A] to-[#163B6B] rounded-3xl shadow-xl border border-blue-900 overflow-hidden relative group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-[#C9A24D]/20 transition-all duration-700"></div>

                            <div className="p-8 text-center relative z-10">
                                <div className="inline-flex justify-center items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10 mb-5">
                                    <GraduationCap className="h-6 w-6 text-[#F0C14B]" />
                                </div>
                                <h3 className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-2">Simulasi IPK Kumulatif</h3>

                                <div className="flex items-end justify-center gap-2">
                                    <span className="text-6xl font-black text-white tracking-tighter filter drop-shadow-md">
                                        {ipkGlobal.ipk}
                                    </span>
                                    <span className="text-blue-300 font-medium pb-2 text-xl">/ 4.00</span>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center px-4 bg-black/20 rounded-xl py-4 backdrop-blur-md">
                                    <div className="text-left">
                                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Total SKS Diperhitungkan</div>
                                        <div className="text-lg font-bold text-white leading-none">{ipkGlobal.sks} <span className="text-xs font-normal text-gray-300">SKS</span></div>
                                    </div>
                                    <div className="h-8 w-px bg-white/10"></div>
                                    <div className="text-right">
                                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Total Matkul Disilang</div>
                                        <div className="text-lg font-bold text-white leading-none">
                                            {semesters.reduce((acc, sem) => acc + sem.courses.filter(c => c.grade !== null).length, 0)} <span className="text-xs font-normal text-gray-300">MK</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: STUDY PLANNER BLOCKS */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* ITERASI 8 SEMESTER */}
                        {semesters.map((sem) => {
                            const { ips, sksTotal } = getIpsSemester(sem.id);

                            return (
                                <div key={sem.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:border-blue-300 transition-colors">

                                    {/* Header Semester Box */}
                                    <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <h2 className="text-xl font-black text-gray-800 tracking-tight">Semester {sem.id}</h2>
                                            <p className="text-sm text-gray-500 font-medium">IPS: <span className="font-bold text-blue-600 ml-1">{ips}</span> <span className="mx-2 text-gray-300">|</span> Pengambilan Terekam: {sksTotal} SKS</p>
                                        </div>
                                        <button
                                            onClick={() => openAddModal(sem.id)}
                                            className="px-4 py-2 bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-600 text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2 group w-full md:w-auto justify-center"
                                        >
                                            <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                                            Tambah Matkul
                                        </button>
                                    </div>

                                    {/* List Mata Kuliah */}
                                    <div className="p-0">
                                        {sem.courses.length === 0 ? (
                                            <div className="p-10 text-center flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                                    <BookOpen className="w-6 h-6 text-gray-300" />
                                                </div>
                                                <p className="text-gray-400 font-medium">Kotak semester ini masih kosong.</p>
                                                <p className="text-xs text-gray-400 mt-1">Klik tombol Tambah di atas untuk mendesain kurikulum Anda.</p>
                                            </div>
                                        ) : (
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left">
                                                    <thead>
                                                        <tr className="bg-gray-50/30 text-xs uppercase tracking-wider font-bold text-gray-400">
                                                            <th className="py-3 px-6 w-16">Kode</th>
                                                            <th className="py-3 px-6">Mata Kuliah</th>
                                                            <th className="py-3 px-6 text-center w-20">SKS</th>
                                                            <th className="py-3 px-6 text-center w-36">Nilai (Grade)</th>
                                                            <th className="py-3 px-4 w-12 text-center"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        {sem.courses.map((mk) => (
                                                            <tr key={mk.id} className="hover:bg-blue-50/20 transition-colors">
                                                                <td className="py-4 px-6 text-sm font-mono text-gray-500">{mk.kode}</td>
                                                                <td className="py-4 px-6">
                                                                    <div className="font-semibold text-gray-800">{mk.nama}</div>
                                                                    {mk.isManual && <div className="text-[10px] text-orange-500 font-bold tracking-widest uppercase mt-0.5">Input Manual</div>}
                                                                </td>
                                                                <td className="py-4 px-6 text-center">
                                                                    <span className="inline-block bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-md border border-gray-200/50">
                                                                        {mk.sks} SKS
                                                                    </span>
                                                                </td>
                                                                <td className="py-4 px-6 text-center">
                                                                    <div className="relative">
                                                                        <select
                                                                            value={mk.grade !== null ? mk.grade.toString() : ""}
                                                                            onChange={(e) => handleGradeChange(sem.id, mk.id, e.target.value)}
                                                                            className={`w-full appearance-none px-3 py-2 rounded-lg text-sm font-bold border ${mk.grade !== null ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]' : 'bg-white border-gray-200 text-gray-500 hover:border-blue-300'} focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer text-center`}
                                                                        >
                                                                            <option value="">-- set --</option>
                                                                            {GRADES.map(g => (
                                                                                <option key={g.label} value={g.value}>{g.label} ({g.value})</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </td>
                                                                <td className="py-4 px-4 text-center">
                                                                    <button
                                                                        onClick={() => handleDeleteMatkul(sem.id, mk.id)}
                                                                        className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                                                        title="Hapus Matkul"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                    {/* END RIGHT COLUMN */}

                </div>
            </div>

            {/* MODAL POP-UP TAMBAH MATKUL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>

                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-2xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">

                        {/* Modal Header */}
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Tambahkan Matkul</h3>
                                <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mt-1">Ke Semester {activeTargetSemester}</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Tabs */}
                        <div className="flex border-b border-gray-200 px-6">
                            <button
                                className={`px-4 py-3 font-semibold text-sm border-b-2 transition-colors ${modalTab === 'DB' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                                onClick={() => setModalTab('DB')}
                            >
                                Cari di Database
                            </button>
                            <button
                                className={`px-4 py-3 font-semibold text-sm border-b-2 transition-colors ${modalTab === 'MANUAL' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                                onClick={() => setModalTab('MANUAL')}
                            >
                                Input Manual
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 h-[400px] overflow-y-auto bg-gray-50/30">

                            {modalTab === 'DB' && (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Cari matkul fisika atau kodenya..."
                                            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 shadow-sm transition-all"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            autoFocus
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {filteredDBMatkuls.map(m => (
                                            <div key={m.id} className="bg-white border border-gray-200/60 p-3 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group flex flex-col justify-between cursor-pointer" onClick={() => addMatkulFromDB(m)}>
                                                <div>
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="text-[10px] font-mono text-gray-400">{m.kode}</span>
                                                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">Sem {m.semester}</span>
                                                    </div>
                                                    <h4 className="font-semibold text-gray-800 leading-tight mb-1 group-hover:text-blue-600 transition-colors">{m.nama}</h4>
                                                </div>
                                                <div className="flex justify-between items-end mt-3">
                                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded font-medium">{m.kategori || 'Matkul'}</span>
                                                    <span className="text-xs font-black text-gray-700 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">{m.sks} SKS</span>
                                                </div>
                                            </div>
                                        ))}
                                        {filteredDBMatkuls.length === 0 && (
                                            <div className="col-span-1 md:col-span-2 text-center py-10 text-gray-500">
                                                Tidak ada mata kuliah yang cocok untuk Prodi terpilih. Coba ganti kata kunci.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {modalTab === 'MANUAL' && (
                                <form onSubmit={addManualMatkul} className="space-y-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="space-y-4">
                                        <div className="bg-orange-50/50 border border-orange-100 p-3 rounded-lg text-sm text-orange-800 mb-6">
                                            Fitur ini diperuntukkan bagi mata kuliah <strong>Konversi, Lintas Jurusan, atau MBKM</strong> yang SKS-nya tidak masuk di dalam kurikulum utama.
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">Nama Matkul *</label>
                                            <input
                                                required
                                                type="text"
                                                value={manualNama}
                                                onChange={e => setManualNama(e.target.value)}
                                                placeholder="Contoh: Kewirausahaan Pemuda"
                                                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none"
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">Kode (Opsional)</label>
                                                <input
                                                    type="text"
                                                    value={manualKode}
                                                    onChange={e => setManualKode(e.target.value)}
                                                    placeholder="Contoh: UN123"
                                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none"
                                                />
                                            </div>
                                            <div className="w-24">
                                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">SKS *</label>
                                                <input
                                                    required
                                                    type="number"
                                                    min="1"
                                                    max="20"
                                                    value={manualSks}
                                                    onChange={e => setManualSks(Number(e.target.value))}
                                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none text-center font-bold font-mono"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-[#0B1F3A] hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl uppercase tracking-widest text-sm transition-colors shadow-md mt-4"
                                    >
                                        Tambahkan Sekarang
                                    </button>
                                </form>
                            )}

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
