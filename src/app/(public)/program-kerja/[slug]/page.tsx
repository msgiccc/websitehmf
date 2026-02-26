import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { KATEGORI_PROGRAM, PROGRAM_DATA } from '@/lib/data-program-kerja';
import { ChevronLeft, Compass, Target, Sparkles, FolderOpen } from 'lucide-react';

export function generateStaticParams() {
    return KATEGORI_PROGRAM.map((cat) => ({
        slug: cat.id,
    }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
    const category = KATEGORI_PROGRAM.find(c => c.id === params.slug);
    if (!category) return { title: 'Program Kerja Tidak Ditemukan' };

    return {
        title: `${category.name} | Program Kerja HMF FPMIPA UPI`,
        description: category.desc,
    };
}

export default function DetailProgramKerjaPage({ params }: { params: { slug: string } }) {
    const category = KATEGORI_PROGRAM.find(c => c.id === params.slug);
    const programs = PROGRAM_DATA[params.slug];

    if (!category || !programs) {
        notFound();
    }

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

            {/* Content Display: Masonry-style asymmetric list */}
            <section className="container px-4 md:px-8 mx-auto relative z-10">
                <div className="flex items-center gap-3 mb-10">
                    <div className="p-2 bg-[#2c1469]/5 rounded-lg text-[#2c1469]">
                        <FolderOpen className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Daftar Program Kerja</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent ml-4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
                    {programs.map((prog, idx) => {
                        // Create an asymmetric rhythm by varying heights based on content
                        const isPrimary = idx % 5 === 0;
                        const isFeatured = idx % 4 === 1;

                        return (
                            <div
                                key={idx}
                                className={`group relative bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden
                                    ${isPrimary ? 'md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#1a0b40] to-[#2c1469] text-white border-none' : ''}
                                    ${isFeatured ? 'md:col-span-1 md:row-span-2 bg-[#F4F1EC]' : ''}
                                `}
                            >
                                {/* Background glow for normal cards */}
                                {!isPrimary && (
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color} rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                                )}

                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div className={`
                                            w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm
                                            ${isPrimary ? 'bg-white/10 text-white backdrop-blur-md' : 'bg-white text-[#E63946] border border-gray-100'}
                                        `}>
                                            {isPrimary ? <Sparkles className="w-6 h-6" /> : <Target className="w-6 h-6" />}
                                        </div>
                                        <span className={`text-5xl font-black opacity-10 ${isPrimary ? 'text-white' : 'text-gray-900'} leading-none select-none tracking-tighter`}>
                                            {(idx + 1).toString().padStart(2, '0')}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className={`text-2xl font-bold mb-4 leading-tight ${isPrimary ? 'text-white' : 'text-[#0B1F3A]'}`}>
                                            {prog.title}
                                        </h3>
                                        <p className={`text-base leading-relaxed ${isPrimary ? 'text-gray-300' : 'text-gray-600'}`}>
                                            {prog.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Decorative line at bottom for visual weight */}
                                <div className={`h-1 w-full rounded-full mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isPrimary ? 'bg-gradient-to-r from-[#E63946] to-transparent' : 'bg-gradient-to-r from-gray-200 to-transparent'}`}></div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
