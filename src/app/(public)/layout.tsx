"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [scrolled, setScrolled] = useState(false);

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

    return (
        <div className="flex min-h-screen flex-col">
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
                        {/* Menu Content (Eks Media - Disabled temporarily) */}
                        <div className="group relative cursor-pointer py-4">
                            <Link href="#" className="text-sm font-semibold tracking-wide transition-all hover:text-[#c92020] flex items-center gap-1">
                                Content
                            </Link>
                        </div>

                        {/* Dropdown DPM */}
                        <div className="group relative cursor-pointer py-4">
                            <Link href="#" className="text-sm font-semibold tracking-wide transition-all hover:text-[#c92020] flex items-center gap-1">
                                DPM <span className="text-[10px] group-hover:rotate-180 transition-transform">▼</span>
                            </Link>

                            {/* Dropdown Menu Content DPM */}
                            <div className="absolute top-full left-0 mt-0 w-64 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50">
                                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 flex flex-col mt-2">
                                    <Link prefetch={false} href="/dpm/struktur-kepengurusan" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Struktur Kepengurusan DPM</Link>
                                    <Link prefetch={false} href="/dpm/produk-mumas" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c92020] font-medium transition-colors">Produk Mumas</Link>
                                </div>
                            </div>
                        </div>

                        <Link href="/galeri" className="py-4 text-sm font-semibold tracking-wide transition-all hover:text-[#c92020]">Social</Link>
                        <Link href="/login" className="py-4 text-sm font-semibold tracking-wide transition-all hover:text-[#c92020]">Partner</Link>
                    </nav>

                    {/* Mobile Navigation */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="lg:hidden px-2 text-white hover:bg-[#c92020] hover:text-white transition-colors">
                                <Menu className="h-7 w-7" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-[#1a0b40] text-white border-l-[#2c1469]">
                            <nav className="flex flex-col space-y-6 mt-12 w-full h-full overflow-y-auto pb-20">
                                <Link href="/" className="text-lg font-medium hover:text-[#c92020] transition-colors">Beranda</Link>

                                {/* Mobile Dropdown for Profil */}
                                <div className="space-y-3">
                                    <div className="text-lg font-medium text-white/50">Profil HMF</div>
                                    <div className="flex flex-col space-y-3 pl-4 border-l-2 border-white/10">
                                        <Link href="/profil?tab=sejarah" className="text-base font-medium text-gray-300 hover:text-[#c92020] transition-colors">Sejarah Singkat</Link>
                                        <Link href="/profil?tab=lambang" className="text-base font-medium text-gray-300 hover:text-[#c92020] transition-colors">Lambang HMF</Link>
                                        <Link href="/profil?tab=mars" className="text-base font-medium text-gray-300 hover:text-[#c92020] transition-colors">Mars dan Hymne</Link>
                                        <Link href="/profil?tab=ukk" className="text-base font-medium text-gray-300 hover:text-[#c92020] transition-colors">Unit Kegiatan Khusus</Link>
                                    </div>
                                </div>

                                {/* Mobile Dropdown for Kabinet */}
                                <div className="space-y-3">
                                    <div className="text-lg font-medium text-white/50">Kabinet Niskala Cakra</div>
                                    <div className="flex flex-col space-y-3 pl-4 border-l-2 border-white/10">
                                        <Link href="/kabinet?tab=visi-misi" className="text-base font-medium text-gray-300 hover:text-[#c92020] transition-colors">Visi & Misi</Link>
                                        <Link href="/kabinet?tab=program-unggulan" className="text-base font-medium text-gray-300 hover:text-[#c92020] transition-colors">Program Unggulan</Link>
                                        <Link href="/kabinet?tab=profil" className="text-base font-medium text-gray-300 hover:text-[#c92020] transition-colors">Profil Kabinet</Link>
                                    </div>
                                </div>

                                {/* Mobile Dropdown for Program Kerja */}
                                <div className="space-y-3">
                                    <Link href="/program-kerja" className="text-lg font-medium text-white/50 hover:text-white transition-colors block">Program Kerja</Link>
                                    <div className="flex flex-col space-y-3 pl-4 border-l-2 border-white/10">
                                        <Link href="/program-kerja/lembaga-kesekretariatan" className="text-sm font-medium text-gray-300 hover:text-[#c92020] transition-colors">L. Kesekretariatan</Link>
                                        <Link href="/program-kerja/lembaga-keuangan" className="text-sm font-medium text-gray-300 hover:text-[#c92020] transition-colors">L. Keuangan</Link>
                                        <Link href="/program-kerja/bidang-akademik" className="text-sm font-medium text-gray-300 hover:text-[#c92020] transition-colors">B. Akademik</Link>
                                        <Link href="/program-kerja/bidang-ekonomi-dan-bisnis" className="text-sm font-medium text-gray-300 hover:text-[#c92020] transition-colors">B. Ekonomi & Bisnis</Link>
                                        <Link href="/program-kerja/bidang-kaderisasi" className="text-sm font-medium text-gray-300 hover:text-[#c92020] transition-colors">B. Kaderisasi</Link>
                                        <Link href="/program-kerja/bidang-kerohanian" className="text-sm font-medium text-gray-300 hover:text-[#c92020] transition-colors">B. Kerohanian</Link>
                                        <Link href="/program-kerja/bidang-komunikasi-dan-media-informasi" className="text-sm font-medium text-gray-300 hover:text-[#c92020] transition-colors">B. Kominfo</Link>
                                        <Link href="/program-kerja/bidang-penelitian-dan-pengembangan" className="text-sm font-medium text-gray-300 hover:text-[#c92020] transition-colors">B. Litbang</Link>
                                        <Link href="/program-kerja/bidang-pengembangan-minat-dan-bakat" className="text-sm font-medium text-gray-300 hover:text-[#c92020] transition-colors">B. Minat Bakat</Link>
                                        <Link href="/program-kerja/bidang-sosial-dan-politik" className="text-sm font-medium text-gray-300 hover:text-[#c92020] transition-colors">B. Sospol</Link>
                                    </div>
                                </div>
                                <div className="text-lg font-medium text-white/50 block">Content</div>

                                {/* Mobile Dropdown for DPM */}
                                <div className="space-y-3">
                                    <div className="text-lg font-medium text-white/50">DPM</div>
                                    <div className="flex flex-col space-y-3 pl-4 border-l-2 border-white/10">
                                        <Link prefetch={false} href="/dpm/struktur-kepengurusan" className="text-base font-medium text-gray-300 hover:text-[#c92020] transition-colors">Struktur Kepengurusan DPM</Link>
                                        <Link prefetch={false} href="/dpm/produk-mumas" className="text-base font-medium text-gray-300 hover:text-[#c92020] transition-colors">Produk Mumas</Link>
                                    </div>
                                </div>

                                <Link href="/galeri" className="text-lg font-medium hover:text-[#c92020] transition-colors">Social</Link>
                                <div className="border-t border-white/20 pt-6 mt-4">
                                    <Link href="/login" className="text-base font-medium text-gray-300 hover:text-[#c92020] transition-colors">Admin/Partner</Link>
                                </div>
                            </nav>
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
        </div>
    );
}
