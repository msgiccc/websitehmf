import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getAllBidang } from '@/lib/data';

export const metadata = {
    title: 'Program Kerja | HMF FPMIPA UPI',
    description: 'Jelajahi berbagai pergerakan dan inovasi dari setiap bidang/lembaga di Himpunan Mahasiswa Fisika FPMIPA UPI.',
};

export default async function IndeksProgramKerjaPage() {
    const KATEGORI_PROGRAM = await getAllBidang();

    return (
        <div className="min-h-screen bg-[#F4F1EC] flex flex-col pt-24 pb-24 font-sans selection:bg-[#E63946] selection:text-white">

            {/* Header Section */}
            <section className="container px-4 md:px-8 mx-auto text-center mb-20 relative">
                {/* Decorative blobs */}
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#E63946]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
                <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#2c1469]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-black text-[#0B1F3A] leading-[1.1] tracking-tight mb-6 relative z-10">
                    Katalog Ruang Gerak<br />
                    <span className="text-[#E63946]">Program Kerja</span>
                </h1>
                <p className="max-w-2xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed relative z-10">
                    Pilih bidang atau lembaga di bawah ini untuk menelusuri inovasi, gerakan nyata, dan agenda yang diusung oleh fungsionaris Kabinet Niskala Cakra Murni.
                </p>
            </section>

            {/* Category Grid Display */}
            <section className="container px-4 md:px-8 mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {KATEGORI_PROGRAM.map((cat, idx) => (
                        <Link href={`/program-kerja/${cat.slug}`} key={idx} className="group outline-none">
                            <div className="relative h-full bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col group-focus-visible:ring-4 group-focus-visible:ring-[#2c1469]/30">

                                {/* Ambient Hover Glow */}
                                <div className={`absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br ${cat.color} rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none`}></div>

                                {/* Header / Icon Area */}
                                <div className="flex justify-between items-start mb-8 relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-[#F4F1EC] text-[#2c1469] flex items-center justify-center group-hover:bg-[#2c1469] group-hover:text-white transition-colors duration-300 shadow-inner">
                                        <span className="text-2xl font-black">{idx + 1}</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 group-hover:bg-[#E63946] group-hover:text-white group-hover:border-[#E63946] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="relative z-10 flex-grow">
                                    <h2 className="text-2xl font-bold text-[#0B1F3A] mb-3 leading-tight group-hover:text-[#2c1469] transition-colors">
                                        {cat.name}
                                    </h2>
                                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                                        {cat.desc}
                                    </p>
                                </div>

                                {/* Base decorative bar */}
                                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-gray-100 to-transparent group-hover:from-[#2c1469] group-hover:to-[#E63946] transition-colors duration-500"></div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

        </div>
    );
}
