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
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground">Selamat datang di CMS Himpunan Mahasiswa FPMIPA UPI</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 text-muted-foreground pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
