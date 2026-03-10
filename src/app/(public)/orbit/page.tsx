import { getOrbitItems } from '@/lib/data';
import OrbitClient from './orbit-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ORBIT — Pasar Barang Bekas Mahasiswa | HMF FPMIPA UPI',
    description: 'Operan Ragam Barang dan Inventaris Terjangkau. Pasar barang bekas gratis sebagai wadah pertukaran alat penunjang kuliah mahasiswa Fisika UPI.',
};

export default async function OrbitPage() {
    const items = await getOrbitItems(true);

    return <OrbitClient initialData={items} />;
}
