'use client';

import { useState, useMemo } from 'react';
import {
    Store, Search, ShoppingCart, Instagram, MessageCircle,
    UtensilsCrossed, Smartphone, Gift, Wrench, MoreHorizontal,
    ExternalLink, Sparkles, Tag, Flame, Star, Package,
    ArrowUpRight, Zap, BadgePercent
} from 'lucide-react';
import type { FluksItem, FluksKategori } from '@/lib/data';

// ============================================================
// Konfigurasi
// ============================================================
const KATEGORI_CONFIG: Record<string, {
    label: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    border: string;
    gradient: string;
}> = {
    makanan: { label: 'Makanan', icon: UtensilsCrossed, color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', gradient: 'from-orange-500 to-red-500' },
    aplikasi: { label: 'Aplikasi', icon: Smartphone, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', gradient: 'from-blue-500 to-indigo-500' },
    merchandise: { label: 'Merchandise', icon: Gift, color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200', gradient: 'from-purple-500 to-violet-500' },
    layanan: { label: 'Layanan', icon: Wrench, color: 'text-teal-700', bg: 'bg-teal-50', border: 'border-teal-200', gradient: 'from-teal-500 to-emerald-500' },
    lainnya: { label: 'Lainnya', icon: MoreHorizontal, color: 'text-gray-700', bg: 'bg-gray-50', border: 'border-gray-200', gradient: 'from-gray-500 to-slate-500' },
};

const STOK_CONFIG: Record<string, { label: string; color: string; bg: string; dot: string }> = {
    tersedia: { label: 'Tersedia', color: 'text-green-700', bg: 'bg-green-100', dot: 'bg-green-500' },
    terbatas: { label: 'Terbatas', color: 'text-amber-700', bg: 'bg-amber-100', dot: 'bg-amber-500' },
    habis: { label: 'Habis', color: 'text-red-700', bg: 'bg-red-100', dot: 'bg-red-500' },
};

const BADGE_STYLE: Record<string, string> = {
    'Terlaris': 'bg-red-500 text-white',
    'Baru': 'bg-blue-500 text-white',
    'Diskon': 'bg-green-500 text-white',
    'Limited': 'bg-purple-500 text-white',
};

const KATEGORI_ORDER = ['semua', 'makanan', 'aplikasi', 'merchandise', 'layanan', 'lainnya'] as const;

function formatHarga(harga: number): string {
    if (harga === 0) return 'Gratis';
    return `Rp ${harga.toLocaleString('id-ID')}`;
}

function buildOrderUrl(item: FluksItem): string {
    if (!item.link_order) return '#';
    if (item.tipe_link === 'instagram') {
        const username = item.link_order.replace(/^@/, '').replace(/https?:\/\/(www\.)?instagram\.com\//, '');
        return `https://www.instagram.com/${username}`;
    }
    if (item.tipe_link === 'whatsapp') {
        const phone = item.link_order.replace(/\D/g, '');
        return `https://wa.me/${phone}`;
    }
    return item.link_order;
}

// ============================================================
// Product Card
// ============================================================
function FluksCard({ item }: { item: FluksItem }) {
    const cat = KATEGORI_CONFIG[item.kategori] || KATEGORI_CONFIG.lainnya;
    const stok = STOK_CONFIG[item.stok] || STOK_CONFIG.tersedia;
    const CatIcon = cat.icon;
    const isHabis = item.stok === 'habis';
    const orderUrl = buildOrderUrl(item);
    const badgeClass = item.badge ? (BADGE_STYLE[item.badge] || 'bg-gray-700 text-white') : null;

    return (
        <div className={`group relative bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col ${isHabis ? 'opacity-60' : ''}`}>
            {/* Badge (Terlaris, Baru, dsb) */}
            {item.badge && badgeClass && (
                <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow ${badgeClass}`}>
                    {item.badge === 'Terlaris' && <Flame className="w-3 h-3 inline mr-1" />}
                    {item.badge === 'Diskon' && <BadgePercent className="w-3 h-3 inline mr-1" />}
                    {item.badge === 'Baru' && <Star className="w-3 h-3 inline mr-1" />}
                    {item.badge}
                </div>
            )}

            {/* Foto / Placeholder */}
            <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${cat.gradient} shrink-0`}>
                {item.foto_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={item.foto_url}
                        alt={item.nama}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <CatIcon className="w-20 h-20 text-white/30" />
                    </div>
                )}

                {/* Overlay habis */}
                {isHabis && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-white text-gray-800 font-black text-base px-4 py-2 rounded-xl rotate-[-8deg] shadow-xl">
                            HABIS
                        </span>
                    </div>
                )}

                {/* Harga pill */}
                <div className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-xl font-black text-sm shadow-lg backdrop-blur-sm ${item.harga === 0 ? 'bg-green-500 text-white' : 'bg-white text-gray-900'}`}>
                    {formatHarga(item.harga)}
                </div>
            </div>

            {/* Konten */}
            <div className="p-5 flex flex-col flex-1">
                {/* Kategori + Stok */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${cat.bg} ${cat.color} border ${cat.border}`}>
                        {cat.label}
                    </span>
                    <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${stok.bg} ${stok.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${stok.dot}`} />
                        {stok.label}
                    </span>
                </div>

                <h3 className="font-black text-gray-900 text-lg leading-snug mb-1.5 group-hover:text-[#0B1F3A] transition-colors line-clamp-2">
                    {item.nama}
                </h3>

                {item.deskripsi && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed flex-1">{item.deskripsi}</p>
                )}

                {/* Tombol Order */}
                <div className="mt-auto pt-3 border-t border-gray-100">
                    {!isHabis && item.link_order ? (
                        <a
                            href={orderUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-black text-white transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r ${cat.gradient}`}
                        >
                            {item.tipe_link === 'instagram' && <Instagram className="w-4 h-4" />}
                            {item.tipe_link === 'whatsapp' && <MessageCircle className="w-4 h-4" />}
                            {item.tipe_link === 'lainnya' && <ExternalLink className="w-4 h-4" />}
                            {item.tipe_link === 'instagram' ? 'Order via Instagram' : item.tipe_link === 'whatsapp' ? 'Order via WhatsApp' : 'Order Sekarang'}
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                        </a>
                    ) : (
                        <div className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold bg-gray-100 text-gray-400 cursor-not-allowed">
                            <Package className="w-4 h-4" />
                            {isHabis ? 'Stok Habis' : 'Belum Tersedia'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ============================================================
// Main FLUKS Client Component
// ============================================================
export default function FluksClient({ initialData }: { initialData: FluksItem[] }) {
    const [activeKategori, setActiveKategori] = useState<string>('semua');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = useMemo(() => {
        return initialData.filter(item => {
            const matchKat = activeKategori === 'semua' || item.kategori === activeKategori;
            const matchQ = !searchQuery ||
                item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.deskripsi?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchKat && matchQ;
        });
    }, [initialData, activeKategori, searchQuery]);

    const tersediaCount = initialData.filter(i => i.stok !== 'habis').length;

    return (
        <div className="min-h-screen bg-[#FFF8F0] pb-24 pt-20">

            {/* ====== HERO ====== */}
            <div className="bg-gradient-to-br from-[#0B1F3A] via-[#1a0b40] to-[#0B1F3A] text-white relative overflow-hidden py-14">
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYwaDQydjQySDE4QzI3Ljk0IDQyIDM2IDMzLjk0IDM2IDI0VjE4eiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvZz48L3N2Zz4=')] opacity-40 pointer-events-none" />

                <div className="container px-4 md:px-8 relative z-10 max-w-5xl mx-auto text-center">
                    {/* Ikon + Label Ekobis */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg">
                            <Store className="w-8 h-8 text-orange-400" />
                        </div>
                        <span className="text-xs font-bold tracking-[0.25em] uppercase bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full text-orange-300">
                            Divisi Ekonomi & Bisnis · HMF FPMIPA UPI
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black font-serif mb-4 tracking-tight">
                        FLUKS
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-orange-100 mb-3 tracking-wide">
                        Fasilitas Layanan Usaha dan Kebutuhan Sekitar
                    </p>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto mb-8">
                        Etalase digital resmi danusan Ekobis HMF — dari makanan, aplikasi premium,
                        merchandise, hingga berbagai layanan terjangkau untuk mahasiswa.
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                            <Zap className="w-4 h-4 text-orange-400" />
                            {initialData.length} produk tersedia
                        </div>
                        <div className="flex items-center gap-2 bg-green-500/20 border border-green-400/30 px-4 py-2 rounded-full text-sm font-semibold text-green-300">
                            <Sparkles className="w-4 h-4" />
                            {tersediaCount} siap diorder
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
                            placeholder="Cari produk danusan..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all text-gray-700"
                        />
                    </div>

                    {/* Filter Kategori */}
                    <div className="flex overflow-x-auto scrollbar-hide gap-2 shrink-0">
                        {KATEGORI_ORDER.map(kat => {
                            const cfg = kat === 'semua' ? null : KATEGORI_CONFIG[kat];
                            const count = kat === 'semua'
                                ? initialData.length
                                : initialData.filter(i => i.kategori === kat).length;
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
                                    {count > 0 && (
                                        <span className={`text-[9px] px-1.5 rounded-full font-black ${activeKategori === kat ? 'bg-white/20' : 'bg-gray-100'}`}>
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ====== PRODUCT GRID ====== */}
            <div className="container px-4 md:px-8 py-8 mx-auto max-w-7xl">
                {filteredItems.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-100">
                            <Store className="w-9 h-9 text-orange-300" />
                        </div>
                        <p className="text-gray-600 font-bold text-lg">Produk tidak ditemukan</p>
                        <p className="text-gray-400 text-sm mt-1">Coba ubah filter atau kata kunci pencarian.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setActiveKategori('semua'); }}
                            className="mt-4 px-5 py-2.5 bg-[#0B1F3A] text-white text-sm font-bold rounded-xl hover:bg-[#0B1F3A]/80 transition-colors"
                        >
                            Reset Filter
                        </button>
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-gray-500 mb-5 font-medium">
                            Menampilkan <span className="font-bold text-gray-800">{filteredItems.length}</span> produk
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filteredItems.map(item => (
                                <FluksCard key={item.id} item={item} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* ====== BANNER EKOBIS ====== */}
            <div className="container px-4 md:px-8 mx-auto max-w-7xl mb-8">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white p-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="p-4 bg-white/20 rounded-2xl border border-white/30">
                            <ShoppingCart className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                            <h2 className="font-black text-xl mb-1">Dukung Danusan Ekobis HMF!</h2>
                            <p className="text-orange-100 text-sm leading-relaxed max-w-lg">
                                Setiap pembelian mendukung program & kegiatan mahasiswa Fisika UPI.
                                Ada produk atau danusan yang ingin kamu ajukan? Hubungi Ekobis HMF!
                            </p>
                        </div>
                        <a
                            href="https://www.instagram.com/hmffpmipaupi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 flex items-center gap-2 px-5 py-3 bg-white text-orange-600 rounded-xl font-black text-sm hover:shadow-xl hover:scale-105 transition-all"
                        >
                            <Instagram className="w-4 h-4" />
                            Hubungi Ekobis
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
