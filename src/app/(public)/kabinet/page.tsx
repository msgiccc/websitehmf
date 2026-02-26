import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { DUMMY_PENGURUS } from "@/lib/dummy-data";
import { KabinetTabs } from "@/components/public/kabinet-tabs";

// Force dynamic rendering to avoid prerender errors when Supabase env vars are not set at build time
export const dynamic = 'force-dynamic';

export default async function KabinetPage() {
    // Ambil data pengurus - fallback ke dummy jika gagal
    let groupedPengurus: Record<string, any[]> = {};

    try {
        const { data: pengurus } = await supabase
            .from("Pengurus")
            .select("*")
            .order("angkatan", { ascending: true })
            .order("divisi", { ascending: false });

        const pengurusData = pengurus && pengurus.length > 0 ? pengurus : DUMMY_PENGURUS;

        groupedPengurus = pengurusData.reduce((acc: Record<string, any[]>, current: any) => {
            const divisi = current.divisi || "Lainnya";
            if (!acc[divisi]) acc[divisi] = [];
            acc[divisi].push(current);
            return acc;
        }, {});
    } catch (e) {
        // Fallback ke data dummy jika fetch gagal
        groupedPengurus = DUMMY_PENGURUS.reduce((acc: Record<string, any[]>, current: any) => {
            const divisi = current.divisi || "Lainnya";
            if (!acc[divisi]) acc[divisi] = [];
            acc[divisi].push(current);
            return acc;
        }, {});
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero Section Kabinet */}
            <section className="relative w-full pt-32 pb-16 flex flex-col items-center justify-center overflow-hidden border-b border-gray-200">

                {/* Background Image with Blue Tone Overlay */}
                <div
                    className="absolute inset-0 z-0 opacity-[0.25]"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                    }}
                />
                <div className="absolute inset-0 z-0 bg-blue-900/10 mix-blend-multiply"></div>
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/30 via-blue-50/80 to-gray-50 pointer-events-none"></div>

                <div className="container px-4 md:px-8 relative z-10 w-full flex flex-col items-center text-center">

                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#2c1469]/5 border border-[#2c1469]/10 text-[#2c1469] text-xs font-bold tracking-widest uppercase mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E63946]"></div>
                        Niskala Cakra
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#2c1469] leading-tight tracking-tight mb-4">
                        Kabinet<br />
                        <span className="text-[#E63946]">Keluarga Mahasiswa</span>
                    </h1>

                    <p className="max-w-2xl text-gray-600 text-lg leading-relaxed mt-4">
                        Mewujudkan visi kolektif dengan keindahan bagai sayap merak yang terkembang penuh, mengemban integritas Niskala, dan berwibawa layaknya roda Cakra kehidupan.
                    </p>

                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-64 h-64 bg-[#E63946]/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#C9A24D]/10 rounded-full blur-3xl pointer-events-none"></div>
            </section>

            {/* Interactive Tabs Section */}
            <section className="w-full pb-24">
                <Suspense fallback={<div className="container px-4 text-center py-20 text-gray-500">Memuat data kabinet...</div>}>
                    <KabinetTabs groupedPengurus={groupedPengurus} />
                </Suspense>
            </section>
        </div>
    );
}
