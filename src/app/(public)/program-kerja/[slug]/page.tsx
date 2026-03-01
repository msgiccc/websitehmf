import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { KATEGORI_PROGRAM } from '@/lib/data-program-kerja';
import { getProkerByBidang, getPengurusByDivisi } from '@/lib/data';
import { ChevronLeft, Compass, Target, Sparkles, FolderOpen, Clock, Users, CheckCircle2, Circle, Timer } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = KATEGORI_PROGRAM.find(c => c.id === slug);
    if (!category) return { title: 'Program Kerja Tidak Ditemukan' };

    return {
        title: `${category.name} | Program Kerja HMF FPMIPA UPI`,
        description: category.desc,
    };
}

const statusConfig = {
    PLANNING: { label: 'Perencanaan', icon: Circle, color: 'text-amber-500 bg-amber-50 border-amber-200' },
    ONGOING: { label: 'Sedang Berjalan', icon: Timer, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    COMPLETED: { label: 'Selesai', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
};

export default async function DetailProgramKerjaPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = KATEGORI_PROGRAM.find(c => c.id === slug);

    if (!category) {
        notFound();
    }

    // Ambil pengurus & proker dari DB via data.ts (tanpa auth dependency)
    const [pengurus, programs] = await Promise.all([
        getPengurusByDivisi(category!.name),
        getProkerByBidang(slug),
    ]);


    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col pt-24 pb-24 font-sans selection:bg-[#E63946] selection:text-white">

            {/* Minimalist Top Navigation */}
            <div className="container px-4 md:px-8 mx-auto mb-10">
                <Link
                    href="/program-kerja"
                    className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-gray-400 hover:text-[#2c1469] transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Kembali ke Indeks Program
                </Link>
            </div>

            {/* Editorial Hero Section */}
            <section className="container px-4 md:px-8 mx-auto mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">

                    {/* Left Typography Block */}
                    <div className="lg:col-span-7 space-y-6 relative">
                        {/* Decorative background typography */}
                        <div className="absolute -top-16 -left-8 text-[120px] lg:text-[180px] font-bold text-gray-100/50 pointer-events-none tracking-tighter leading-none select-none -z-10">
                            {category.shortName.toUpperCase()}
                        </div>

                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm text-[#E63946] text-xs font-bold tracking-widest uppercase relative z-10">
                            <Compass className="w-3.5 h-3.5" />
                            Ruang Lingkup
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-[#0B1F3A] leading-[1.1] tracking-tight relative z-10">
                            {category.name}
                        </h1>
                    </div>

                    {/* Right Intro Block */}
                    <div className="lg:col-span-5 relative z-10">
                        <div className="pl-0 lg:pl-10 border-l-0 lg:border-l-2 border-[#2c1469]/20 pt-4 lg:pt-0">
                            <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed">
                                {category.desc}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: Pengurus Bidang */}
            <section className="container px-4 md:px-8 mx-auto relative z-10 mb-20">
                <div className="flex items-center gap-3 mb-10">
                    <div className="p-2 bg-[#E63946]/10 rounded-lg text-[#E63946]">
                        <Users className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Pimpinan & Staff</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent ml-4"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {pengurus && pengurus.length > 0 ? pengurus.map((p: any, idx: number) => (
                        <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col items-center text-center group">
                            <div className="w-24 h-24 mb-5 rounded-full bg-gray-50 border-4 border-white shadow-sm overflow-hidden relative group-hover:-translate-y-2 transition-transform duration-500">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.fotoUrl} alt={p.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h3 className="font-bold text-[#0B1F3A] text-lg mb-1 group-hover:text-[#E63946] transition-colors">{p.nama}</h3>
                            <p className="text-[#2c1469] font-medium text-sm mb-2">{p.jabatan}</p>
                            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-semibold">Angkatan {p.angkatan}</span>
                        </div>
                    )) : (
                        <div className="col-span-full text-center text-gray-500 py-12 bg-white rounded-3xl border border-dashed border-gray-200">
                            Data pengurus untuk {category.name} belum didaftarkan di sistem.
                        </div>
                    )}
                </div>
            </section>

            {/* Section: Daftar Program Kerja dari Database */}
            <section className="container px-4 md:px-8 mx-auto relative z-10">
                <div className="flex items-center gap-3 mb-10">
                    <div className="p-2 bg-[#2c1469]/5 rounded-lg text-[#2c1469]">
                        <FolderOpen className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Daftar Program Kerja</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent ml-4"></div>
                </div>

                {programs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {programs.map((prog: any, idx: number) => {
                            const status = statusConfig[prog.status as keyof typeof statusConfig] || statusConfig.PLANNING;
                            const StatusIcon = status.icon;

                            return (
                                <div
                                    key={prog.id}
                                    className="group relative bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full overflow-hidden"
                                >
                                    {/* Background glow hover */}
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color || 'from-blue-50 to-indigo-50'} rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                                    <div className="space-y-4 relative z-10 flex flex-col h-full text-left">
                                        <div className="flex justify-between items-start">
                                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm bg-gray-50 text-[#E63946] border border-gray-100 group-hover:bg-[#E63946] group-hover:text-white transition-colors duration-300">
                                                <Target className="w-6 h-6" />
                                            </div>
                                            <span className="text-5xl font-black opacity-5 text-gray-900 leading-none select-none tracking-tighter">
                                                {(idx + 1).toString().padStart(2, '0')}
                                            </span>
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold mb-2 leading-tight text-[#0B1F3A] group-hover:text-[#2c1469] transition-colors">
                                                {prog.nama}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-gray-500 mb-3 whitespace-pre-line">
                                                {prog.deskripsi}
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-2 mt-auto">
                                            {/* Status Badge */}
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border w-fit ${status.color}`}>
                                                <StatusIcon className="w-3.5 h-3.5" />
                                                {status.label}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Decorative bottom line */}
                                    <div className="h-1.5 w-1/3 rounded-full mt-6 opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#2c1469] to-[#E63946]"></div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                        <Sparkles className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">Belum ada program kerja yang ditambahkan untuk bidang ini.</p>
                        <p className="text-gray-400 text-sm mt-1">Admin dapat menambahkannya melalui dashboard.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
