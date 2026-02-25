import { supabase } from "@/lib/supabase";
import { DUMMY_PENGURUS } from "@/lib/dummy-data";
import { ProfileTabs } from "@/components/public/profile-tabs";

export const revalidate = 60;

export default function ProfilPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* 1. Hero Section (Clean/White Layout sesuai referensi "Identitas Visual") */}
            <section className="relative w-full pt-32 pb-16 flex flex-col items-center justify-center overflow-hidden bg-[#F4F1EC] border-b border-gray-200">
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
                <ProfileTabs />
            </section>
        </div>
    );
}
