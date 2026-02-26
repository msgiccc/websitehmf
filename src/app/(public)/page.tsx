import { Button } from "@/components/ui/button";
import { PlayCircle, GraduationCap, Users, Calendar, Newspaper, ImageIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { DUMMY_ARTIKEL } from "@/lib/dummy-data";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const revalidate = 60;

export default async function HomePage() {
  const { data: articles } = await supabase
    .from("Artikel")
    .select("*")
    .eq("status", "PUBLISHED")
    .order("createdAt", { ascending: false })
    .limit(4);

  const recentArticles = articles && articles.length > 0 ? articles : DUMMY_ARTIKEL;

  // Split articles into 1 headline and up to 3 sub-articles
  const headlineArticle = recentArticles[0];
  const subArticles = recentArticles.slice(1, 4);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">

      {/* 1. Hero Section (Center-Aligned Cinematic Layout) */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-32 md:pt-40 pb-12 overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#071324]/80 bg-gradient-to-t from-[#071324] via-[#0B1F3A]/70 to-[#1A2C4D]/60 mix-blend-multiply z-10"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/bg-hero.png" alt="HMF Background" className="w-full h-full object-cover object-center" />

          {/* Glowing Accents */}
          <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none z-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none z-10"></div>
        </div>

        <div className="container px-4 md:px-8 relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center text-center space-y-8 mt-12">

          {/* Main Title */}
          <h1 className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 font-serif text-white text-4xl md:text-5xl lg:text-6xl font-black leading-[1.2] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            Himpunan Mahasiswa<br />
            Fisika
          </h1>

          {/* Subtitle Bottom */}
          <p className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 text-blue-100/90 text-lg md:text-xl md:text-2xl max-w-3xl leading-relaxed font-medium drop-shadow-md">
            Fakultas Pendidikan Matematika dan Ilmu Pengetahuan Alam<br />
            Universitas Pendidikan Indonesia
          </p>

          {/* Action Buttons */}
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500 pt-8 flex flex-wrap justify-center gap-6">
            <Link href="/profil">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold px-10 py-7 h-auto text-lg shadow-[0_8px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all flex items-center gap-3 group border-none">
                Lebih Dekat <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </Link>
            <Link href="/artikel">
              <Button size="lg" variant="outline" className="border-blue-400/30 bg-[#0B1F3A]/60 text-blue-100 hover:bg-blue-900/50 hover:text-white hover:border-blue-400/50 rounded-full font-bold px-10 py-7 h-auto text-lg transition-all flex items-center gap-3 backdrop-blur-md">
                Kabar Terbaru
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. Profil Kabinet Section (Detailed White/Krem Layout with Photo Grid) */}
      <section className="w-full py-24 bg-[#F4F1EC] relative overflow-hidden">
        {/* Subtle Background Accents */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/40 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C9A24D]/10 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="container px-4 md:px-8 max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">

            {/* Left Content: Visi Misi & Filosofi (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 md:w-28 md:h-28 shrink-0 drop-shadow-md bg-white rounded-full p-2 border border-white/50 shadow-xl shadow-[#2c1469]/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/niskala.png" alt="Logo Niskala Cakra" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h2 className="font-serif text-3xl md:text-5xl text-[#2c1469] font-bold tracking-tight">
                    Niskala Cakra
                  </h2>
                  <p className="text-[#E63946] font-bold tracking-widest text-sm uppercase mt-2">Kabinet 2025-2026</p>
                </div>
              </div>

              <div className="pl-6 border-l-4 border-[#2c1469]">
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed italic font-serif">
                  "Mewujudkan visi kolektif dengan keindahan bagai sayap merak yang terkembang penuh,
                  mengemban integritas Niskala, dan berwibawa layaknya roda Cakra kehidupan."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                {/* Visi */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#E63946]/10 flex items-center justify-center text-[#E63946]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                    </div>
                    <h3 className="font-bold text-[#2c1469] text-lg">Visi Utama</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed text-justify">
                    Mewujudkan HMF FPMIPA UPI sebagai tempat pengembangan yang unggul, inovatif, strategis, dan efisien.
                  </p>
                </div>

                {/* Misi */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#2c1469]/10 flex items-center justify-center text-[#2c1469]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    </div>
                    <h3 className="font-bold text-[#2c1469] text-lg">Misi Prioritas</h3>
                  </div>
                  <ul className="text-gray-600 text-sm leading-relaxed text-justify space-y-2 list-disc pl-4">
                    <li>Mendorong Prestasi Mahasiswa di Bidang Akademik dan Non-Akademik.</li>
                    <li>Mengembangkan kapasitas mahasiswa fisika yang adaptif dan profesional.</li>
                    <li>Mengembangkan SDM yang Kompeten, Adaptif, dan Berkarakter.</li>
                    <li>Meningkatkan eksistensi HMF FPMIPA UPI di internal maupun di eksternal kampus.</li>
                    <li>Mempererat Kekeluargaan dan kenyamanan di organisasi.</li>
                  </ul>
                </div>
              </div>

              <div>
                <Link href="/kabinet" className="inline-block mt-4">
                  <Button className="bg-[#E63946] text-white hover:bg-[#c92020] shadow-lg shadow-[#E63946]/20 rounded-full px-8 py-6 h-auto font-bold hover:-translate-y-1 transition-all flex items-center gap-2 group">
                    Selami Formasi Kabinet <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content: Asymmetric Photo Grid (5 Columns) */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {/* Column 1 (Moved Down slightly) */}
                <div className="space-y-4 pt-12">
                  <div className="w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-lg border-4 border-white hover:z-20 hover:scale-105 transition-transform duration-500 bg-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000" alt="Pemimpin 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-white hover:z-20 hover:scale-105 transition-transform duration-500 bg-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2000" alt="Rapat Divisi" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Column 2 (Moved Up slightly) */}
                <div className="space-y-4 -mt-4">
                  <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-white hover:z-20 hover:scale-105 transition-transform duration-500 bg-gray-200 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000" alt="Kaderisasi" className="w-full h-full object-cover" />
                    {/* Overlay Accent */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2c1469]/60 to-transparent"></div>
                    <span className="absolute bottom-4 left-4 text-white font-bold text-sm bg-[#E63946] px-3 py-1 rounded-full">Solid</span>
                  </div>
                  <div className="w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-lg border-4 border-white hover:z-20 hover:scale-105 transition-transform duration-500 bg-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000" alt="Pemimpin 2" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Background Blob decoration behind pictures */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#2c1469]/5 rounded-[40px] rotate-6 -z-10"></div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Fitur & Navigasi (Navy Layout) */}
      <section className="w-full py-20 lg:py-32 bg-[#2c1469] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-[800px] h-[800px] bg-[#1E6F5C]/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-[#E63946]/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

        <div className="container px-4 md:px-8 max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-white text-xs font-bold tracking-widest uppercase border border-white/10 backdrop-blur-sm">Eksplorasi HMF</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
              Menjelajah Lebih Jauh
            </h2>
            <div className="w-16 h-1.5 bg-[#E63946] rounded-full mx-auto shadow-[0_0_15px_rgba(230,57,70,0.5)]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Profil Card */}
            <Link href="/kabinet" className="group relative bg-white/5 border border-white/10 hover:border-[#E63946]/50 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(230,57,70,0.15)] flex flex-col justify-between min-h-[320px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A24D]/10 rounded-full blur-2xl group-hover:bg-[#C9A24D]/20 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:bg-[#E63946] transition-all duration-500">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif text-white font-bold mb-3">Profil & Kabinet</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                  Mengenal lebih dekat struktur kabinet Niskala Cakra, filosofi, dan program kerja unggulan.
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-[#C9A24D] font-bold text-sm mt-8 group-hover:translate-x-2 transition-transform">
                Jelajahi <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Program Card */}
            <Link href="/program" className="group relative bg-white/5 border border-white/10 hover:border-[#C9A24D]/50 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(201,162,77,0.15)] flex flex-col justify-between min-h-[320px]">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1E6F5C]/10 rounded-full blur-2xl group-hover:bg-[#1E6F5C]/20 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:bg-[#C9A24D] transition-all duration-500">
                  <Calendar className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif text-white font-bold mb-3">Program Kerja</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                  Agenda kegiatan, riwayat pelaksanaan event, serta program kerja berkelanjutan dari Himpunan.
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-[#C9A24D] font-bold text-sm mt-8 group-hover:translate-x-2 transition-transform">
                Jelajahi <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Artikel Card */}
            <Link href="/artikel" className="group relative bg-white/5 border border-white/10 hover:border-[#1E6F5C]/50 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(30,111,92,0.15)] flex flex-col justify-between min-h-[320px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#E63946]/10 rounded-full blur-2xl group-hover:bg-[#E63946]/20 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:bg-[#1E6F5C] transition-all duration-500">
                  <Newspaper className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif text-white font-bold mb-3">Kabar Berita</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                  Berita terkini, press release, opini wawasan, dan publikasi resmi seputar dunia Fisika dan HMF.
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-[#C9A24D] font-bold text-sm mt-8 group-hover:translate-x-2 transition-transform">
                Jelajahi <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Galeri Card */}
            <Link href="/galeri" className="group relative bg-white/5 border border-white/10 hover:border-white/50 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)] flex flex-col justify-between min-h-[320px]">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:bg-white group-hover:text-[#2c1469] transition-all duration-500">
                  <ImageIcon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif text-white font-bold mb-3">Galeri Karya</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                  Dokumentasi visual, arsip kegiatan, dan kenangan kebersamaan seluruh keluarga besar.
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-[#C9A24D] font-bold text-sm mt-8 group-hover:translate-x-2 transition-transform">
                Jelajahi <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 4. Artikel Section (Kabar HMF Redesigned) */}
      {headlineArticle && (
        <section className="w-full py-20 md:py-32 bg-white">
          <div className="container px-4 md:px-8 max-w-7xl mx-auto">
            <h2 className="text-center font-serif text-3xl md:text-4xl text-[#2c1469] mb-16">
              Kabar HMF
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
              {/* Highlight Article (Left) */}
              <div className="w-full">
                <Link href={`/artikel/${headlineArticle.slug}`} className="group block h-full bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] transition-all duration-300">
                  <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden m-2 rounded-[1.5rem] w-[calc(100%-16px)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={headlineArticle.thumbnail}
                      alt={headlineArticle.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 pt-6">
                    <h3 className="font-serif text-2xl md:text-3xl text-[#2c1469] mb-4 group-hover:text-[#E63946] transition-colors leading-tight">
                      {headlineArticle.judul}
                    </h3>
                    <p className="text-gray-500 text-sm font-bold tracking-wide uppercase">
                      {format(new Date(headlineArticle.createdAt), 'dd MMM yyyy', { locale: id })}
                    </p>
                  </div>
                </Link>
              </div>

              {/* Sub Articles (Right - Empty State as Reference) */}
              <div className="w-full">
                {subArticles.length > 0 ? (
                  <div className="flex flex-col gap-6 h-full">
                    {subArticles.map((artikel) => (
                      <Link href={`/artikel/${artikel.slug}`} key={artikel.id} className="group flex gap-4 bg-white border border-gray-100 rounded-3xl p-3 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="w-1/3 aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={artikel.thumbnail} alt={artikel.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="w-2/3 flex flex-col justify-center pr-4">
                          <h4 className="font-serif text-lg text-[#2c1469] leading-snug mb-2 group-hover:text-[#E63946] transition-colors line-clamp-2">
                            {artikel.judul}
                          </h4>
                          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                            {format(new Date(artikel.createdAt), 'dd MMM yyyy', { locale: id })}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  // Empty state styling matching the reference image dot border
                  <div className="flex items-center justify-center h-full min-h-[400px] border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
                    <p className="text-gray-400 font-medium">Belum ada kabar lain.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <Link href="/artikel">
                <Button className="bg-[#E63946] text-white hover:bg-[#c92020] shadow-[0_8px_30px_rgb(230,57,70,0.3)] hover:-translate-y-1 transition-all rounded-full px-10 py-6 h-auto font-bold flex items-center gap-2 group border-none">
                  Baca lebih banyak kabar <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
