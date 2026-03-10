'use client';

import { useState, useMemo } from 'react';
import {
    ShoppingBag, Search, Filter, Instagram, Tag, Package, BookOpen,
    FlaskConical, PenTool, Cpu, MoreHorizontal, CheckCircle2, RefreshCw,
    ArrowUpRight, Sparkles, TrendingDown, Gift
} from 'lucide-react';
import type { OrbitItem, OrbitKategori } from '@/lib/data';

// ============================================================
// Konfigurasi Kategori
// ============================================================
const KATEGORI_CONFIG: Record<string, {
    label: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    border: string;
    gradient: string;
}> = {
    buku: { label: 'Buku', icon: BookOpen, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', gradient: 'from-blue-500 to-indigo-500' },
    jas_lab: { label: 'Jas Lab', icon: FlaskConical, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', gradient: 'from-emerald-500 to-teal-500' },
    alat_ukur: { label: 'Alat Ukur', icon: RefreshCw, color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', gradient: 'from-orange-500 to-red-500' },
    alat_tulis: { label: 'Alat Tulis', icon: PenTool, color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200', gradient: 'from-purple-500 to-violet-500' },
    elektronik: { label: 'Elektronik', icon: Cpu, color: 'text-cyan-700', bg: 'bg-cyan-50', border: 'border-cyan-200', gradient: 'from-cyan-500 to-blue-500' },
    lainnya: { label: 'Lainnya', icon: MoreHorizontal, color: 'text-gray-700', bg: 'bg-gray-50', border: 'border-gray-200', gradient: 'from-gray-500 to-slate-500' },
};

const KONDISI_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
    baru: { label: 'Baru', color: 'text-green-700', bg: 'bg-green-100' },
    baik: { label: 'Kondisi Baik', color: 'text-blue-700', bg: 'bg-blue-100' },
    cukup: { label: 'Kondisi Cukup', color: 'text-yellow-700', bg: 'bg-yellow-100' },
    butuh_perbaikan: { label: 'Butuh Perbaikan', color: 'text-red-700', bg: 'bg-red-100' },
};

const ALL_KATEGORI = ['semua', 'buku', 'jas_lab', 'alat_ukur', 'alat_tulis', 'elektronik', 'lainnya'] as const;

function formatHarga(harga: number): string {
    if (harga === 0) return 'Gratis 🎁';
    return `Rp ${harga.toLocaleString('id-ID')}`;
}

// ============================================================
// Card Komponen
// ============================================================
function OrbitCard({ item }: { item: OrbitItem }) {
    const cat = KATEGORI_CONFIG[item.kategori] || KATEGORI_CONFIG.lainnya;
    const kon = KONDISI_CONFIG[item.kondisi] || KONDISI_CONFIG.baik;
    const CatIcon = cat.icon;
    const isGratis = item.harga === 0;

    return (
        <div className={`group relative bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${item.is_terjual ? 'opacity-60' : ''}`}>
            {/* Badge Terjual */}
            {item.is_terjual && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 rounded-3xl">
                    <div className="bg-white text-gray-800 font-black text-xl px-6 py-3 rounded-2xl shadow-2xl rotate-[-10deg]">
                        ✅ Sudah Terjual
                    </div>
                </div>
            )}

            {/* Foto / Placeholder */}
            <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${cat.gradient}`}>
                {item.foto_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={item.foto_url}
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <CatIcon className="w-20 h-20 text-white/40" />
                    </div>
                )}

                {/* Harga Badge */}
                <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-xl font-black text-sm shadow-lg backdrop-blur-sm ${isGratis ? 'bg-green-500 text-white' : 'bg-white text-gray-900'}`}>
                    {isGratis ? <><Gift className="w-3.5 h-3.5 inline mr-1" />Gratis</> : formatHarga(item.harga)}
                </div>

                {/* Kategori Badge */}
                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold ${cat.bg} ${cat.color} shadow border ${cat.border}`}>
                    {cat.label}
                </div>
            </div>

            {/* Konten */}
            <div className="p-5">
                {/* Kondisi */}
                <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 ${kon.bg} ${kon.color}`}>
                    {kon.label}
                </span>

                <h3 className="font-bold text-gray-900 text-lg leading-snug mb-1.5 line-clamp-2 group-hover:text-[#0B1F3A] transition-colors">
                    {item.judul}
                </h3>

                {item.deskripsi && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">{item.deskripsi}</p>
                )}

                {/* Seller + IG CTA */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center shrink-0">
                            <Instagram className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-gray-700 truncate">{item.penjual_nama}</span>
                    </div>
                    {!item.is_terjual && (
                        <a
                            href={`https://www.instagram.com/${item.penjual_instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 hover:shadow-lg hover:scale-105 transition-all"
                        >
                            <Instagram className="w-3.5 h-3.5" />
                            DM @{item.penjual_instagram}
                            <ArrowUpRight className="w-3 h-3 opacity-70" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

// ============================================================
// Main ORBIT Client Component
// ============================================================
export default function OrbitClient({ initialData }: { initialData: OrbitItem[] }) {
    const [activeKategori, setActiveKategori] = useState<string>('semua');
    const [searchQuery, setSearchQuery] = useState('');
    const [showTerjual, setShowTerjual] = useState(false);

    const filteredItems = useMemo(() => {
        return initialData.filter(item => {
            const matchKategori = activeKategori === 'semua' || item.kategori === activeKategori;
            const matchSearch = !searchQuery ||
                item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.deskripsi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.penjual_nama.toLowerCase().includes(searchQuery.toLowerCase());
            const matchTerjual = showTerjual ? true : !item.is_terjual;
            return matchKategori && matchSearch && matchTerjual;
        });
    }, [initialData, activeKategori, searchQuery, showTerjual]);

    const availableCount = initialData.filter(i => !i.is_terjual).length;
    const totalCount = initialData.length;

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-20">

            {/* ====== HERO HEADER ====== */}
            <div className="bg-[#0B1F3A] text-white relative overflow-hidden py-12">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A24D]/20 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E63946]/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYwaDQydjQySDE4QzI3Ljk0IDQyIDM2IDMzLjk0IDM2IDI0VjE4eiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvZz48L3N2Zz4=')] opacity-40 pointer-events-none" />

                <div className="container px-4 md:px-8 relative z-10 max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl backdrop-blur-md mb-6 border border-white/20 shadow-lg">
                        <ShoppingBag className="w-8 h-8 text-[#C9A24D]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black font-serif mb-4 tracking-tight">ORBIT</h1>
                    <p className="text-xl md:text-2xl font-light text-blue-100 mb-3 tracking-wide">
                        Operan Ragam Barang dan Inventaris Terjangkau
                    </p>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto mb-8">
                        Pasar barang bekas ramah mahasiswa — buku teks, jas lab, alat ukur, dan lainnya.
                        Temukan yang kamu butuhkan atau bagikan kepada adik tingkat! 🎓
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                            <Package className="w-4 h-4 text-[#C9A24D]" />
                            {totalCount} item tersedia
                        </div>
                        <div className="flex items-center gap-2 bg-green-500/20 border border-green-400/30 px-4 py-2 rounded-full text-sm font-semibold text-green-300">
                            <Sparkles className="w-4 h-4" />
                            {availableCount} masih tersedia
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                            <TrendingDown className="w-4 h-4 text-[#C9A24D]" />
                            Harga miring mahasiswa
                        </div>
                    </div>
                </div>
            </div>

            {/* ====== FILTER BAR ====== */}
            <div className="bg-white sticky top-[68px] z-30 border-b border-gray-200 shadow-sm">
                <div className="container px-4 md:px-8 mx-auto max-w-7xl py-3 flex flex-col sm:flex-row gap-3 items-center">
                    {/* Search */}
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari barang, nama penjual..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] transition-all text-gray-700"
                        />
                    </div>

                    {/* Filter Kategori */}
                    <div className="flex overflow-x-auto scrollbar-hide gap-2 shrink-0">
                        {ALL_KATEGORI.map(kat => {
                            const cfg = kat === 'semua' ? null : KATEGORI_CONFIG[kat];
                            const catCount = kat === 'semua'
                                ? initialData.filter(i => !i.is_terjual).length
                                : initialData.filter(i => i.kategori === kat && !i.is_terjual).length;
                            return (
                                <button
                                    key={kat}
                                    onClick={() => setActiveKategori(kat)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${activeKategori === kat
                                            ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-sm'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                                        }`}
                                >
                                    {cfg && <cfg.icon className="w-3.5 h-3.5" />}
                                    {kat === 'semua' ? 'Semua' : cfg?.label}
                                    {catCount > 0 && (
                                        <span className={`text-[9px] px-1.5 rounded-full font-black ${activeKategori === kat ? 'bg-white/20' : 'bg-gray-100'}`}>
                                            {catCount}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Toggle Terjual */}
                    <button
                        onClick={() => setShowTerjual(v => !v)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all shrink-0 ${showTerjual ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-500 border-gray-200'}`}
                    >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Tampilkan Terjual
                    </button>
                </div>
            </div>

            {/* ====== GRID LISTING ====== */}
            <div className="container px-4 md:px-8 py-8 mx-auto max-w-7xl">
                {filteredItems.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                            <ShoppingBag className="w-9 h-9 text-gray-300" />
                        </div>
                        <p className="text-gray-600 font-bold text-lg">Tidak ada barang yang cocok</p>
                        <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto">
                            Coba ubah filter pencarian atau kategori yang dipilih.
                        </p>
                        <button onClick={() => { setSearchQuery(''); setActiveKategori('semua'); }} className="mt-4 px-5 py-2.5 bg-[#0B1F3A] text-white text-sm font-bold rounded-xl hover:bg-[#0B1F3A]/80 transition-colors">
                            Reset Filter
                        </button>
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-gray-500 mb-5 font-medium">
                            Menampilkan <span className="font-bold text-gray-800">{filteredItems.length}</span> barang
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filteredItems.map(item => (
                                <OrbitCard key={item.id} item={item} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* ====== INFO BANNER ====== */}
            <div className="container px-4 md:px-8 mx-auto max-w-7xl mb-8">
                <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1a0b40] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A24D]/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
                            <ShoppingBag className="w-8 h-8 text-[#C9A24D]" />
                        </div>
                        <div className="flex-1">
                            <h2 className="font-black text-xl mb-1">Mau Jual atau Donasikan Barangmu?</h2>
                            <p className="text-blue-100 text-sm leading-relaxed max-w-lg">
                                Hubungi admin HMF untuk menambahkan listing barangmu ke ORBIT.
                                Sertakan foto, deskripsi, harga (boleh gratis!), dan username Instagram-mu.
                            </p>
                        </div>
                        <a
                            href="https://www.instagram.com/hmffpmipaupi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 flex items-center gap-2 px-5 py-3 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 rounded-xl font-bold text-sm hover:shadow-lg hover:scale-105 transition-all"
                        >
                            <Instagram className="w-4 h-4" />
                            DM Admin HMF
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
