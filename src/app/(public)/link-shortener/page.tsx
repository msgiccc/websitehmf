import React, { Suspense } from 'react';
import { getShortLinksByUserId } from '@/lib/data';
import { Link2, ExternalLink, ArrowRight, MousePointerClick, ShieldAlert, LogIn, LayoutDashboard, Copy } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/auth';
import ShortLinkTable from '@/components/admin/shortlink-table';

export const revalidate = 0;

export const metadata = {
    title: 'Manajemen Tautan | HMF FPMIPA UPI',
    description: 'Dashboard pengelolaan tautan pendek untuk pengurus aktif HMF FPMIPA UPI.',
};

export default async function LinkShortenerDashboard() {
    const session = await auth();

    // --------- STATE 1: GUEST (BELUM LOGIN) ---------
    if (!session?.user) {
        return (
            <div className="min-h-screen bg-[#071324] relative selection:bg-[#E63946] selection:text-white pb-24 overflow-hidden flex items-center justify-center pt-20">
                {/* Background Decorators */}
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#1A2C4D]/80 to-[#071324] origin-top-left -z-10 scale-110"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E63946]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

                <div className="container px-4 text-center relative z-10 max-w-2xl mx-auto">
                    <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(230,57,70,0.15)] ring-1 ring-white/10 backdrop-blur-md">
                        <ShieldAlert className="w-10 h-10 text-[#E63946]" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-lg">
                        Akses <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] to-[#ff6b77]">Terbatas</span>
                    </h1>

                    <p className="text-[#a0b0cc] text-lg leading-relaxed mb-10 font-medium">
                        Fitur Link Shortener kini menjadi perangkat eksklusif bagi pengurus aktif tiap bidang HMF FPMIPA UPI. Silakan masuk menggunakan akun bidang Anda untuk mengelola tautan.
                    </p>

                    <Link href="/login?callbackUrl=/link-shortener">
                        <span className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(230,57,70,0.4)] bg-gradient-to-r from-[#E63946] to-[#c92020] text-white">
                            <LogIn className="w-5 h-5" />
                            Masuk sebagai Pengurus
                        </span>
                    </Link>
                </div>
            </div>
        );
    }

    // --------- STATE 2: AUTHENTICATED (DASHBOARD) ---------
    const links = await getShortLinksByUserId(session.user.id as string);
    const MAX_LINKS = 5;
    const isQuotaFull = links.length >= MAX_LINKS;

    // Kalkulasi
    const totalClicks = links.reduce((sum, link) => sum + (link.jumlah_klik || 0), 0);
    const quotaPercentage = (links.length / MAX_LINKS) * 100;

    return (
        <div className="min-h-screen bg-[#0A0F1A] text-white relative selection:bg-[#E63946] selection:text-white pb-24 overflow-hidden pt-36">

            {/* Cinematic Background Lines & Glow */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute top-0 left-1/2 -ml-[40rem] w-[80rem] h-[40rem] opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a2c4d] via-[#0A0F1A] to-transparent pointer-events-none -z-10"></div>
            <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-[#E63946]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <main className="container px-4 md:px-8 mx-auto relative z-10 max-w-6xl">

                {/* Header Welcome & Quota Meter */}
                <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 mb-12">
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#a0b0cc] text-xs font-bold tracking-widest uppercase mb-4">
                            <LayoutDashboard className="w-3.5 h-3.5 text-[#E63946]" />
                            Dashboard Bidang
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight drop-shadow-md pb-1">
                            Manajemen <span className="text-[#E63946]">Tautan</span>
                        </h1>
                        <p className="mt-2 text-[#a0b0cc] text-lg">
                            Halo <strong className="text-white capitalize">{session.user.name}</strong>, atur tautan pendek untuk kebutuhan publikasi program kerjamu.
                        </p>
                    </div>

                    {/* Quota High-Contrast Card */}
                    <div className="w-full lg:w-96 p-6 rounded-2xl bg-[#111A2C] border border-white/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E63946] blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-bold text-[#a0b0cc] uppercase tracking-wider">Kuota Tautan</span>
                            <span className={`text-xl font-black ${isQuotaFull ? 'text-[#E63946]' : 'text-emerald-400'}`}>
                                {links.length} / {MAX_LINKS}
                            </span>
                        </div>
                        {/* Progress Bar neon */}
                        <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/5 inset-shadow-sm">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ${isQuotaFull ? 'bg-[#E63946] shadow-[0_0_15px_#E63946]' : 'bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]'}`}
                                style={{ width: `${quotaPercentage}%` }}
                            ></div>
                        </div>
                        {isQuotaFull && (
                            <p className="mt-4 text-xs text-[#E63946] font-medium animate-pulse flex items-center gap-1.5 justify-center">
                                <ShieldAlert className="w-3.5 h-3.5" /> Kuota penuh! Hapus tautan lama untuk membuat baru.
                            </p>
                        )}
                    </div>
                </div>

                {/* Info Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-[#111A2C]/80 backdrop-blur-md p-6 rounded-2xl border border-white/5 flex items-center gap-5">
                        <div className="w-14 h-14 rounded-xl bg-[#1A2C4D] flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                            <Link2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-[#a0b0cc] font-medium mb-1">Total Tautan Aktif</p>
                            <h4 className="text-3xl font-black text-white">{links.length}</h4>
                        </div>
                    </div>
                    <div className="bg-[#111A2C]/80 backdrop-blur-md p-6 rounded-2xl border border-white/5 flex items-center gap-5">
                        <div className="w-14 h-14 rounded-xl bg-orange-950/50 flex items-center justify-center text-orange-400 border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
                            <MousePointerClick className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-[#a0b0cc] font-medium mb-1">Total Klik / Trafik</p>
                            <h4 className="text-3xl font-black text-white">{totalClicks.toLocaleString('id-ID')}</h4>
                        </div>
                    </div>
                </div>

                {/* Table Section Overrided */}
                <div className="bg-[#111A2C]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-2 md:p-6 shadow-2xl">
                    <div className="dark"> {/* Paksa tema gelap pada komponen tabel yg aslinya light/dark mode */}
                        <ShortLinkTable initialData={links} />
                    </div>
                    {/* Himbauan Bawah Table */}
                    <div className="mt-8 text-center text-sm text-[#a0b0cc] bg-white/5 border border-white/5 py-3 rounded-xl">
                        Tautan yang ditandai <b>Terbuka (Publik)</b> akan dirujuk jika ada menu direktori publik.
                    </div>
                </div>

            </main>
        </div>
    );
}
