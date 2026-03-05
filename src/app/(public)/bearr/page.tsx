import { getAllBearrLinks } from '@/lib/data';
import BearrClient from '@/app/(public)/bearr/bearr-client';

export const revalidate = 0;

export const metadata = {
    title: 'BEARR — Sumber Belajar HMF | Fisika UPI',
    description: 'Bank soal, E-book, Aplikasi, Responsi, dan Referensi Belajar dari Himpunan Mahasiswa Fisika FPMIPA UPI.',
};

export default async function BearrPage() {
    const links = await getAllBearrLinks(true);
    return <BearrClient initialData={links} />;
}
