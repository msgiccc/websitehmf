import { getAllUsers } from '@/lib/data';
import LaserQuotaTable from '@/components/admin/laser-quota-table';
import { Target } from 'lucide-react';
import { auth } from '@/auth';
import Link from 'next/link';

export const revalidate = 0;

export default async function LaserQuotaPage() {
    const session = await auth();
    const isAdmin = (session?.user as any)?.username === 'admin';

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center">
                    <Target className="w-10 h-10 text-primary" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-2">Akses Ditolak</h2>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                        Halaman ini hanya diperuntukkan bagi Administrator Utama (DPK).
                    </p>
                </div>
            </div>
        );
    }

    const users = await getAllUsers();

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Manajemen Kuota LASER</h1>
                <p className="text-muted-foreground">Atur batas maksimal pembuatan tautan untuk akun Bidang/Lembaga.</p>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 mt-6">
                <LaserQuotaTable initialData={users} />
            </div>
        </div>
    );
}
