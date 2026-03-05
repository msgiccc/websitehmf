import { getAllBearrLinks } from '@/lib/data';
import { BearrTable } from '@/components/admin/bearr-table';

export const metadata = {
    title: 'Kelola BEARR - Admin',
    description: 'Manajemen link Bank Soal, E-book, Aplikasi, Responsi, dan Referensi.'
};

export const revalidate = 0;

export default async function AdminBearrPage() {
    const links = await getAllBearrLinks(false); // ambil semua termasuk nonaktif

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 font-serif">Manajemen BEARR</h1>
                    <p className="text-sm text-gray-500 mt-1">Kelola semua tautan Bank Soal, E-book, Aplikasi, Responsi, dan Referensi yang tampil di halaman publik.</p>
                </div>
                <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-lg text-sm font-semibold border border-amber-100">
                    Total: {links.length} tautan
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <BearrTable links={links} />
            </div>
        </div>
    );
}
