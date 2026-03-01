import { getBidangBySlug, getProkerByBidang } from "@/lib/data";
import ProkerTable from "@/components/admin/proker-table";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function AdminProkerPerBidangPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

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
