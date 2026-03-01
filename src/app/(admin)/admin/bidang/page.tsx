import BidangTable from "@/components/admin/bidang-table";
import { getAllBidang } from "@/lib/data";

export const revalidate = 0;

export default async function AdminBidangPage() {
    const bidang = await getAllBidang();

    return (
        <div className="space-y-6">
            <BidangTable initialData={bidang ? JSON.parse(JSON.stringify(bidang)) : []} />
        </div>
    );
}
