import { getBidangBySlug, getProkerByBidang } from "@/lib/data";
import ProkerTable from "@/components/admin/proker-table";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

export const revalidate = 0;

const USER_BIDANG_MAP: Record<string, string> = {
    'kesek': 'lembaga-kesekretariatan',
    'keuangan': 'lembaga-keuangan',
    'akademik': 'bidang-akademik',
    'ekbis': 'bidang-ekonomi-dan-bisnis',
    'kaderisasi': 'bidang-kaderisasi',
    'kerohanian': 'bidang-kerohanian',
    'kominfo': 'bidang-komunikasi-dan-media-informasi',
    'litbang': 'bidang-penelitian-dan-pengembangan',
    'mikat': 'bidang-pengembangan-minat-dan-bakat',
    'sospol': 'bidang-sosial-dan-politik',
};

export default async function AdminProkerPerBidangPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Authorization Check
    const session = await auth();
    const isAdmin = (session?.user as any)?.username === 'admin';
    const username = (session?.user as any)?.username || '';

    if (!isAdmin && USER_BIDANG_MAP[username] !== slug) {
        redirect('/admin/bidang');
    }

    const [bidang, prokers] = await Promise.all([
        getBidangBySlug(slug),
        getProkerByBidang(slug)
    ]);

    if (!bidang) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/bidang">
                    <Button variant="outline" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-xl font-bold">Program Kerja: {bidang.name}</h2>
                    <p className="text-sm text-muted-foreground">Kelola daftar agenda untuk divisi ini.</p>
                </div>
            </div>

            <ProkerTable initialData={prokers ? JSON.parse(JSON.stringify(prokers)) : []} slugBidang={slug} />
        </div>
    );
}
