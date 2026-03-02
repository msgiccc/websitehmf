import BidangTable from "@/components/admin/bidang-table";
import { getAllBidang, getBidangBySlug } from "@/lib/data";
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

export default async function AdminBidangPage() {
    const session = await auth();
    const isAdmin = (session?.user as any)?.username === 'admin';
    const username = (session?.user as any)?.username || '';

    let bidang = [];
    if (isAdmin) {
        bidang = await getAllBidang();
    } else {
        const slug = USER_BIDANG_MAP[username];
        if (slug) {
            const singleBidang = await getBidangBySlug(slug);
            if (singleBidang) bidang = [singleBidang];
        }
    }

    return (
        <div className="space-y-6">
            <BidangTable initialData={bidang ? JSON.parse(JSON.stringify(bidang)) : []} />
        </div>
    );
}
