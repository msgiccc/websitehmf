"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type KabinetTabsProps = {
    groupedPengurus: Record<string, any[]>;
    visi: string;
    misiList: string[];
    unggulan: any[];
};

// Sub-component to handle search params safely within Suspense
function TabHandler({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get("tab");

    useEffect(() => {
        if (tabParam && ["visi-misi", "program-unggulan", "profil"].includes(tabParam)) {
            setActiveTab(tabParam);
        }
    }, [tabParam, setActiveTab]);

    return null;
}

export function KabinetTabs({ groupedPengurus, visi, misiList, unggulan }: KabinetTabsProps) {
    const [activeTab, setActiveTab] = useState("visi-misi");

    const tabs = [
        { id: "visi-misi", label: "Visi & Misi" },
        { id: "program-unggulan", label: "Program Unggulan" },
        { id: "profil", label: "Profil Kabinet" },
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
                            ? "bg-white text-[#2c1469] border-t-4 border-t-[#2c1469]"
                            : "text-gray-500 hover:text-[#2c1469] hover:bg-white/50 border-t-4 border-t-transparent"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content Container */}
            <div className="bg-white w-full max-w-5xl rounded-b-xl md:rounded-tr-none shadow-lg p-6 md:p-12 min-h-[50vh]">

                {/* TAB 1: VISI & MISI */}
                {activeTab === "visi-misi" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="max-w-4xl mx-auto space-y-16">

                            <div className="text-center space-y-4 relative">
                                <h2 className="text-4xl md:text-5xl font-serif font-black text-[#2c1469]">Visi Utama</h2>
                                <div className="w-16 h-1.5 bg-[#E63946] rounded-full mx-auto"></div>
                                <p className="text-gray-600 text-xl font-medium pt-6 leading-relaxed bg-[#F4F1EC]/50 p-8 rounded-2xl border border-gray-100">
                                    "{visi}"
                                </p>
                            </div>

                            <div className="max-w-3xl mx-auto space-y-6">
                                <h3 className="text-3xl font-serif font-bold text-[#0B1F3A] flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#E63946] text-white flex items-center justify-center text-sm">M</div>
                                    Misi Prioritas
                                </h3>
                                <ul className="space-y-4">
                                    {misiList.map((misiItem, idx) => (
                                        <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-50">
                                            <div className="w-6 h-6 rounded-full bg-[#2c1469]/10 text-[#2c1469] flex-shrink-0 flex items-center justify-center mt-0.5">•</div>
                                            <span className="text-gray-700 leading-relaxed font-medium">{misiItem}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                )}

                {/* TAB 2: PROGRAM UNGGULAN */}
                {activeTab === "program-unggulan" && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-700 max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2c1469]">Program Kerja Unggulan</h2>
                            <div className="w-16 h-1 bg-[#E63946] mx-auto mt-6 rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {unggulan.length > 0 ? (
                                unggulan.map((prog, idx) => (
                                    <div key={idx} className="bg-gray-50 p-10 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow group flex flex-col items-center text-center">
                                        <div
                                            className="w-20 h-20 bg-[#2c1469]/10 rounded-full flex items-center justify-center text-[#2c1469] mb-8 group-hover:scale-110 group-hover:bg-[#2c1469] group-hover:text-white transition-all duration-300"
                                            dangerouslySetInnerHTML={{ __html: prog.iconSvg || '<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>' }}
                                        />
                                        <h3 className="text-2xl font-bold text-[#0B1F3A] mb-4">{prog.nama}</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm max-w-xs mx-auto">
                                            {prog.deskripsi}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 text-gray-400 border border-dashed rounded-3xl">
                                    Belum ada Program Unggulan pada kabinet ini.
                                </div>
                            )}
                        </div>

                    </div>
                )}

                {/* TAB 3: PROFIL KABINET (STRUKTUR ORGANISASI) */}
                {activeTab === "profil" && (() => {
                    // Custom sorting for divisions
                    const pimpinan = groupedPengurus["Pimpinan"] || [];
                    const order = [
                        "Lembaga Kesekretariatan",
                        "Lembaga Keuangan",
                        "Bidang Akademik",
                        "Bidang Ekonomi dan Bisnis",
                        "Bidang Kaderisasi",
                        "Bidang Kerohanian",
                        "Bidang Komunikasi dan Media Informasi",
                        "Bidang Penelitian dan Pengembangan",
                        "Bidang Pengembangan Minat dan Bakat",
                        "Bidang Sosial dan Politik"
                    ];

                    return (
                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 min-h-screen">
                            <div className="text-center space-y-4 mb-20 mx-auto max-w-2xl relative">
                                <span className="inline-block py-1.5 px-4 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] text-xs font-bold tracking-widest uppercase mb-4 border border-[#0B1F3A]/10">Struktur Organisasi</span>
                                <h2 className="text-4xl md:text-5xl font-serif font-black text-[#2c1469]">Niskala Cakra</h2>
                                <p className="text-gray-500 text-lg leading-relaxed pt-2 font-medium">
                                    Mengenal lebih dekat para fungsionaris yang menggerakkan roda organisasi Himpunan Mahasiswa Fisika periode ini.
                                </p>
                                <div className="absolute top-0 right-10 w-20 h-20 bg-[#C9A24D]/20 rounded-full blur-2xl"></div>
                            </div>

                            {/* Pimpinan Section */}
                            {pimpinan.length > 0 && (
                                <div className="mb-24 relative">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 bg-gradient-to-r from-[#E63946]/10 via-[#2c1469]/10 to-[#C9A24D]/10 blur-3xl rounded-full z-0 pointer-events-none"></div>
                                    <div className="text-center mb-16 relative z-10">
                                        <h3 className="text-3xl font-serif font-bold text-[#0B1F3A] inline-block relative">
                                            Pimpinan
                                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[#E63946] rounded-full"></div>
                                        </h3>
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-6 md:gap-10 relative z-10">
                                        {pimpinan.map(person => (
                                            <div key={person.id} className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 flex flex-col items-center">
                                                <div className="relative w-full aspect-[4/5] max-w-[200px] bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden group hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={person.fotoUrl} alt={person.nama} className="w-full h-full object-contain md:object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>

                                                <div className="text-center mt-4">
                                                    <h4 className="text-sm md:text-base font-bold text-[#0B1F3A] leading-tight">{person.jabatan}</h4>
                                                    <p className="text-xs font-semibold text-gray-500 mt-1">{person.nama}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Divisions Section */}
                            <div className="space-y-24">
                                {order.map(divisi => {
                                    const members = groupedPengurus[divisi];
                                    if (!members || members.length === 0) return null;

                                    return (
                                        <section key={divisi} className="relative">
                                            <div className="flex flex-col items-center mb-16 text-center">
                                                <h4 className="text-2xl md:text-3xl font-serif font-bold text-[#2c1469]">{divisi}</h4>
                                                <div className="w-12 h-1 bg-[#C9A24D] rounded-full mt-4"></div>
                                            </div>

                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 p-2 max-w-6xl mx-auto">
                                                {members.map(person => (
                                                    <div key={person.id} className="w-full flex flex-col items-center">
                                                        <div className="relative w-full aspect-[4/5] max-w-[180px] bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden group hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                                            <img src={person.fotoUrl} alt={person.nama} className="w-full h-full object-contain md:object-cover group-hover:scale-110 transition-transform duration-500" />
                                                        </div>

                                                        <div className="text-center mt-4 px-2">
                                                            <h4 className="text-xs md:text-sm font-bold text-[#0B1F3A] leading-tight">{person.jabatan}</h4>
                                                            <p className="text-[11px] md:text-xs font-semibold text-gray-500 mt-1 truncate w-full">{person.nama}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    );
                                })}
                            </div>

                        </div>
                    );
                })()}
            </div>
        </div>
    );
}
