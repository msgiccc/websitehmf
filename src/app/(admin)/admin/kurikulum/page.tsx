import { getAllMataKuliah } from '@/lib/data';
import { MatkulTable } from '@/components/admin/kurikulum-table';

export const metadata = {
    title: 'Kelola Kurikulum KINETIK - Admin',
    description: 'Manajemen basis data mata kuliah UPI.',
};

export const revalidate = 0; // Disable cache so admin sees fresh changes instantly

export default async function AdminKurikulumPage() {
    // Ambil Data SKS dari Supabase via helper
    const matkuls = await getAllMataKuliah();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 font-serif">Manajemen Kurikulum</h1>
                    <p className="text-sm text-gray-500 mt-1">Mengelola kumpulan program studi dan Mata Kuliah untuk kalkulator KINETIK.</p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-100">
                    Total: {matkuls.length} MK
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <MatkulTable matkuls={matkuls} />
            </div>
        </div>
    );
}
