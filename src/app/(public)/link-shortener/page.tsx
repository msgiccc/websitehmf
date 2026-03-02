import React from 'react';
import { getPublicShortLinks } from '@/lib/data';
import { Link2, ExternalLink, ArrowRight, MousePointerClick } from 'lucide-react';
import Link from 'next/link';
import { headers } from 'next/headers';

export const revalidate = 0; // Pastikan data statis ditarik secara dinamis

export const metadata = {
    title: 'Portal Tautan | HMF FPMIPA UPI',
    description: 'Akses cepat menuju seluruh tautan resmi organisasi Himpunan Mahasiswa Fisika FPMIPA UPI.',
};

export default async function PublicShortlinkPage() {
    const links = await getPublicShortLinks();

    // Dapatkan URL asal jika berjalan di server (atau set fallback)
    const headersList = await headers();
    const host = headersList.get('host') || 'hmfupi.vercel.app';
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    return (
        <div className="min-h-screen bg-[#F8F9FA] relative selection:bg-[#E63946] selection:text-white pb-24 overflow-hidden">

            {/* Background Decorators */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#0B1F3A] to-[#1A2C4D] -skew-y-3 origin-top-left -z-10 scale-110"></div>
            <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-[#E63946]/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            {/* Header Section */}
            <section className="container px-4 md:px-8 mx-auto pt-32 pb-20 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase mb-6 shadow-xl">
                    <Link2 className="w-3.5 h-3.5" />
                    Pusat Tautan Resmi
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-black text-white leading-[1.1] tracking-tight mb-6 drop-shadow-lg">
                    Portal <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] to-[#ff6b77]">Akses Cepat</span>
                </h1>

                <p className="max-w-2xl mx-auto text-blue-100 text-lg md:text-xl leading-relaxed font-light">
                    Kumpulan jalan pintas resmi dari HMF FPMIPA UPI untuk pendaftaran, materi acara, informasi, dan platform partisipasi publik.
                </p>
            </section>

            {/* Content Section (Cards grid) */}
            <section className="container px-4 md:px-8 mx-auto relative z-10">
                {links.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {links.map((link) => (
                            <a
                                key={link.id}
                                href={`/${link.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block h-full outline-none"
                            >
                                <div className="h-full bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(44,20,105,0.08)] transition-all duration-500 flex flex-col relative group-focus-visible:ring-4 group-focus-visible:ring-[#2c1469]/30 hover:-translate-y-2 overflow-hidden">

                                    {/* Hover Glow Background */}
                                    <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-gradient-to-br from-[#2c1469] to-[#E63946] rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"></div>

                                    {/* Link Icon Badge */}
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-[#2c1469] group-hover:text-white transition-colors duration-300 shadow-inner group-hover:shadow-[0_0_20px_rgba(44,20,105,0.3)]">
                                        <ExternalLink className="w-5 h-5" />
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold text-[#0B1F3A] mb-2 font-mono break-all group-hover:text-[#E63946] transition-colors leading-tight">
                                            /{link.slug}
                                        </h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-medium mb-4">
                                            Arahkan ke: {new URL(link.url_asli).hostname}
                                        </p>
                                    </div>

                                    {/* Footer / Stats & Action */}
                                    <div className="pt-5 mt-auto border-t border-gray-50 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                                            <MousePointerClick className="w-3.5 h-3.5" />
                                            {link.jumlah_klik.toLocaleString('id-ID')} Telah diakses
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#E63946] group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Decorative bottom line */}
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-100 to-transparent group-hover:from-[#2c1469] group-hover:to-[#E63946] transition-colors duration-500"></div>
                                </div>
                            </a>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Link2 className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0B1F3A] mb-3">Belum Ada Tautan Publik</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Saat ini belum ada link shortener yang dibuka untuk umum. Tautan akan muncul di sini secara otomatis saat Admin menambahkannya.
                        </p>
                        <div className="mt-8">
                            <Link href="/">
                                <span className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#0B1F3A] text-white font-semibold hover:bg-[#2c1469] transition-colors">
                                    Kembali ke Beranda
                                </span>
                            </Link>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
