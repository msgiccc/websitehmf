import { getAllOrbitItemsAdmin } from '@/lib/admin-orbit-actions';
import OrbitTable from '@/components/admin/orbit-table';

export default async function AdminOrbitPage() {
    const items = await getAllOrbitItemsAdmin();

    return (
        <div className="p-6 md:p-8">
            <OrbitTable initialData={items as any} />
        </div>
    );
}
