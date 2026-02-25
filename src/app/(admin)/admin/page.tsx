import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Briefcase, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { DUMMY_PENGURUS, DUMMY_ARTIKEL, DUMMY_PROKER, DUMMY_GALERI } from "@/lib/dummy-data";

export default async function AdminDashboardPage() {
    const [
        { count: pengurusCount },
        { count: artikelCount },
        { count: prokerCount },
        { count: galeriCount }
    ] = await Promise.all([
        supabase.from('Pengurus').select('*', { count: 'exact', head: true }),
        supabase.from('Artikel').select('*', { count: 'exact', head: true }),
        supabase.from('ProgramKerja').select('*', { count: 'exact', head: true }),
        supabase.from('Galeri').select('*', { count: 'exact', head: true })
    ]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground">Selamat datang di CMS Himpunan Mahasiswa FPMIPA UPI</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 text-muted-foreground pb-2">
                        <CardTitle className="text-sm font-medium">Total Pengurus</CardTitle>
                        <Users className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pengurusCount ?? DUMMY_PENGURUS.length}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 text-muted-foreground pb-2">
                        <CardTitle className="text-sm font-medium">Total Artikel</CardTitle>
                        <FileText className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{artikelCount ?? DUMMY_ARTIKEL.length}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 text-muted-foreground pb-2">
                        <CardTitle className="text-sm font-medium">Program Kerja</CardTitle>
                        <Briefcase className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{prokerCount ?? DUMMY_PROKER.length}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 text-muted-foreground pb-2">
                        <CardTitle className="text-sm font-medium">Galeri / Dokumentasi</CardTitle>
                        <ImageIcon className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{galeriCount ?? DUMMY_GALERI.length}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
