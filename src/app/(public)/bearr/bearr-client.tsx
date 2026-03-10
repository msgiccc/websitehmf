'use client';

import { useState } from 'react';
import { BookOpen, Database, Smartphone, MessageCircle, BookMarked, ExternalLink, FileText, ChevronRight, Zap, FolderOpen, ClipboardList, Eye, X, Maximize2, Minimize2, Folder } from 'lucide-react';
import type { BearrLink, BearrKategori } from '@/lib/data';

// Konfigurasi tiap Kategori
const KATEGORI_CONFIG: Record<BearrKategori, {
    label: string;
    desc: string;
    color: string;
    bgColor: string;
    borderColor: string;
    hoverBorder: string;
    icon: React.ElementType;
    accentFrom: string;
    accentTo: string;
}> = {
    bank_soal: {
        label: 'Bank Soal',
        desc: 'Kumpulan soal ujian & latihan dari berbagai mata kuliah Fisika UPI.',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-100',
        hoverBorder: 'hover:border-blue-400',
        icon: BookOpen,
        accentFrom: 'from-blue-500',
        accentTo: 'to-indigo-500',
    },
    referensi: {
        label: 'Referensi Belajar',
        desc: 'Catatan & materi belajar sumbangan sukarela dari mahasiswa Fisika UPI.',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-100',
        hoverBorder: 'hover:border-emerald-400',
        icon: BookMarked,
        accentFrom: 'from-emerald-500',
        accentTo: 'to-teal-500',
    },
    ebook: {
        label: 'E-Book',
        desc: 'Perpustakaan digital untuk mahasiswa. Ajukan e-book baru lewat formulir.',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-100',
        hoverBorder: 'hover:border-amber-400',
        icon: FileText,
        accentFrom: 'from-amber-500',
        accentTo: 'to-orange-500',
    },
    aplikasi: {
        label: 'Aplikasi',
        desc: 'Rekomendasi aplikasi & tools berguna untuk mahasiswa Fisika. Ajukan juga rekomendasimu!',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-100',
        hoverBorder: 'hover:border-purple-400',
        icon: Smartphone,
        accentFrom: 'from-purple-500',
        accentTo: 'to-violet-500',
    },
    responsi: {
        label: 'Responsi',
        desc: 'Layanan belajar bersama dan tanya jawab langsung bersama kakak tingkat.',
        color: 'text-rose-600',
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-100',
        hoverBorder: 'hover:border-rose-400',
        icon: MessageCircle,
        accentFrom: 'from-rose-500',
        accentTo: 'to-red-500',
    },
};

const TIPE_ICON: Record<string, React.ElementType> = {
    drive: FolderOpen,
    form: ClipboardList,
    list: Database,
    wa: MessageCircle,
    lainnya: ExternalLink,
};

const TIPE_LABEL: Record<string, string> = {
    drive: 'Buka Google Drive',
    form: 'Isi Formulir',
    list: 'Lihat Daftar',
    wa: 'Hubungi via WhatsApp',
    lainnya: 'Buka Tautan',
};

const KATEGORI_ORDER: BearrKategori[] = ['bank_soal', 'referensi', 'ebook', 'aplikasi', 'responsi'];

/**
 * Mengkonversi berbagai format URL Google Drive menjadi embed info.
 * Mengembalikan { url, type } atau null jika bukan Drive.
 */
function toDriveEmbedInfo(url: string): { url: string; type: 'file' | 'folder' } | null {
    if (!url) return null;

    // Folder: https://drive.google.com/drive/folders/FOLDER_ID
    const folderMatch = url.match(/drive\.google\.com\/drive\/folders\/([a-zA-Z0-9_-]+)/);
    if (folderMatch) {
        return {
            url: `https://drive.google.com/embeddedfolderview?id=${folderMatch[1]}#list`,
            type: 'folder',
        };
    }

    // File: https://drive.google.com/file/d/FILE_ID/...
    const fileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch) {
        return {
            url: `https://drive.google.com/file/d/${fileMatch[1]}/preview`,
            type: 'file',
        };
    }

    // Shared link: https://drive.google.com/open?id=FILE_ID
    const openMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
    if (openMatch) {
        return {
            url: `https://drive.google.com/file/d/${openMatch[1]}/preview`,
            type: 'file',
        };
    }

    // Google Docs/Sheets/Slides
    const docsMatch = url.match(/docs\.google\.com\/(?:document|spreadsheets|presentation)\/d\/([a-zA-Z0-9_-]+)/);
    if (docsMatch) {
        return {
            url: `${url.split('/edit')[0]}/preview`,
            type: 'file',
        };
    }

    return null;
}

// ============================================================
//  Google Drive Viewer Modal (File PDF & Folder)
// ============================================================
function DriveModal({
    url,
    title,
    type,
    originalUrl,
    onClose,
    accentFrom,
    accentTo,
}: {
    url: string;
    title: string;
    type: 'file' | 'folder';
    originalUrl: string;
    onClose: () => void;
    accentFrom: string;
    accentTo: string;
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const isFolder = type === 'folder';
    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8"
            aria-modal="true"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                className={`relative z-10 w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${isExpanded
                    ? 'h-[98vh] max-w-[98vw]'
                    : 'max-w-5xl h-[88vh]'
                    }`}
            >
                {/* Modal Header */}
                <div className={`flex items-center justify-between px-5 py-4 bg-gradient-to-r ${accentFrom} ${accentTo} text-white shrink-0`}>
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 bg-white/20 rounded-xl shrink-0">
                            {isFolder ? <Folder className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold opacity-75 uppercase tracking-widest">
                                {isFolder ? 'Jelajah Isi Folder' : 'Pratinjau Dokumen'}
                            </p>
                            <h3 className="font-bold text-lg leading-tight truncate">{title}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                        {/* Expand/Shrink */}
                        <button
                            onClick={() => setIsExpanded(v => !v)}
                            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                            title={isExpanded ? 'Perkecil' : 'Perluas layar'}
                        >
                            {isExpanded
                                ? <Minimize2 className="w-4 h-4" />
                                : <Maximize2 className="w-4 h-4" />
                            }
                        </button>
                        {/* Open in new tab */}
                        <a
                            href={originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                            title={isFolder ? 'Buka folder di Drive' : 'Buka file di Drive'}
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl bg-white/20 hover:bg-red-500/60 transition-colors"
                            title="Tutup"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Info banner untuk Folder */}
                {isFolder && (
                    <div className="shrink-0 px-5 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center gap-2 text-blue-700 text-xs font-medium">
                        <Folder className="w-3.5 h-3.5 shrink-0" />
                        Klik file PDF di bawah untuk membukanya. Klik tombol ↗ di kanan atas untuk membuka folder di Google Drive.
                    </div>
                )}

                {/* iFrame */}
                <div className="flex-1 min-h-0 bg-gray-100 relative">
                    {/* Loading skeleton */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-3">
                            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto" />
                            <p className="text-sm text-gray-400">
                                {isFolder ? 'Memuat isi folder...' : 'Memuat dokumen...'}
                            </p>
                        </div>
                    </div>
                    <iframe
                        src={url}
                        className="w-full h-full relative z-10"
                        allow="autoplay"
                        style={{ border: 'none' }}
                        title={title}
                    />
                </div>

                {/* Modal Footer */}
                <div className="shrink-0 px-5 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-400">
                    <span>{isFolder ? '📁 Isi folder ditampilkan via Google Drive' : '📄 Dokumen ditampilkan via Google Drive Viewer'}</span>
                    <span>Pastikan file/folder telah dibagikan secara publik</span>
                </div>
            </div>
        </div>
    );
}

// ============================================================
//  Main BEARR Client Component
// ============================================================
export default function BearrClient({ initialData }: { initialData: BearrLink[] }) {
    const [activeTab, setActiveTab] = useState<BearrKategori>('bank_soal');
    const [driveModal, setDriveModal] = useState<{
        url: string;
        title: string;
        type: 'file' | 'folder';
        originalUrl: string;
    } | null>(null);

    const activeConfig = KATEGORI_CONFIG[activeTab];
    const activeLinks = initialData.filter(l => l.kategori === activeTab);
    const Icon = activeConfig.icon;

    const handleOpenDrive = (rawUrl: string, title: string) => {
        const embedInfo = toDriveEmbedInfo(rawUrl);
        if (embedInfo) {
            setDriveModal({ url: embedInfo.url, title, type: embedInfo.type, originalUrl: rawUrl });
        } else {
            window.open(rawUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <>
            <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-20">

                {/* Header */}
                <div className="bg-[#0B1F3A] text-white py-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A24D]/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E63946]/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYwaDQydjQySDE4QzI3Ljk0IDQyIDM2IDMzLjk0IDM2IDI0VjE4eiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvZz48L3N2Zz4=')] opacity-40"></div>

                    <div className="container px-4 md:px-8 relative z-10 text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl backdrop-blur-md mb-6 border border-white/20 shadow-lg">
                            <Zap className="w-8 h-8 text-[#F0C14B]" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
                            BEARR
                        </h1>
                        <p className="text-xl md:text-2xl font-light text-blue-100 mb-4 tracking-wide">
                            Bank soal · E-book · Aplikasi · Responsi · Referensi Belajar
                        </p>
                        <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
                            Pusat sumber daya belajar digital mahasiswa Fisika UPI — dikurasi dan dikelola oleh <strong className="text-white">HMF FPMIPA UPI</strong>.
                        </p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white border-b border-gray-200 sticky top-[68px] z-30 shadow-sm">
                    <div className="container px-4 md:px-8 mx-auto max-w-6xl">
                        <div className="flex overflow-x-auto scrollbar-hide">
                            {KATEGORI_ORDER.map((kat) => {
                                const cfg = KATEGORI_CONFIG[kat];
                                const TabIcon = cfg.icon;
                                const count = initialData.filter(l => l.kategori === kat).length;
                                return (
                                    <button
                                        key={kat}
                                        onClick={() => setActiveTab(kat)}
                                        className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200 flex-shrink-0 ${activeTab === kat
                                            ? `border-[#0B1F3A] ${cfg.color}`
                                            : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                                            }`}
                                    >
                                        <TabIcon className="w-4 h-4" />
                                        {cfg.label}
                                        {count > 0 && (
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === kat ? `${cfg.bgColor} ${cfg.color}` : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                {count}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="container px-4 md:px-8 py-8 mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                        {/* LEFT: Info Sidebar */}
                        <div className="lg:col-span-4 lg:sticky lg:top-[120px] space-y-5">
                            {/* Kategori Card */}
                            <div className={`bg-gradient-to-br ${activeConfig.accentFrom} ${activeConfig.accentTo} rounded-2xl p-6 text-white shadow-lg relative overflow-hidden`}>
                                <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                                <div className="relative z-10">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4 backdrop-blur-sm border border-white/30">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2">{activeConfig.label}</h2>
                                    <p className="text-white/80 text-sm leading-relaxed">{activeConfig.desc}</p>
                                </div>
                            </div>

                            {/* Navigasi Cepat ke Kategori Lain */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">Kategori Lain</p>
                                <div className="space-y-1">
                                    {KATEGORI_ORDER.filter(k => k !== activeTab).map(kat => {
                                        const cfg = KATEGORI_CONFIG[kat];
                                        const OtherIcon = cfg.icon;
                                        return (
                                            <button
                                                key={kat}
                                                onClick={() => setActiveTab(kat)}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-left transition-colors group"
                                            >
                                                <div className={`w-8 h-8 rounded-lg ${cfg.bgColor} ${cfg.borderColor} border flex items-center justify-center flex-shrink-0`}>
                                                    <OtherIcon className={`w-4 h-4 ${cfg.color}`} />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{cfg.label}</span>
                                                <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-gray-500" />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Link Cards */}
                        <div className="lg:col-span-8 space-y-4">
                            {activeLinks.length === 0 ? (
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-7 h-7 text-gray-300" />
                                    </div>
                                    <p className="text-gray-500 font-semibold">Belum ada konten untuk kategori ini.</p>
                                    <p className="text-gray-400 text-sm mt-1">Konten sedang disiapkan oleh pengurus HMF.</p>
                                </div>
                            ) : (
                                activeLinks.map((link, idx) => {
                                    const TipeIcon = TIPE_ICON[link.tipe_url] || ExternalLink;
                                    const tipeLabel = TIPE_LABEL[link.tipe_url] || 'Buka Tautan';
                                    const embedInfo = link.url ? toDriveEmbedInfo(link.url) : null;
                                    const isDrive = !!embedInfo;
                                    const isFolder = embedInfo?.type === 'folder';

                                    return (
                                        <div
                                            key={link.id}
                                            className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-6 ${activeConfig.hoverBorder} hover:shadow-md transition-all duration-200 group`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`w-12 h-12 rounded-xl ${activeConfig.bgColor} border ${activeConfig.borderColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                                    <TipeIcon className={`w-5 h-5 ${activeConfig.color}`} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-3 flex-wrap">
                                                        <div>
                                                            <h3 className="font-bold text-gray-900 group-hover:text-[#0B1F3A] transition-colors leading-tight">{link.judul}</h3>
                                                            <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mt-1 ${activeConfig.bgColor} ${activeConfig.color}`}>
                                                                {link.tipe_url === 'drive' ? 'Google Drive' : link.tipe_url === 'form' ? 'Formulir Google' : link.tipe_url === 'list' ? 'Daftar Dokumen' : link.tipe_url === 'wa' ? 'WhatsApp' : 'Tautan Eksternal'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {link.deskripsi && (
                                                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">{link.deskripsi}</p>
                                                    )}
                                                    {/* Action Buttons */}
                                                    <div className="mt-4 flex flex-wrap gap-2">
                                                        {/* Open Viewer — untuk file PDF atau folder Drive */}
                                                        {isDrive && (
                                                            <button
                                                                onClick={() => handleOpenDrive(link.url!, link.judul)}
                                                                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 bg-gradient-to-r ${activeConfig.accentFrom} ${activeConfig.accentTo} text-white shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]`}
                                                            >
                                                                {isFolder
                                                                    ? <Folder className="w-4 h-4" />
                                                                    : <Eye className="w-4 h-4" />
                                                                }
                                                                {isFolder ? 'Jelajah Isi Folder' : 'Pratinjau PDF'}
                                                            </button>
                                                        )}

                                                        {/* Open in Drive / External Link Button */}
                                                        {link.url && link.url !== 'https://wa.me/' ? (
                                                            <a
                                                                href={link.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${isDrive
                                                                    ? `bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-sm`
                                                                    : `bg-gradient-to-r ${activeConfig.accentFrom} ${activeConfig.accentTo} text-white shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]`
                                                                    }`}
                                                            >
                                                                <TipeIcon className="w-4 h-4" />
                                                                {isDrive ? (isFolder ? 'Buka Folder di Drive' : 'Buka File di Drive') : tipeLabel}
                                                                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                                                            </a>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200">
                                                                <TipeIcon className="w-4 h-4" />
                                                                Segera Hadir
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Drive Modal Viewer (File PDF & Folder) */}
            {driveModal && (
                <DriveModal
                    url={driveModal.url}
                    title={driveModal.title}
                    type={driveModal.type}
                    originalUrl={driveModal.originalUrl}
                    onClose={() => setDriveModal(null)}
                    accentFrom={activeConfig.accentFrom}
                    accentTo={activeConfig.accentTo}
                />
            )}
        </>
    );
}
