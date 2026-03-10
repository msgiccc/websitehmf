import { getAllFluksItemsAdmin, getFluksConfigAdmin } from '@/lib/admin-fluks-actions';
import FluksTable from '@/components/admin/fluks-table';

export default async function AdminFluksPage() {
    const [items, config] = await Promise.all([
        getAllFluksItemsAdmin(),
        getFluksConfigAdmin(),
    ]);

    return (
        <div className="p-6 md:p-8">
            <FluksTable initialData={items as any} config={config as any} />
        </div>
    );
}
