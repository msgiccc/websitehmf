"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Linkedin, Instagram, PlayCircle } from "lucide-react";

// Sub-component to handle search params safely within Suspense
function TabHandler({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get("tab");

    useEffect(() => {
        if (tabParam && ["sejarah", "lambang", "mars"].includes(tabParam)) {
            setActiveTab(tabParam);
        }
    }, [tabParam, setActiveTab]);

    return null;
}

export function ProfileTabs() {
    const [activeTab, setActiveTab] = useState("sejarah");

    const tabs = [
        { id: "sejarah", label: "Sejarah Singkat" },
        { id: "lambang", label: "Lambang HMF" },
        { id: "mars", label: "Mars & Hymne" },
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

                        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start">
                            {/* Logo Display */}
                            <div className="w-full lg:w-1/3 flex flex-col items-center lg:sticky lg:top-32">
                                <div className="w-64 h-64 md:w-80 md:h-80 relative group">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1F3A]/5 to-[#E63946]/5 rounded-full blur-3xl animate-pulse-slow"></div>
                                    <div className="absolute inset-0 bg-white rounded-full shadow-[0_10px_50px_rgba(0,0,0,0.05)] border-8 border-[#F4F1EC]/50 flex items-center justify-center p-6 z-10 transform group-hover:scale-105 transition-transform duration-500">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="/logo.png" alt="Logo HMF" className="w-full h-full object-contain" />
                                    </div>
                                </div>
                                <div className="mt-12">
                                    <a href="/logo.png" download>
                                        <button className="bg-white border-2 border-[#0B1F3A] text-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white rounded-full px-8 py-3.5 font-bold transition-all flex items-center gap-2 shadow-sm hover:shadow-lg hover:-translate-y-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                                            Unduh Lambang HMF
                                        </button>
                                    </a>
                                </div>
                            </div>

                            {/* Meaning Lists Cards Grid */}
                            <div className="w-full lg:w-2/3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow relative overflow-hidden group">
                                        <h3 className="font-bold text-[#E63946] text-xl mb-3 relative z-10 group-hover:text-[#c92020] transition-colors">Tulisan & Lingkaran</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm relative z-10">Tulisan Himpunan Mahasiswa Fisika FPMIPA UPI dan singkatan HMF dalam lingkaran biru menunjukan nama organisasi.</p>
                                        <div className="absolute -bottom-4 -right-4 text-[#F4F1EC] opacity-50 font-serif font-bold text-7xl select-none mix-blend-multiply border-gray-100/50">”</div>
                                    </div>

                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow relative overflow-hidden group">
                                        <h3 className="font-bold text-[#E63946] text-xl mb-3 relative z-10 group-hover:text-[#c92020] transition-colors">Mahkota Segilima</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm relative z-10">Mahkota segilima warna putih bertepikan biru pada bentuk luar melambangkan menjalankan kegiatan berdasarkan Pancasila, UUD 1945, serta Tridharma PT.</p>
                                        <div className="absolute -bottom-4 -right-4 text-[#F4F1EC] opacity-50 font-serif font-bold text-7xl select-none mix-blend-multiply border-gray-100/50">”</div>
                                    </div>

                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow relative overflow-hidden group">
                                        <h3 className="font-bold text-[#E63946] text-xl mb-3 relative z-10 group-hover:text-[#c92020] transition-colors">Lingkaran Biru Dalam</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm relative z-10">Mempunyai arti bahwa kegiatan berlandaskan asas kekeluargaan, segala aspek pemecahan masalah diselesaikan secara musyawarah mufakat.</p>
                                        <div className="absolute -bottom-4 -right-4 text-[#F4F1EC] opacity-50 font-serif font-bold text-7xl select-none mix-blend-multiply border-gray-100/50">”</div>
                                    </div>

                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow relative overflow-hidden group">
                                        <h3 className="font-bold text-[#E63946] text-xl mb-3 relative z-10 group-hover:text-[#c92020] transition-colors">Sepasang Sayap</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm relative z-10">Berwarna putih berarti memiliki bidang-bidang dengan tugasnya masing-masing akan tetapi saling membantu mencapai tujuan.</p>
                                        <div className="absolute -bottom-4 -right-4 text-[#F4F1EC] opacity-50 font-serif font-bold text-7xl select-none mix-blend-multiply border-gray-100/50">”</div>
                                    </div>

                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow relative overflow-hidden group">
                                        <h3 className="font-bold text-[#E63946] text-xl mb-3 relative z-10 group-hover:text-[#c92020] transition-colors">Lintasan Elektron Merah</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm relative z-10">Berarti HMF memiliki sifat dinamis dan aktif sesuai dengan peraturan dan hukum yang berlaku dan dapat dipertanggungjawabkan.</p>
                                        <div className="absolute -bottom-4 -right-4 text-[#F4F1EC] opacity-50 font-serif font-bold text-7xl select-none mix-blend-multiply border-gray-100/50">”</div>
                                    </div>

                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow relative overflow-hidden group">
                                        <h3 className="font-bold text-[#E63946] text-xl mb-3 relative z-10 group-hover:text-[#c92020] transition-colors">Segitiga Terbalik Merah</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm relative z-10">Mengarah ke bawah berarti HMF memiliki dasar yang kuat dengan akar yang kokoh sehingga mantap walaupun mendapat tantangan.</p>
                                        <div className="absolute -bottom-4 -right-4 text-[#F4F1EC] opacity-50 font-serif font-bold text-7xl select-none mix-blend-multiply border-gray-100/50">”</div>
                                    </div>

                                </div>

                                {/* Arti Warna - Modernized */}
                                <div className="mt-10 bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#0B1F3A] via-[#E63946] to-[#C9A24D]"></div>
                                    <h3 className="text-2xl font-serif font-bold text-[#0B1F3A] mb-6">Simbolik Warna</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-6 h-6 rounded-full bg-[#0B1F3A] shrink-0 mt-1 shadow-md"></div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">Biru</h4>
                                                <p className="text-gray-600 text-sm">HMF dijiwai semangat pengabdian yang tinggi untuk mencapai tujuan mulia.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-6 h-6 rounded-full bg-[#E63946] shrink-0 mt-1 shadow-md"></div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">Merah</h4>
                                                <p className="text-gray-600 text-sm">Berarti HMF FPMIPA UPI memiliki energi yang sangat besar sebagai modal dalam beraktifitas.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-200 shrink-0 mt-1 shadow-sm"></div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">Putih</h4>
                                                <p className="text-gray-600 text-sm">Memiliki keragaman potensi anggota yang berpadu untuk mencapai tujuan organisasi yang sama.</p>
                                            </div>
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

            </div>
        </div>
    );
}
