import { getAllFluksItemsAdmin } from '@/lib/admin-fluks-actions';
import FluksTable from '@/components/admin/fluks-table';

export default async function AdminFluksPage() {
    const items = await getAllFluksItemsAdmin();
    return (
        <div className="p-6 md:p-8">
            <FluksTable initialData={items as any} />
        </div>
    );
}
