import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { DUMMY_PENGURUS } from "@/lib/dummy-data";
import { ProfileTabs } from "@/components/public/profile-tabs";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function ProfilPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* 1. Hero Section (Clean/White Layout sesuai referensi "Identitas Visual") */}
            <section className="relative w-full pt-32 pb-16 flex flex-col items-center justify-center overflow-hidden border-b border-gray-200">

                {/* Background Image with Blue Tone Overlay */}
                <div
                    className="absolute inset-0 z-0 opacity-[0.25]"
                    style={{
                        backgroundImage: "url('/niskala.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                    }}
                />
                <div className="absolute inset-0 z-0 bg-blue-900/10 mix-blend-multiply"></div>
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/30 via-blue-50/80 to-gray-50 pointer-events-none"></div>

                <div className="container px-4 md:px-8 relative z-10 w-full flex flex-col items-center text-center">

                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-[#0B1F3A] text-xs font-bold tracking-widest uppercase mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E63946]"></div>
                        Profil Himpunan
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#0B1F3A] leading-tight tracking-tight mb-4">
                        Kenali Kami<br />
                        <span className="text-[#E63946]">Lebih Dekat</span>
                    </h1>

                    <p className="max-w-2xl text-gray-600 text-lg leading-relaxed mt-4">
                        Menyelami identitas, sejarah, serta struktur kepengurusan Himpunan Mahasiswa Fisika FPMIPA Universitas Pendidikan Indonesia.
                    </p>

                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-64 h-64 bg-[#E63946]/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#C9A24D]/10 rounded-full blur-3xl pointer-events-none"></div>
            </section>

            {/* 2. Interactive Tabs Section (Sejarah, Lambang, Mars) */}
            <section className="w-full pb-24">
                <Suspense fallback={<div className="container px-4 text-center py-20 text-gray-500">Memuat informasi profil...</div>}>
                    <ProfileTabs />
                </Suspense>
            </section>
        </div>
    );
}
