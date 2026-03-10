import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Briefcase, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { DUMMY_PENGURUS, DUMMY_ARTIKEL, DUMMY_PROKER, DUMMY_GALERI } from "@/lib/dummy-data";

export const revalidate = 0;

async function getCount(table: string): Promise<number> {
    try {
        const { count, error } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true });
        if (error) return 0;
        return count ?? 0;
    } catch {
        return 0;
    }
}

export default async function AdminDashboardPage() {
    const [pengurusCount, artikelCount, prokerCount, galeriCount] = await Promise.all([
        getCount('Pengurus'),
        getCount('Artikel'),
        getCount('ProgramKerja'),
        getCount('Galeri'),
    ]);

    const stats = [
        {
            title: 'Total Pengurus',
            value: pengurusCount || DUMMY_PENGURUS.length,
            icon: Users,
            description: 'anggota terdaftar',
        },
        {
            title: 'Total Artikel',
            value: artikelCount || DUMMY_ARTIKEL.length,
            icon: FileText,
            description: 'artikel tersimpan',
        },
        {
            title: 'Program Kerja',
            value: prokerCount || DUMMY_PROKER.length,
            icon: Briefcase,
            description: 'proker terdaftar',
        },
        {
            title: 'Galeri / Dokumentasi',
            value: galeriCount || DUMMY_GALERI.length,
            icon: ImageIcon,
            description: 'foto tersimpan',
        },
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Creative Welcome Banner */}
            <div className="relative w-full rounded-3xl bg-card border border-border overflow-hidden shadow-2xl p-8 md:p-12 text-foreground perspective-1000">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/20 to-transparent blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-ring/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 max-w-2xl space-y-4">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-white/5 text-foreground text-xs font-bold tracking-widest uppercase mb-2 border border-white/10 backdrop-blur-md">
                        Pusat Kontrol Niskala
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                        Selamat Datang kembali.
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed opacity-90">
                        Kelola seluruh konten, keanggotaan, dan jejak digital Himpunan Mahasiswa FPMIPA UPI dengan mudah dan terpusat.
                    </p>
                </div>
            </div>

            {/* Quick Stats */}
            <div>
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <div className="w-2 h-6 bg-primary rounded-full"></div>
                    Ikhtisar Sistem
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, i) => (
                        <div key={stat.title} className="relative group perspective-1000">
                            {/* Hover glow effect */}
                            <div className={`absolute inset-0 bg-gradient-to-tr ${i % 2 === 0 ? 'from-primary/10' : 'from-ring/10'} to-transparent blur-2xl rounded-2xl transform group-hover:scale-110 transition-transform duration-500`}></div>

                            <Card className="relative bg-card/60 backdrop-blur-xl border border-border text-left shadow-lg overflow-hidden group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{stat.title}</CardTitle>
                                    <div className="p-2.5 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <stat.icon className="h-4 w-4" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-black text-foreground mb-1">{stat.value}</div>
                                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-ring"></span> {stat.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
