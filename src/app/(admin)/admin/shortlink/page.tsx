import { Suspense } from 'react';
import { getAllShortLinks } from '@/lib/data';
import ShortLinkTable from '@/components/admin/shortlink-table';
import { Activity, ShieldCheck, Link2 } from 'lucide-react';

export const revalidate = 0; // Pastikan data selalu fress

export default async function AdminShortLinkPage() {
    const links = await getAllShortLinks();

    // Kalkulasi statistik singkat
    const totalLinks = links.length;
    let totalClicks = 0;

    // Gunakan copy array agar tidak bermasalah
    const safeLinks = [...links];
    safeLinks.forEach(l => totalClicks += (l.jumlah_klik || 0));
    const topLink = safeLinks.sort((a, b) => (b.jumlah_klik || 0) - (a.jumlah_klik || 0))[0];

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Manajemen Link Shortener</h1>
                <p className="text-muted-foreground">Buat dan pantau tautan pendek untuk kampanye, formulir pendaftaran, dan media publikasi himpunan.</p>
            </div>

            {/* Statistik */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Tautan Dibuat</h3>
                        <Link2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="p-0">
                        <div className="text-2xl font-bold">{totalLinks}</div>
                        <p className="text-xs text-muted-foreground mt-1">Tautan aktif di sistem</p>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Trafik Klik</h3>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="p-0">
                        <div className="text-2xl font-bold">{totalClicks.toLocaleString('id-ID')}</div>
                        <p className="text-xs text-muted-foreground mt-1">Total pengalihan berhasil</p>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 overflow-hidden">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Tautan Teratas</h3>
                        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="p-0">
                        <div className="text-2xl font-bold truncate">
                            {topLink ? `/${topLink.slug}` : '-'}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                            {topLink ? `${topLink.jumlah_klik.toLocaleString('id-ID')} klik` : 'Belum ada data'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabel Utama */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 mt-6">
                <Suspense fallback={<div className="p-10 text-center animate-pulse text-muted-foreground">Memuat daftar tautan...</div>}>
                    <ShortLinkTable initialData={links} />
                </Suspense>
            </div>
        </div>
    );
}
