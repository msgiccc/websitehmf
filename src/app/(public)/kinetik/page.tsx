'use client';

import { useState, useMemo } from 'react';
import { DATA_MATKUL, GRADES } from '@/lib/data-matkul';
import { Target, Calculator, BookOpen, GraduationCap, ChevronDown } from 'lucide-react';

export default function KinetikPage() {
    // State 1: Menyimpan pilihan semester (Default sem 1)
    const [selectedSemester, setSelectedSemester] = useState<number>(1);

    // State 2: Menyimpan nilai yang dipilih mahasiswa { matkul_id: nilai_angka }
    const [gradesData, setGradesData] = useState<Record<string, number>>({});

    // State 3: Menampung IPK sebelum semester ini dan Total SKS kumulatif
    const [ipkSaatIni, setIpkSaatIni] = useState<string>('');
    const [totalSksLalu, setTotalSksLalu] = useState<string>('');

    // Filter Matkul berdasarkan semester yang dipilih
    const currentMatkuls = useMemo(() => {
        return DATA_MATKUL.filter(mk => mk.semester === selectedSemester);
    }, [selectedSemester]);

    // Handler untuk mengubah nilai Matkul
    const handleGradeChange = (matkulId: string, value: string) => {
        const numValue = parseFloat(value);
        setGradesData(prev => {
            const temp = { ...prev };
            if (isNaN(numValue)) {
                delete temp[matkulId]; // Hapus jika user me-reset
            } else {
                temp[matkulId] = numValue;
            }
            return temp;
        });
    };

    // Fungsi Kalkulasi IPS (Semester Berjalan)
    const { ips, totalSksSemester } = useMemo(() => {
        let sumSks = 0;
        let sumBobot = 0;

        currentMatkuls.forEach(mk => {
            const val = gradesData[mk.id];
            if (val !== undefined) {
                sumSks += mk.sks;
                sumBobot += (val * mk.sks);
            }
        });

        const calcIps = sumSks > 0 ? (sumBobot / sumSks) : 0;
        return {
            ips: calcIps.toFixed(2),
            totalSksSemester: sumSks
        };
    }, [currentMatkuls, gradesData]);

    // Fungsi Kalkulasi IPK Proyeksi
    const ipkProyeksi = useMemo(() => {
        const sksLaluNum = parseFloat(totalSksLalu) || 0;
        const ipkLaluNum = parseFloat(ipkSaatIni) || 0;

        // Jika tidak ada data masa lalu, kembalikan IPS saja
        if (sksLaluNum === 0) return ips;

        const bobotLalu = sksLaluNum * ipkLaluNum;

        let sumSksSemIni = 0;
        let sumBobotSemIni = 0;
        currentMatkuls.forEach(mk => {
            const val = gradesData[mk.id];
            if (val !== undefined) {
                sumSksSemIni += mk.sks;
                sumBobotSemIni += (val * mk.sks);
            }
        });

        const totSksSeluruh = sksLaluNum + sumSksSemIni;
        const totBobotSeluruh = bobotLalu + sumBobotSemIni;

        if (totSksSeluruh === 0) return "0.00";
        return (totBobotSeluruh / totSksSeluruh).toFixed(2);
    }, [ips, totalSksLalu, ipkSaatIni, currentMatkuls, gradesData]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-24">
            {/* Header KINETIK */}
            <div className="bg-[#0B1F3A] text-white py-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A24D]/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E63946]/20 rounded-full blur-3xl -ml-10 -mb-10"></div>

                <div className="container px-4 md:px-8 relative z-10 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl backdrop-blur-md mb-6 border border-white/20">
                        <Target className="w-8 h-8 text-[#F0C14B]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 flex justify-center items-center gap-3">
                        KINETIK <span className="bg-[#E63946] text-xs px-2 py-1 rounded-md uppercase tracking-widest align-middle">Beta</span>
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-gray-300 mb-6">
                        Kalkulator Indeks Nilai dan Evaluasi Target IPK Kampus
                    </p>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                        Alat bantu simulasi (Study Planner) interaktif mahasiswa Fisika UPI untuk menerka capaian Indeks Prestasi (IPS & IPK) secara seketika.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container px-4 md:px-8 py-12 flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* LEFT COLUMN: Input Control & Matkul List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-100 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Simulasi Matkul</h2>
                                        <p className="text-sm text-gray-500">Pilih nilai estimasi untuk semester berjalan.</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <select
                                        className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2.5 pl-4 pr-10 rounded-xl font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                                        value={selectedSemester}
                                        onChange={(e) => setSelectedSemester(parseInt(e.target.value))}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                                            <option key={s} value={s}>Semester {s}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-xs uppercase tracking-wider font-semibold text-gray-500 border-b border-gray-100">
                                            <th className="pb-4 pl-2 w-16 text-center">Kode</th>
                                            <th className="pb-4">Mata Kuliah</th>
                                            <th className="pb-4 text-center w-16">SKS</th>
                                            <th className="pb-4 text-center w-32">Pilih Nilai</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {currentMatkuls.map((matkul) => (
                                            <tr key={matkul.id} className="group hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 pl-2 text-center text-sm font-mono text-gray-400 group-hover:text-blue-500 transition-colors">
                                                    {matkul.kode}
                                                </td>
                                                <td className="py-4 pr-4">
                                                    <div className="font-medium text-gray-900">{matkul.nama}</div>
                                                    <div className="text-xs text-gray-400 mt-0.5">{matkul.kategori}</div>
                                                </td>
                                                <td className="py-4 text-center">
                                                    <span className="inline-block bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-1 rounded-md">
                                                        {matkul.sks} SKS
                                                    </span>
                                                </td>
                                                <td className="py-4 text-center">
                                                    <select
                                                        className="w-full max-w-[100px] bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 transition-shadow cursor-pointer hover:border-blue-300"
                                                        value={gradesData[matkul.id] !== undefined ? gradesData[matkul.id] : ""}
                                                        onChange={(e) => handleGradeChange(matkul.id, e.target.value)}
                                                    >
                                                        <option value="">- Set -</option>
                                                        {GRADES.map(g => (
                                                            <option key={g.label} value={g.value}>{g.label} ({g.value})</option>
                                                        ))}
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                        {currentMatkuls.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="py-8 text-center text-gray-500">Data Mata Kuliah Kosong</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Output Dashboard & Input IPK Lalu */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Widget: Hasil IPS Semester */}
                        <div className="bg-gradient-to-br from-[#0B1F3A] to-[#12315c] rounded-2xl shadow-lg border border-[#1b3d6b] p-6 md:p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-400/30 transition-all duration-700"></div>

                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <Calculator className="w-5 h-5 text-[#F0C14B]" />
                                <h3 className="font-semibold text-lg">Proyeksi IPS</h3>
                            </div>

                            <div className="relative z-10 flex flex-col items-center justify-center p-6 bg-black/20 rounded-xl border border-white/5 backdrop-blur-sm">
                                <span className="text-sm text-blue-200 mb-1 font-medium tracking-wide">Semester {selectedSemester}</span>
                                <div className="text-5xl lg:text-6xl font-black font-mono tracking-tighter text-[#F0C14B] filter drop-shadow-md">
                                    {ips}
                                </div>
                                <span className="text-xs text-gray-300 mt-3 bg-white/10 px-3 py-1 rounded-full">
                                    Total SKS: {totalSksSemester}
                                </span>
                            </div>
                        </div>

                        {/* Form: Prediksi IPK Kumulatif */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 relative overflow-hidden transition-all hover:shadow-md hover:border-blue-100">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg">Target IPK Kumulatif</h3>
                            </div>

                            <p className="text-sm text-gray-500 mb-6 pb-4 border-b border-gray-100 leading-relaxed">
                                Jika Anda ingin memprediksi IPK keseluruhan, lengkapi data perolehan semester-semester sebelumnya di sini.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Total SKS Lalu (SKS Lulus)</label>
                                    <input
                                        type="number"
                                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 transition-colors"
                                        placeholder="Contoh: 45"
                                        value={totalSksLalu}
                                        onChange={(e) => setTotalSksLalu(e.target.value)}
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">IPK Saat Ini</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 transition-colors"
                                        placeholder="Contoh: 3.85"
                                        value={ipkSaatIni}
                                        onChange={(e) => setIpkSaatIni(e.target.value)}
                                        min="0"
                                        max="4"
                                    />
                                </div>
                            </div>

                            <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100/50 text-center">
                                <span className="block text-xs font-bold text-blue-800 uppercase tracking-widest mb-2">Simulasi IPK Depan</span>
                                <div className="text-4xl font-black font-mono text-blue-600">
                                    {ipkProyeksi}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* Akhir Container Utama */}
        </div>
    );
}
