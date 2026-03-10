"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Menu, Home, User, Landmark, Briefcase, Calendar, FolderOpen, Newspaper, ImageIcon, Lock } from "lucide-react";

import { SessionProvider, useSession } from "next-auth/react";

function PublicLayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const pathname = usePathname();
    const isHomePage = pathname === '/';

    // Jika bukan di Homepage, navbar selalu pakai background solid (non-transparan)
    const isScrolledOrSolid = scrolled || !isHomePage;

    const handleMobileLinkClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a')) {
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <div className={`flex min-h-screen flex-col transition-transform duration-500 ease-in-out will-change-transform ${isMobileMenuOpen ? '-translate-x-[80vw] sm:-translate-x-[400px]' : 'translate-x-0'}`}>
            {/* Header / Navbar Interaktif */}
            <header className={`fixed top-0 z-50 w-full text-white transition-all duration-300 ${isScrolledOrSolid ? 'bg-[#1a0b40]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-0' : 'bg-transparent pt-2'}`}>
                <div className="container flex h-16 items-center justify-between px-4 md:px-8">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="flex items-center justify-center group-hover:scale-105 transition-transform">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/logo.png" alt="Logo HMF" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                        </div>
                        <span className="font-bold text-lg md:text-xl tracking-wide uppercase drop-shadow-sm">HMF</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {/* Dropdown Profil */}
                        <div className="group relative cursor-pointer py-4">
                            <Link href="/profil" className="text-sm font-semibold tracking-wide transition-all hover:text-[#c92020] flex items-center gap-1">
                                Profil <span className="text-[10px] group-hover:rotate-180 transition-transform">▼</span>
                            </Link>

                            {/* Dropdown Menu Content */}
                            <div className="absolute top-full left-0 mt-0 w-56 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50">
                                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 flex flex-col mt-2">
                                    <Link href="/profil?tab=sejarah" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Sejarah Singkat</Link>
                                    <Link href="/profil?tab=lambang" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Lambang HMF</Link>
                                    <Link href="/profil?tab=mars" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Mars dan Hymne HMF</Link>
                                    <Link href="/profil?tab=ukk" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Unit Kegiatan Khusus</Link>
                                </div>
                            </div>
                        </div>

                        {/* Dropdown Kabinet */}
                        <div className="group relative cursor-pointer py-4">
                            <Link href="/kabinet" className="text-sm font-semibold tracking-wide transition-all hover:text-[#c92020] flex items-center gap-1">
                                Kabinet <span className="text-[10px] group-hover:rotate-180 transition-transform">▼</span>
                            </Link>

                            {/* Dropdown Menu Content */}
                            <div className="absolute top-full left-0 mt-0 w-56 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50">
                                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 flex flex-col mt-2">
                                    <Link href="/kabinet?tab=visi-misi" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Visi & Misi</Link>
                                    <Link href="/kabinet?tab=program-unggulan" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Program Unggulan</Link>
                                    <Link href="/kabinet?tab=profil" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Profil Kabinet</Link>
                                </div>
                            </div>
                        </div>

                        {/* Dropdown Parlemen */}
                        <div className="group relative cursor-pointer py-4">
                            <Link href="#" className="text-sm font-semibold tracking-wide transition-all hover:text-[#c92020] flex items-center gap-1">
                                Parlemen <span className="text-[10px] group-hover:rotate-180 transition-transform">▼</span>
                            </Link>

                            {/* Dropdown Menu Content Parlemen */}
                            <div className="absolute top-full left-0 mt-0 w-64 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50">
                                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 flex flex-col mt-2">
                                    <Link prefetch={false} href="/dpm/struktur-kepengurusan" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Struktur Kepengurusan Parlemen</Link>
                                    <Link prefetch={false} href="/dpm/produk-mumas" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Produk Mumas</Link>
                                </div>
                            </div>
                        </div>

                        {/* Dropdown Program Kerja */}
                        <div className="group relative cursor-pointer py-4">
                            <Link href="/program-kerja" className="text-sm font-semibold tracking-wide transition-all hover:text-[#c92020] flex items-center gap-1">
                                Program Kerja <span className="text-[10px] group-hover:rotate-180 transition-transform">▼</span>
                            </Link>

                            {/* Dropdown Menu Content (Mega Menu style for the 10 Bidang) */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[480px] opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50">
                                <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                                    <Link href="/program-kerja/lembaga-kesekretariatan" className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#c92020] rounded-lg font-medium transition-colors">Lembaga Kesekretariatan</Link>
                                    <Link href="/program-kerja/lembaga-keuangan" className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#c92020] rounded-lg font-medium transition-colors">Lembaga Keuangan</Link>
                                    <Link href="/program-kerja/bidang-akademik" className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#c92020] rounded-lg font-medium transition-colors">Bidang Akademik</Link>
                                    <Link href="/program-kerja/bidang-ekonomi-dan-bisnis" className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#c92020] rounded-lg font-medium transition-colors">B. Ekonomi & Bisnis</Link>
                                    <Link href="/program-kerja/bidang-kaderisasi" className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#c92020] rounded-lg font-medium transition-colors">Bidang Kaderisasi</Link>
                                    <Link href="/program-kerja/bidang-kerohanian" className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#c92020] rounded-lg font-medium transition-colors">Bidang Kerohanian</Link>
                                    <Link href="/program-kerja/bidang-komunikasi-dan-media-informasi" className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#c92020] rounded-lg font-medium transition-colors">B. Kominfo</Link>
                                    <Link href="/program-kerja/bidang-penelitian-dan-pengembangan" className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#c92020] rounded-lg font-medium transition-colors">B. Litbang</Link>
                                    <Link href="/program-kerja/bidang-pengembangan-minat-dan-bakat" className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#c92020] rounded-lg font-medium transition-colors">B. Minat Bakat</Link>
                                    <Link href="/program-kerja/bidang-sosial-dan-politik" className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#c92020] rounded-lg font-medium transition-colors">Bidang Sospol</Link>
                                </div>
                            </div>
                        </div>
                        {/* Dropdown Acara */}
                        <div className="group relative cursor-pointer py-4">
                            <Link href="#" className="text-sm font-semibold tracking-wide transition-all hover:text-[#c92020] flex items-center gap-1">
                                Acara <span className="text-[10px] group-hover:rotate-180 transition-transform">▼</span>
                            </Link>

                            <div className="absolute top-full left-0 mt-0 w-80 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50">
                                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 flex flex-col mt-2">
                                    <Link href="#" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Physics Festival</Link>
                                    <Link href="#" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Pelatihan Kewirausahaan</Link>
                                    <Link href="#" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Pakumpul Sosonoan jeung Social Project Rame-rame</Link>
                                </div>
                            </div>
                        </div>

                        {/* Dropdown Konten */}
                        <div className="group relative cursor-pointer py-4">
                            <Link href="#" className="text-sm font-semibold tracking-wide transition-all hover:text-[#c92020] flex items-center gap-1">
                                Konten <span className="text-[10px] group-hover:rotate-180 transition-transform">▼</span>
                            </Link>

                            <div className="absolute top-full left-0 mt-0 w-56 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50">
                                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 flex flex-col mt-2">
                                    <Link href="/bearr" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">BEARR</Link>
                                    <Link href="/kinetik" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors flex items-center gap-2">
                                        KINETIK
                                    </Link>
                                    <Link href="/link-shortener" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">LASER</Link>
                                </div>
                            </div>
                        </div>

                        {/* Dropdown Media */}
                        <div className="group relative cursor-pointer py-4">
                            <Link href="/galeri" className="text-sm font-semibold tracking-wide transition-all hover:text-[#c92020] flex items-center gap-1">
                                Media <span className="text-[10px] group-hover:rotate-180 transition-transform">▼</span>
                            </Link>

                            <div className="absolute top-full left-0 mt-0 w-56 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50">
                                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 flex flex-col mt-2">
                                    <Link href="/galeri" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Galeri</Link>
                                    <Link href="#" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Prestasi</Link>
                                    <Link href="#" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Rangers Talk</Link>
                                    <Link href="#" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Laporan Keuangan</Link>
                                    <Link href="#" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Berita HMF</Link>
                                    <Link href="#" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Awardee PH</Link>
                                </div>
                            </div>
                        </div>
                        {session?.user ? (
                            <Link href="/admin" className="py-2 px-4 bg-[#E63946] text-white rounded-md text-sm font-semibold tracking-wide transition-all hover:bg-[#c92020] shadow-md">Dashboard</Link>
                        ) : (
                            <Link href="/login" className="py-4 text-sm font-semibold tracking-wide transition-all hover:text-[#c92020]">Login</Link>
                        )}
                    </nav>

                    {/* Mobile Navigation */}
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="lg:hidden px-2 text-white hover:bg-[#c92020] hover:text-white transition-colors">
                                <Menu className="h-7 w-7" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" showCloseButton={false} className="w-[80vw] sm:w-[400px] sm:max-w-[400px] bg-[#1a0b40] text-white border-l border-white/10 p-0 overflow-hidden">
                            {/* Ambient Glow (dihapus agar tidak ada gradient/glow) */}

                            <div className="flex flex-col h-full w-full py-6 px-6 relative z-10 overflow-y-auto">
                                <Link href="/" className="flex items-center space-x-3 mb-8">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="/logo.png" alt="Logo HMF" className="w-8 h-8 object-contain" />
                                    <span className="font-bold text-xl tracking-wide uppercase drop-shadow-sm">HMF FPMIPA UPI</span>
                                </Link>

                                <nav className="flex flex-col space-y-1 mt-4 flex-1" onClick={handleMobileLinkClick}>
                                    <Link href="/" className="flex items-center gap-4 py-3 px-3 rounded-xl hover:bg-white/10 text-lg font-medium transition-colors">
                                        <Home className="w-5 h-5 text-[#C9A24D]" /> Beranda
                                    </Link>

                                    <Accordion type="single" collapsible className="w-full space-y-1">
                                        {/* Accordion Profil */}
                                        <AccordionItem value="profil" className="border-b-0 space-y-1">
                                            <AccordionTrigger className="hover:bg-white/10 hover:no-underline rounded-xl px-3 py-3 data-[state=open]:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-4 text-lg font-medium">
                                                    <User className="w-5 h-5 text-[#C9A24D]" /> Profil HMF
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pl-12 pr-4 pb-2 space-y-2">
                                                <Link href="/profil?tab=sejarah" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">Sejarah Singkat</Link>
                                                <Link href="/profil?tab=lambang" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">Lambang HMF</Link>
                                                <Link href="/profil?tab=mars" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">Mars dan Hymne</Link>
                                                <Link href="/profil?tab=ukk" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">Unit Kegiatan Khusus</Link>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* Accordion Kabinet */}
                                        <AccordionItem value="kabinet" className="border-b-0 space-y-1">
                                            <AccordionTrigger className="hover:bg-white/10 hover:no-underline rounded-xl px-3 py-3 data-[state=open]:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-4 text-lg font-medium">
                                                    <Landmark className="w-5 h-5 text-[#C9A24D]" /> Kabinet
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pl-12 pr-4 pb-2 space-y-2">
                                                <Link href="/kabinet?tab=visi-misi" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">Visi & Misi</Link>
                                                <Link href="/kabinet?tab=program-unggulan" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">Program Unggulan</Link>
                                                <Link href="/kabinet?tab=profil" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">Profil Kabinet</Link>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* Accordion Parlemen */}
                                        <AccordionItem value="parlemen" className="border-b-0 space-y-1">
                                            <AccordionTrigger className="hover:bg-white/10 hover:no-underline rounded-xl px-3 py-3 data-[state=open]:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-4 text-lg font-medium">
                                                    <Newspaper className="w-5 h-5 text-[#C9A24D]" /> Parlemen
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pl-12 pr-4 pb-2 space-y-2">
                                                <Link prefetch={false} href="/dpm/struktur-kepengurusan" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">Struktur Kepengurusan Parlemen</Link>
                                                <Link prefetch={false} href="/dpm/produk-mumas" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">Produk Mumas</Link>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* Accordion Program Kerja */}
                                        <AccordionItem value="proker" className="border-b-0 space-y-1">
                                            <AccordionTrigger className="hover:bg-white/10 hover:no-underline rounded-xl px-3 py-3 data-[state=open]:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-4 text-lg font-medium">
                                                    <Briefcase className="w-5 h-5 text-[#C9A24D]" /> Program Kerja
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pl-12 pr-4 pb-2 space-y-2">
                                                <Link href="/program-kerja" className="block py-2 text-sm font-bold text-white mb-2">Lihat Semua Proker →</Link>
                                                <Link href="/program-kerja/lembaga-kesekretariatan" className="block py-1.5 text-sm text-gray-300 hover:text-white transition-colors">L. Kesekretariatan</Link>
                                                <Link href="/program-kerja/lembaga-keuangan" className="block py-1.5 text-sm text-gray-300 hover:text-white transition-colors">L. Keuangan</Link>
                                                <Link href="/program-kerja/bidang-akademik" className="block py-1.5 text-sm text-gray-300 hover:text-white transition-colors">B. Akademik</Link>
                                                <Link href="/program-kerja/bidang-ekonomi-dan-bisnis" className="block py-1.5 text-sm text-gray-300 hover:text-white transition-colors">B. Ekonomi Bisnis</Link>
                                                <Link href="/program-kerja/bidang-kaderisasi" className="block py-1.5 text-sm text-gray-300 hover:text-white transition-colors">B. Kaderisasi</Link>
                                                <Link href="/program-kerja/bidang-kerohanian" className="block py-1.5 text-sm text-gray-300 hover:text-white transition-colors">B. Kerohanian</Link>
                                                <Link href="/program-kerja/bidang-komunikasi-dan-media-informasi" className="block py-1.5 text-sm text-gray-300 hover:text-white transition-colors">B. Kominfo</Link>
                                                <Link href="/program-kerja/bidang-penelitian-dan-pengembangan" className="block py-1.5 text-sm text-gray-300 hover:text-white transition-colors">B. Litbang</Link>
                                                <Link href="/program-kerja/bidang-pengembangan-minat-dan-bakat" className="block py-1.5 text-sm text-gray-300 hover:text-white transition-colors">B. Minat Bakat</Link>
                                                <Link href="/program-kerja/bidang-sosial-dan-politik" className="block py-1.5 text-sm text-gray-300 hover:text-white transition-colors">B. Sospol</Link>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* Accordion Acara */}
                                        <AccordionItem value="acara" className="border-b-0 space-y-1">
                                            <AccordionTrigger className="hover:bg-white/10 hover:no-underline rounded-xl px-3 py-3 data-[state=open]:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-4 text-lg font-medium">
                                                    <Calendar className="w-5 h-5 text-[#C9A24D]" /> Acara
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pl-12 pr-4 pb-2 space-y-2">
                                                <Link href="#" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">Physics Festival</Link>
                                                <Link href="#" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">Pelatihan Kewirausahaan</Link>
                                                <Link href="#" className="block py-2 text-base text-gray-300 hover:text-white transition-colors leading-tight">Pakumpul Sosonoan jeung Social Project Rame-rame</Link>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* Accordion Konten */}
                                        <AccordionItem value="konten" className="border-b-0 space-y-1">
                                            <AccordionTrigger className="hover:bg-white/10 hover:no-underline rounded-xl px-3 py-3 data-[state=open]:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-4 text-lg font-medium">
                                                    <FolderOpen className="w-5 h-5 text-[#C9A24D]" /> Konten
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pl-12 pr-4 pb-2 space-y-2">
                                                <Link href="/bearr" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">BEARR</Link>
                                                <div className="flex items-center gap-2">
                                                    <Link href="/kinetik" className="block py-2 text-base text-[#F0C14B] hover:text-white transition-colors font-medium">KINETIK</Link>
                                                </div>
                                                <Link href="/link-shortener" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">LASER</Link>
                                            </AccordionContent>
                                        </AccordionItem>
                                        {/* Accordion Media */}
                                        <AccordionItem value="media" className="border-b-0 space-y-1">
                                            <AccordionTrigger className="hover:bg-white/10 hover:no-underline rounded-xl px-3 py-3 data-[state=open]:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-4 text-lg font-medium">
                                                    <ImageIcon className="w-5 h-5 text-[#C9A24D]" /> Media
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pl-12 pr-4 pb-2 space-y-2">
                                                <Link href="/galeri" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">Galeri</Link>
                                                <Link href="#" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">Prestasi</Link>
                                                <Link href="#" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">Rangers Talk</Link>
                                                <Link href="#" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">Laporan Keuangan</Link>
                                                <Link href="#" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">Berita HMF</Link>
                                                <Link href="#" className="block py-2 text-base text-gray-300 hover:text-white transition-colors">Awardee PH</Link>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>

                                    {/* Link Admin Terpisah jadi Tombol Menonjol */}
                                    <div className="pt-8 pb-4 mt-auto">
                                        {session?.user ? (
                                            <Link href="/admin" className="flex items-center justify-center gap-3 w-full py-4 px-4 bg-[#E63946] hover:bg-[#c92020] text-white rounded-2xl font-bold shadow-[0_4px_20px_rgba(230,57,70,0.4)] transition-all hover:-translate-y-1">
                                                <Home className="w-5 h-5" /> Buka Dashboard
                                            </Link>
                                        ) : (
                                            <Link href="/login" className="flex items-center justify-center gap-3 w-full py-4 px-4 bg-[#E63946] hover:bg-[#c92020] text-white rounded-2xl font-bold shadow-[0_4px_20px_rgba(230,57,70,0.4)] transition-all hover:-translate-y-1">
                                                <Lock className="w-5 h-5" /> Login Portal Admin
                                            </Link>
                                        )}
                                    </div>
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>

            <main className="flex-1 shrink-0 bg-gray-50">{children}</main>

            <footer className="border-t py-6 md:py-0 bg-muted/20">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                    <p className="text-sm leading-loose text-center text-muted-foreground md:text-left">
                        &copy; {new Date().getFullYear()} Himpunan Mahasiswa FPMIPA UPI. All rights reserved.
                    </p>
                </div>
            </footer>
        </div >
    );
}

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <PublicLayoutContent>{children}</PublicLayoutContent>
        </SessionProvider>
    );
}
