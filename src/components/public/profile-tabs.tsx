"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Linkedin, Instagram, PlayCircle, Sparkles, Users } from "lucide-react";

// Sub-component to handle search params safely within Suspense
function TabHandler({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get("tab");

    useEffect(() => {
        if (tabParam && ["sejarah", "lambang", "mars", "ukk"].includes(tabParam)) {
            setActiveTab(tabParam);
        }
    }, [tabParam, setActiveTab]);

    return null;
}

export function ProfileTabs() {
    const [activeTab, setActiveTab] = useState("sejarah");
    const [activeUkkTab, setActiveUkkTab] = useState("khauf");

    const tabs = [
        { id: "sejarah", label: "Sejarah Singkat" },
        { id: "lambang", label: "Lambang HMF" },
        { id: "mars", label: "Mars & Hymne" },
        { id: "ukk", label: "UKK (Unit Kegiatan Khusus)" },
    ];

    return (
        <div className="w-full relative z-20 -mt-10 md:-mt-16 container px-4 flex flex-col items-center">
            <Suspense fallback={null}>
                <TabHandler setActiveTab={setActiveTab} />
            </Suspense>
            {/* Tab Navigation */}
            <div className="flex flex-wrap bg-white/90 backdrop-blur-md rounded-t-xl overflow-hidden shadow-sm border-b justify-center w-full max-w-5xl">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 sm:px-6 md:px-10 py-4 font-bold text-sm transition-colors flex-1 md:flex-none text-center ${activeTab === tab.id
                            ? "bg-white text-[#c92020] border-t-4 border-t-[#c92020]"
                            : "text-gray-500 hover:text-[#c92020] hover:bg-white/50 border-t-4 border-t-transparent"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content Container */}
            <div className="bg-white w-full max-w-5xl rounded-b-xl md:rounded-tr-none shadow-lg p-6 md:p-12 min-h-[50vh]">
                {/* TAB 1: SEJARAH SINGKAT */}
                {activeTab === "sejarah" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                            {/* Left Content */}
                            <div className="space-y-6">
                                <span className="inline-block py-1.5 px-4 rounded-full bg-[#C9A24D]/10 text-[#0B1F3A] text-xs font-bold tracking-widest uppercase mb-2">Jejak Langkah</span>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1F3A] leading-tight">
                                    Sejarah Berdirinya<br />
                                    <span className="text-[#E63946]">HMF FPMIPA UPI</span>
                                </h2>
                                <div className="w-16 h-1.5 bg-gradient-to-r from-[#E63946] to-[#C9A24D] rounded-full mb-6"></div>

                                <div className="space-y-4 text-gray-700 leading-relaxed text-left text-sm md:text-base text-justify">
                                    <p>
                                        Himpunan Mahasiswa Fisika yang sekarang dikenal ternyata memiliki sejarah yang menarik dan patut kita ketahui. Tanggal pasti berdirinya masih dalam pembicaraan, namun dari beberapa sumber dan alumni maka sejarah singkat berdirinya HMF adalah sebagai berikut.
                                    </p>
                                    <p>
                                        Himpunan pertama kali lahir dilatar belakangi oleh sekumpulan mahasiswa fisika yang melaksanakan aktifitas positif selain aktifitas kuliah. Dari beberapa pemikiran, akhirnya dibentuklah sebuah wadah yang disebut <strong className="text-[#0B1F3A]">Persatuan Mahasiswa Fisika</strong> yang disingkat <strong className="text-[#E63946]">PERMAF</strong> pada tanggal <strong className="bg-[#0B1F3A] text-[#F0C14B] px-1.5 py-0.5 rounded">30 Juni 1954</strong>. Organisasi ini memiliki tujuan yang mulia yaitu untuk mewadahi mahasiswa fisika dan membantu mahasiswa fisika baik dalam bidang akademik maupun sosial.
                                    </p>
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className="space-y-8 lg:pt-16">
                                {/* Card 1 */}
                                <div className="bg-[#F4F1EC]/50 p-8 md:p-10 rounded-2xl shadow-sm relative overflow-hidden border border-gray-100">
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#E63946]"></div>
                                    <p className="text-gray-600 leading-relaxed text-sm md:text-base text-justify">
                                        Dari tahun-ketahun organisasi ini menunjukkan eksistensinya sebagai organisasi yang lahir dari penjelmaan aspirasi mahasiswa dan melaksanakan kegiatan untuk mahasiswa. Akhirnya dari PERMAF berubah nama menjadi <strong>Himpunan Mahasiswa Fisika Jurusan Pendidikan Fisika</strong> dan akhirnya berubah lagi menjadi <strong>Himpunan Mahasiswa Fisika</strong> yang disingkat menjadi <strong>HMF</strong>. HMF FPMIPA UPI menjadi salah satu himpunan yang eksis berjuang untuk mahasiswa dan itu dibuktikan sampai sekarang.
                                    </p>
                                </div>

                                {/* Card 2 (Navy Accent) */}
                                <div className="bg-[#0B1F3A] text-white p-8 md:p-10 rounded-2xl shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#1E6F5C]/30 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                    <p className="text-gray-300 leading-relaxed text-sm relative z-10 text-justify font-light">
                                        Untuk mengetahui perkembangan HMF FPMIPA UPI masa kini, dapat dilihat melalui website dan akun media sosial aktifnya. Termasuk profil kabinet terbarukan dapat dilihat di menu navigasi bagian atas website ini.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* TAB 2: LAMBANG HMF */}
                {activeTab === "lambang" && (
                    <div className="animate-in fade-in zoom-in-95 duration-700 max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="inline-block py-1.5 px-4 rounded-full bg-[#C9A24D]/10 text-[#0B1F3A] text-xs font-bold tracking-widest uppercase mb-4">Identitas Visual</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1F3A] mb-4">Makna Lambang <span className="text-[#E63946]">HMF</span></h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg text-center mt-2">
                                Lambang HMF FPMIPA UPI terdiri dari berbagai bagian yang mempunyai maksud sebagai berikut :
                            </p>
                        </div>

                        <div className="flex flex-col gap-12 lg:gap-16 items-center">
                            {/* Logo Display - Top Centered */}
                            <div className="w-full flex flex-col items-center relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-gradient-to-tr from-[#0B1F3A]/5 to-[#E63946]/5 rounded-full blur-[100px] pointer-events-none"></div>
                                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative group">
                                    <div className="absolute inset-0 bg-white rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.08)] border-8 border-[#F4F1EC]/50 flex items-center justify-center p-8 z-10 transform group-hover:-translate-y-2 transition-transform duration-500">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="/logo.png" alt="Logo HMF" className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                </div>
                                <div className="mt-12 relative z-20">
                                    <a href="/logo.png" download>
                                        <button className="bg-white border-2 border-[#0B1F3A] text-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white rounded-full px-8 py-3.5 font-bold transition-all flex items-center gap-3 shadow-sm hover:shadow-xl hover:-translate-y-1 group/btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:animate-bounce"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                                            Unduh Lambang Resmi
                                        </button>
                                    </a>
                                </div>
                            </div>

                            {/* Meaning Lists Cards Grid */}
                            <div className="w-full relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1 relative overflow-hidden group">
                                        <h3 className="font-bold text-[#E63946] text-xl mb-3 relative z-10 group-hover:text-[#c92020] transition-colors">Tulisan & Lingkaran</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm relative z-10">Tulisan Himpunan Mahasiswa Fisika FPMIPA UPI dan singkatan HMF dalam lingkaran biru menunjukan nama organisasi.</p>
                                        <div className="absolute -bottom-4 -right-4 text-[#F4F1EC] opacity-50 font-serif font-bold text-7xl select-none mix-blend-multiply border-gray-100/50">”</div>
                                    </div>

                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1 relative overflow-hidden group">
                                        <h3 className="font-bold text-[#E63946] text-xl mb-3 relative z-10 group-hover:text-[#c92020] transition-colors">Mahkota Segilima</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm relative z-10">Mahkota segilima warna putih bertepikan biru pada bentuk luar melambangkan menjalankan kegiatan berdasarkan Pancasila, UUD 1945, serta Tridharma PT.</p>
                                        <div className="absolute -bottom-4 -right-4 text-[#F4F1EC] opacity-50 font-serif font-bold text-7xl select-none mix-blend-multiply border-gray-100/50">”</div>
                                    </div>

                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1 relative overflow-hidden group">
                                        <h3 className="font-bold text-[#E63946] text-xl mb-3 relative z-10 group-hover:text-[#c92020] transition-colors">Lingkaran Biru Dalam</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm relative z-10">Mempunyai arti bahwa kegiatan berlandaskan asas kekeluargaan, segala aspek pemecahan masalah diselesaikan secara musyawarah mufakat.</p>
                                        <div className="absolute -bottom-4 -right-4 text-[#F4F1EC] opacity-50 font-serif font-bold text-7xl select-none mix-blend-multiply border-gray-100/50">”</div>
                                    </div>

                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1 relative overflow-hidden group">
                                        <h3 className="font-bold text-[#E63946] text-xl mb-3 relative z-10 group-hover:text-[#c92020] transition-colors">Sepasang Sayap</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm relative z-10">Berwarna putih berarti memiliki bidang-bidang dengan tugasnya masing-masing akan tetapi saling membantu mencapai tujuan.</p>
                                        <div className="absolute -bottom-4 -right-4 text-[#F4F1EC] opacity-50 font-serif font-bold text-7xl select-none mix-blend-multiply border-gray-100/50">”</div>
                                    </div>

                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1 relative overflow-hidden group">
                                        <h3 className="font-bold text-[#E63946] text-xl mb-3 relative z-10 group-hover:text-[#c92020] transition-colors">Lintasan Elektron Merah</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm relative z-10">Berarti HMF memiliki sifat dinamis dan aktif sesuai dengan peraturan dan hukum yang berlaku dan dapat dipertanggungjawabkan.</p>
                                        <div className="absolute -bottom-4 -right-4 text-[#F4F1EC] opacity-50 font-serif font-bold text-7xl select-none mix-blend-multiply border-gray-100/50">”</div>
                                    </div>

                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1 relative overflow-hidden group">
                                        <h3 className="font-bold text-[#E63946] text-xl mb-3 relative z-10 group-hover:text-[#c92020] transition-colors">Segitiga Terbalik Merah</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm relative z-10">Mengarah ke bawah berarti HMF memiliki dasar yang kuat dengan akar yang kokoh sehingga mantap walaupun mendapat tantangan.</p>
                                        <div className="absolute -bottom-4 -right-4 text-[#F4F1EC] opacity-50 font-serif font-bold text-7xl select-none mix-blend-multiply border-gray-100/50">”</div>
                                    </div>

                                </div>

                                {/* Arti Warna - Modernized */}
                                <div className="mt-10 bg-white rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden pt-12">
                                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0B1F3A] via-[#E63946] to-[#C9A24D]"></div>
                                    <h3 className="text-2xl font-serif font-bold text-[#0B1F3A] mb-8 text-center">Simbolik Warna</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                                        <div className="flex flex-col items-center text-center group">
                                            <div className="w-12 h-12 rounded-full bg-[#0B1F3A] mb-4 shadow-lg group-hover:scale-110 transition-transform"></div>
                                            <h4 className="font-bold text-gray-900 mb-2">Biru</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">HMF dijiwai semangat pengabdian yang tinggi untuk mencapai tujuan mulia.</p>
                                        </div>
                                        <div className="flex flex-col items-center text-center group">
                                            <div className="w-12 h-12 rounded-full bg-[#E63946] mb-4 shadow-lg group-hover:scale-110 transition-transform"></div>
                                            <h4 className="font-bold text-gray-900 mb-2">Merah</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">Berarti HMF FPMIPA UPI memiliki energi yang sangat besar sebagai modal dalam beraktifitas.</p>
                                        </div>
                                        <div className="flex flex-col items-center text-center group">
                                            <div className="w-12 h-12 rounded-full bg-white border-4 border-gray-200 mb-4 shadow-md group-hover:scale-110 transition-transform"></div>
                                            <h4 className="font-bold text-gray-900 mb-2">Putih</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">Memiliki keragaman potensi anggota yang berpadu untuk mencapai tujuan organisasi yang sama.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 3: MARS & HYMNE */}
                {activeTab === "mars" && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-700 max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="inline-block py-1.5 px-4 rounded-full bg-[#E63946]/10 text-[#E63946] text-xs font-bold tracking-widest uppercase mb-4">Suara Harmoni</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1F3A]">Mars dan Hymne</h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-[#0B1F3A] to-[#E63946] mx-auto mt-6 rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                            {/* Mars */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#E63946] to-[#A02831] rounded-[2.5rem] transform -rotate-2 group-hover:-translate-y-2 group-hover:-rotate-3 transition-all duration-500 shadow-xl opacity-80"></div>
                                <div className="relative bg-white p-10 md:p-14 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col h-full z-10 transform group-hover:-translate-y-2 transition-transform duration-500">
                                    <div className="absolute top-8 right-8 text-[#F4F1EC]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1F3A] mb-2">Mars HMF</h3>
                                    <p className="text-xs md:text-sm font-bold text-gray-400 mb-6 uppercase tracking-widest">Ciptaan : Doni Nurdiansyah</p>

                                    <div className="text-base md:text-lg font-serif italic text-gray-700 leading-loose flex-1 mb-8">
                                        <p>Kibarkan bakti di jiwa</p>
                                        <p>Membangun HMF tercinta</p>
                                        <p>Semangatkan tekad dihati</p>
                                        <p>Untuk fisika UPI</p>
                                        <br />
                                        <p>Ayo bergerak</p>
                                        <p>Ayo membangun</p>
                                        <p>Wujudkan cita cinta mu untuk fisika</p>
                                        <p>Bulatkan hati tuk raih prestasi</p>
                                        <p>Bersama di fisika UPI</p>
                                    </div>

                                    <a href="https://youtu.be/xTKOQEZwEgg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1F3A] text-white rounded-full font-bold text-sm tracking-wide hover:bg-[#E63946] transition-colors self-start shadow-md hover:shadow-lg hover:-translate-y-0.5 group/btn">
                                        <PlayCircle className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                        Dengarkan di YouTube
                                    </a>
                                </div>
                            </div>

                            {/* Hymne */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] to-[#061224] rounded-[2.5rem] transform rotate-2 group-hover:-translate-y-2 group-hover:rotate-3 transition-all duration-500 shadow-xl opacity-80"></div>
                                <div className="relative bg-white p-10 md:p-14 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col h-full z-10 transform group-hover:-translate-y-2 transition-transform duration-500">
                                    <div className="absolute top-8 right-8 text-[#F4F1EC]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#E63946] mb-2">Hymne HMF</h3>
                                    <p className="text-xs md:text-sm font-bold text-gray-400 mb-6 uppercase tracking-widest">Ciptaan : Doni Nurdiansyah</p>

                                    <div className="text-base md:text-lg font-serif italic text-gray-700 leading-loose flex-1 mb-8">
                                        <p>Fisika bumi siliwangi</p>
                                        <p>Tempat ku bernaung dan berdiri</p>
                                        <p>Cerahkan negeri bakti ibu pertiwi</p>
                                        <p>Fisika jayalah dihati</p>
                                        <br />
                                        <p>Fisika bumi siliwangi</p>
                                        <p>Tempatku meraih prestasi</p>
                                        <p>Kibarkan panji harumkan negeri</p>
                                        <p>Fisika Jayalah di hati</p>
                                    </div>

                                    <a href="https://youtu.be/jCrs_U4pZr4" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#E63946] text-white rounded-full font-bold text-sm tracking-wide hover:bg-[#0B1F3A] transition-colors self-start shadow-md hover:shadow-lg hover:-translate-y-0.5 group/btn">
                                        <PlayCircle className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                        Dengarkan di YouTube
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 4: UKK */}
                {activeTab === "ukk" && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-700 max-w-6xl mx-auto">
                        <div className="text-center mb-10">
                            <span className="inline-block py-1.5 px-4 rounded-full bg-[#0B1F3A]/10 text-[#0B1F3A] text-xs font-bold tracking-widest uppercase mb-4">Unit Kegiatan Khusus</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1F3A]">KHAUF & CAKRAWALA</h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-[#0B1F3A] to-[#E63946] mx-auto mt-6 rounded-full mb-8"></div>

                            {/* UKK Sub-Tabs */}
                            <div className="flex justify-center gap-4 mb-16 flex-wrap">
                                <button
                                    onClick={() => setActiveUkkTab("khauf")}
                                    className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-sm border ${activeUkkTab === "khauf"
                                        ? "bg-emerald-600 text-white border-emerald-600 shadow-emerald-500/30 shadow-lg scale-105"
                                        : "bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                                        }`}
                                >
                                    UKK KHAUF
                                </button>
                                <button
                                    onClick={() => setActiveUkkTab("cakrawala")}
                                    className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-sm border ${activeUkkTab === "cakrawala"
                                        ? "bg-[#152C53] text-white border-[#152C53] shadow-[#152C53]/30 shadow-lg scale-105"
                                        : "bg-[#0B1F3A] text-blue-100 border-[#3A568C] border-opacity-30 hover:bg-blue-900/50 hover:text-blue-200"
                                        }`}
                                >
                                    UKK CAKRAWALA
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            {/* KHAUF Section */}
                            {activeUkkTab === "khauf" && (
                                <div className="animate-in fade-in zoom-in-95 duration-500 bg-[#F4F1EC]/30 rounded-[3rem] p-8 md:p-12 border border-emerald-100 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
                                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700 delay-100"></div>

                                    {/* Top Header - Logo Centered */}
                                    <div className="flex flex-col items-center text-center relative z-10 mb-16">
                                        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-white shadow-[0_20px_50px_rgba(16,185,129,0.15)] border-4 border-emerald-50 p-6 flex items-center justify-center mb-6 relative group/logo">
                                            <div className="absolute inset-[-15px] border-2 border-dashed border-emerald-300/50 rounded-full animate-spin-slow group-hover/logo:border-emerald-400 transition-colors"></div>
                                            <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-xl group-hover/logo:bg-emerald-500/10 transition-colors"></div>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="/khauf.png" alt="Logo KHAUF" className="w-full h-full object-contain relative z-10 transform group-hover/logo:scale-110 transition-transform duration-500" />
                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-black text-emerald-900 tracking-tight mb-3">KHAUF</h3>
                                        <p className="text-emerald-700 font-bold uppercase tracking-[0.2em] text-sm md:text-base border-b-2 border-emerald-200 pb-2">Komunitas Hijau Fisika</p>
                                    </div>

                                    {/* Bento Grid Layout */}
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 text-emerald-950">
                                        {/* Slogan */}
                                        <div className="md:col-span-12 bg-emerald-600 text-white rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden">
                                            <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl -mr-20 -mt-20"></div>
                                            <div className="relative z-10 text-center">
                                                <p className="font-sans font-bold uppercase text-emerald-200 tracking-[0.3em] mb-4 text-sm">Salam Rimba! Salam Lestari!</p>
                                                <p className="font-serif italic text-2xl md:text-3xl leading-relaxed">
                                                    "The Real Adventure of Science, Keep Fun and Lovely"
                                                </p>
                                                <p className="mt-6 text-emerald-100 max-w-2xl mx-auto">Dari slogan tersebut, sudah tergambar kan KHAUF itu organisasi seperti apa? Mari kita kenali lebih lanjut!</p>
                                            </div>
                                        </div>

                                        {/* Sejarah */}
                                        <div className="md:col-span-12 lg:col-span-8 bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
                                            <h4 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-3">
                                                <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm">🕰️</span>
                                                SEJARAH SINGKAT KHAUF
                                            </h4>
                                            <div className="space-y-4 text-justify leading-relaxed opacity-90">
                                                <p>Komunitas Hijau Fisika (KHAUF) adalah salah satu UKK di HMF FPMIPA UPI dan merupakan organisasi yang bergerak di bidang petualangan alam terbuka serta berbasis sains. KHAUF berdiri pada tanggal 02 April 2000 pukul 06.06 WIB di Gunung Tangkuban Perahu yang dideklarasikan oleh 28 orang mahasiswa jurusan Pendidikan Fisika UPI dari berbagai angkatan, mulai angkatan 1993 sampai angkatan 1999. Pada saat itu, latar belakang berdirinya KHAUF adalah karena adanya persamaan hobi mendaki gunung. Kemudian, latar belakang tersebut berkembang menjadi sebuah keinginan untuk mendirikan sebuah organisasi berbasis petualangan. Pada mulanya kegiatan KHAUF hanya sekedar hobi saja namun seiring berjalannya waktu, kegiatan KHAUF berkembang pada beberapa hal seperti petualangan gunung hutan, climbing dan akses tali, kerelawanan. KHAUF juga tengah melakukan Seven Volcanic Summits Expedition Indonesia, yakni penelitian tujuh gunung api tertinggi di Indonesia. Udah kemana aja nih? Nah sudah ke Gunung Sumbing (2020) dan Gunung Slamet (2024), kepoo akan kemana selanjutnya? Pantengin terus sosial media KHAUF.</p>
                                                <p>KHAUF telah melahirkan 22 angkatan di antaranya adalah Tapak Sebelas (TS), TIKAM, Lumut Rimba (LR), Mutiara Alam (MA), Panca Angin Rimba (PAR), Tapak Guntur (TG), Kabut Wana Sakti (KWS), Deru Lazuardi (DL), Laskar Pantera (LP), Elang Buana (EB), Bayu Kencana (BK), Wono Gondo (WG), Napak Manunggal (NM), Halimun Punggung Sembilan (HPS), Babad Satapak Lima (BSL), Lembah Surya Begonia (LSB), dan Puncak Wana Imaji (PWI), Bahtera surya kencana (BSK), Eka Embun (EE), Gantari Bumandala (GB), Bara Sabit (BS), dan Tanjakan Korsa (TK) Siapa yang akan menjadi angkatan selanjutnya?</p>
                                            </div>
                                        </div>

                                        {/* Social & Web */}
                                        <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6">
                                            <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-8 shadow-lg flex-1 flex flex-col justify-center">
                                                <h4 className="text-xl font-bold text-emerald-200 mb-4">Connect With Us</h4>
                                                <p className="text-sm text-emerald-100/80 mb-6">Masih penasaran mengenai KHAUF? Yuk follow akun sosial media kami</p>
                                                <div className="space-y-4">
                                                    <a href="https://instagram.com/khauf_upi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors border border-white/5">
                                                        <Instagram className="w-6 h-6 text-emerald-300" />
                                                        <span>@khauf_upi</span>
                                                    </a>
                                                    <div className="flex items-center gap-4 bg-white/10 p-3 rounded-xl border border-white/5">
                                                        <Users className="w-6 h-6 text-blue-300" />
                                                        <span className="text-sm">Komunitas Hijau Fisika</span>
                                                    </div>
                                                    <a href="https://youtube.com/@KhaufUPI" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors border border-white/5">
                                                        <PlayCircle className="w-6 h-6 text-red-400" />
                                                        <span>Khauf UPI</span>
                                                    </a>
                                                </div>
                                            </div>
                                            <a href="http://khauf-adventure.blogspot.co.id/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-200 hover:border-emerald-500 hover:shadow-md transition-all group flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">Official Website</p>
                                                    <p className="font-semibold text-emerald-900 group-hover:text-emerald-600 transition-colors max-w-[200px] truncate">khauf-adventure.blogspot.co.id</p>
                                                </div>
                                                <svg className="w-6 h-6 text-emerald-300 group-hover:text-emerald-500 transition-colors transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                            </a>
                                        </div>

                                        {/* Tujuan */}
                                        <div className="md:col-span-12 lg:col-span-7 bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-emerald-100">
                                            <h4 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-3">
                                                <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm">🎯</span>
                                                TUJUAN
                                            </h4>
                                            <p className="mb-4 text-emerald-800 font-medium">Tujuan yang hendak dicapai oleh KHAUF diantaranya adalah:</p>
                                            <div className="space-y-4 text-justify leading-relaxed opacity-90">
                                                <p>1. Meningkatkan kualitas anggota HMF FPMIPA UPI yang religius, spiritual, ilmiah, edukatif, mandiri, berkarya yang kreatif dan produktif, dinamis serta berwawasan luas dalam bidang sains, keorganisasian dan kepencintaalaman.</p>
                                                <p>2. Ikut serta bertanggung jawab dalam mewujudkan cita-cita Bangsa Indonesia dengan penuh kesadaran.</p>
                                                <p>3. Menumbuhkan rasa kecintaan terhadap alam, lingkungan hidup, dan tanah air.</p>
                                                <p>4. Menumbuhkembangkan jiwa sains terhadap fenomena alam yang berlandaskan kebebasan berfikir.</p>
                                            </div>
                                        </div>

                                        {/* Trivia */}
                                        <div className="md:col-span-12 lg:col-span-5 bg-emerald-50 rounded-3xl p-8 shadow-sm border border-emerald-200/50">
                                            <h4 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-3">
                                                <span className="w-8 h-8 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 text-sm">💡</span>
                                                TRIVIA
                                            </h4>
                                            <div className="space-y-4 text-justify leading-relaxed opacity-90 text-sm">
                                                <p className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-100/50">1. Terdapat dua jenis angkatandi KHAUF, yaitu angkatan perintis dan angkatan biasa. Angkatan perintis adalah anggota KHAUF yang telah mendirikan KHAUF. Sedangkan anggota biasa adalah anggota KHAUF yang dilantik menjadi anggota setelah mengikuti kegiatan pendidikan dan latihan dasar KHAUF.</p>
                                                <p className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-100/50">2. Anggota KHAUF terdiri dari 3 kelompok, yaitu Anggota Muda (AM), Anggota Biasa (AB), dan Anggota Istimewa.</p>
                                                <p className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-100/50">3. Setiap anggota KHAUF memiliki nama rimba masing-masing yang didapatkan pada saat pendidikan dasar. Selama berkegiatan dalam organisasi, setiap anggota memanggil anggota lainnya dengan sebutan nama rimba.</p>
                                            </div>
                                        </div>

                                        {/* Pengurus Khauf */}
                                        <div className="md:col-span-12 mt-8 pt-10 border-t-2 border-dashed border-emerald-200 flex flex-col items-center">
                                            <div className="flex items-center gap-3 mb-8">
                                                <span className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                                    <Users className="w-5 h-5" />
                                                </span>
                                                <h4 className="text-2xl font-black text-emerald-900 tracking-tight uppercase">Ketua / Pengurus KHAUF</h4>
                                            </div>

                                            <div className="bg-white rounded-[2rem] p-8 border border-emerald-100 shadow-[0_10px_40px_rgba(16,185,129,0.05)] hover:shadow-[0_10px_40px_rgba(16,185,129,0.1)] transition-all duration-500 flex flex-col items-center text-center w-full max-w-sm group relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                                <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 border-8 border-white shadow-xl overflow-hidden relative group-hover:-translate-y-3 transition-transform duration-500 z-10">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=KhaufLeader&backgroundColor=transparent" alt="Ketua Khauf" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <span className="px-5 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4 z-10">Kabinet Terkini</span>
                                                <h3 className="font-black text-emerald-900 text-2xl mb-1 group-hover:text-emerald-600 transition-colors z-10">Ketua KHAUF</h3>
                                                <p className="text-emerald-600 font-medium z-10">Pimpinan Unit</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* CAKRAWALA Section */}
                            {activeUkkTab === "cakrawala" && (
                                <div className="animate-in fade-in zoom-in-95 duration-500 bg-[#071324] text-white rounded-[3rem] p-8 md:p-12 border border-[#1A2C4D] relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                    {/* Cosmos Background Effects */}
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
                                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-500/30 transition-colors duration-1000"></div>
                                    <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-1000"></div>

                                    {/* Top Header - Logo Centered */}
                                    <div className="flex flex-col items-center text-center relative z-10 mb-16">
                                        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-[#0A1930] shadow-[0_0_80px_rgba(59,130,246,0.3)] border border-[#1A2C4D] p-6 flex items-center justify-center mb-8 relative group/logo">
                                            <div className="absolute inset-[-20px] border border-dashed border-indigo-400/30 rounded-full animate-[spin_30s_linear_infinite]"></div>
                                            <div className="absolute inset-[-40px] border border-solid border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
                                            <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl group-hover/logo:bg-blue-400/20 transition-colors"></div>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="/cakrawala.png" alt="Logo CAKRAWALA" className="w-full h-full object-contain relative z-10 transform group-hover/logo:scale-110 group-hover/logo:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-500" />
                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-100 to-white tracking-tight mb-3">CAKRAWALA</h3>
                                        <p className="text-blue-300/80 font-medium uppercase tracking-[0.3em] text-sm md:text-base border-b border-[#1A2C4D] pb-2">Ilmu Pengetahuan Bumi & Antariksa</p>
                                    </div>

                                    {/* Bento Grid Layout */}
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
                                        {/* Slogan */}
                                        <div className="md:col-span-12 bg-gradient-to-r from-[#112240] to-[#0A1930] border border-[#233554] rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden group/slogan">
                                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent group-hover/slogan:opacity-30 transition-opacity"></div>
                                            <div className="relative z-10 text-center">
                                                <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-4 animate-pulse group-hover/slogan:scale-125 transition-transform" />
                                                <p className="font-serif italic text-2xl md:text-4xl leading-relaxed text-[#F0C14B] font-bold">
                                                    "Lets Explore The Universe!!"
                                                </p>
                                                <p className="mt-4 text-blue-200/80 max-w-2xl mx-auto">Nah itu dia jargon andalan UKK Cakrawala FPMIPA UPI ini. Apasih UKK Cakrawala itu?</p>
                                            </div>
                                        </div>

                                        {/* Sejarah */}
                                        <div className="md:col-span-12 lg:col-span-8 bg-[#112240]/80 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-[#233554] hover:border-blue-500/30 transition-colors">
                                            <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-[#233554] pb-4">
                                                <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                                                Sejarah dan profil UKK CAKRAWALA
                                            </h4>
                                            <div className="space-y-4 text-justify leading-relaxed text-blue-100/90 text-sm md:text-base">
                                                <p>Pada tanggal 1 September 2002 enam orang mahasiswa UPI yang terdaftar dalam Forum Komunitas Ilmu Falak (ZENITH) bersepakat mendirikan sebuah forum yang mewadahi hobi mahasiswa Fisika FPMIPA UPI pada bidang Ilmu Pengetahuan Bumi dan Antariksa (IPBA) FPMIPA UPI, forum tersebut diberi nama Forum Ilmiah Fisika Cakrawala di Laboratorium IPBA pada koordinat/altitude 060 51’ 42,5° S, longitude 1070 35’ 24,8° E pada ketinggian 1236 meter di atas permukaan laut.</p>
                                                <p>FIF-Cakrawala pada awalnya dibentuk tanpa struktur organisasi karena sifatnya sebagai forum, maka semua mahasiwa yang bergabung tidak memiliki keterikatan dan dapat berasal dari mana saja. Ternyata dengan sifat seperti itu banyak kendala dalam FIF-Cakrawala ini, misalmnya dalam birokrasi ketika mengadakan kegiatan yang bersifat publik. Akhirnya pada tahun 2004 dibentuklah kepengurusan FIF-Cakrawala dengan ketua Cahyo Puji Asmoro dengan mengganti logo sesuai tujuan organisasi. Periode ini Cakrawala menjadi organisasi yang cukup digemari para mahasiswa. Tetapi pada akhir 2006 Cakrawala mengalami benturan legalitas pada tubuh HMF (Himpunan Mahasiswa Fisika).</p>
                                                <div className="bg-[#0A1930] p-5 rounded-2xl border-l-4 border-[#F0C14B] my-6">
                                                    <p className="text-white">Karena adanya permasalahan tersebut pada awal 2007 melalui Musyawarah Mahasiswa Fisika (mumas), status Cakrawala menjadi Unit Kegiatan Khusus (UKK), bukan sebagai forum dalam bidang pendidikan HMF FPMIPA UPI lagi.</p>
                                                </div>
                                                <p>Kepengurusan periode 2016-2017 dengan ketua umum Arief Rizqiyanto Achmad CA.11003 yang bernama bintang ACRUX ini merupakan angkatan ke-11 UKK Cakrawala FPMIPA UPI. Bagi teman-teman yang ingin lebih jauh mengetahui UKK Cakrawala yuk follow Instagram UKK Cakrawala dengan id cakrawala_upi dan add Official Account Line UKK Cakrawala di @dwk5854c.</p>
                                                <p className="text-center font-bold text-[#F0C14B] italic mt-6 -mb-2">Nah, itu dia sejarah singkat UKK Cakrawala. Let’s Explore The Universe!</p>
                                            </div>
                                        </div>

                                        {/* Angkatan & Social */}
                                        <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6">
                                            {/* Angkatan Card */}
                                            <div className="bg-gradient-to-b from-[#112240] to-[#0A1930] rounded-3xl p-8 border border-[#233554] relative overflow-hidden flex-1 shadow-md">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                                <h4 className="text-[#F0C14B] font-bold mb-2 uppercase tracking-wider text-xs">Nama angkatan :</h4>
                                                <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Aldebaran CO 16</h3>
                                                <p className="text-xs font-bold text-blue-300 mb-3 border-b border-[#233554] pb-2 uppercase tracking-wide">Deskripsi Singkat:</p>
                                                <p className="text-sm leading-relaxed text-blue-100/80 text-justify">
                                                    Aldebaran diambil dari nama salah satu bintang yang paling terang pada rasi taurus, sedangkan C diambil dari corona dan O diambil dari online karena pembentukan ini dilaksanakan pada saat pandemi dan dilantik secara online. Sedangkan 16 adalah angka yang menunjukan angkatan.
                                                </p>
                                            </div>

                                            {/* Web & Social */}
                                            <div className="bg-[#112240]/80 backdrop-blur-md rounded-3xl p-6 border border-[#233554] shadow-md">
                                                <p className="text-xs text-blue-200 mb-4 text-center">untuk informasi lengkap UKK cakrawala bisa kunjungi official web cakrawala,</p>
                                                <a href="http://cakrawalaupi.wordpress.com" target="_blank" rel="noopener noreferrer" className="block w-full bg-[#0A1930] hover:bg-[#233554] border border-[#233554] hover:border-blue-500/50 transition-all rounded-xl p-4 text-center group mb-4">
                                                    <span className="text-blue-400 text-sm font-semibold group-hover:text-white transition-colors">cakrawalaupi.wordpress.com</span>
                                                </a>

                                                <div className="flex justify-center gap-4">
                                                    <a href="https://instagram.com/cakrawala_upi" target="_blank" rel="noopener noreferrer" className="p-4 bg-[#0A1930] rounded-2xl text-blue-300 hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all shadow-none border border-[#233554] hover:border-transparent flex-1 flex justify-center items-center group">
                                                        <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                                    </a>
                                                    <div className="py-2 px-4 bg-[#0A1930] rounded-2xl text-blue-300 border border-[#233554] flex-1 flex justify-center items-center select-none">
                                                        <span className="font-bold text-xs text-center"><span className="text-[#F0C14B]">LINE ID:</span><br />@dwk5854c</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pengurus Cakrawala */}
                                        <div className="md:col-span-12 mt-8 pt-10 border-t border-[#233554] flex flex-col items-center">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="w-12 h-12 rounded-xl bg-[#112240] border border-[#233554] flex items-center justify-center text-[#F0C14B] shadow-[0_0_15px_rgba(240,193,75,0.1)]">
                                                    <Users className="w-6 h-6" />
                                                </div>
                                                <h4 className="text-2xl font-black text-white tracking-widest uppercase">Ketua / Pengurus CAKRAWALA</h4>
                                            </div>

                                            <div className="bg-gradient-to-b from-[#112240] to-[#0A1930] rounded-[2rem] p-8 border border-[#233554] shadow-[0_15px_50px_rgba(0,0,0,0.5)] hover:border-[#3A568C] hover:shadow-[0_15px_50px_rgba(58,86,140,0.2)] transition-all duration-500 flex flex-col items-center text-center w-full max-w-sm group relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                                <div className="w-32 h-32 mb-6 rounded-full bg-[#071324] border-[6px] border-[#233554] shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)] overflow-hidden relative group-hover:-translate-y-3 transition-transform duration-500 z-10">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=CakrawalaLeader&backgroundColor=transparent" alt="Ketua Cakrawala" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <span className="px-5 py-1.5 bg-[#F0C14B]/10 text-[#F0C14B] border border-[#F0C14B]/20 rounded-full text-xs font-bold uppercase tracking-widest mb-4 z-10 backdrop-blur-sm">Kabinet Terkini</span>
                                                <h3 className="font-black text-white text-2xl mb-1 group-hover:text-blue-400 transition-colors z-10">Ketua CAKRAWALA</h3>
                                                <p className="text-blue-400 font-medium z-10">Pimpinan Unit</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
