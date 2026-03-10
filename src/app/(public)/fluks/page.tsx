import { getFluksItems, getFluksConfig } from '@/lib/data';
import FluksClient from './fluks-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FLUKS — Toko Danusan Ekobis | HMF FPMIPA UPI',
    description: 'Fasilitas Layanan Usaha dan Kebutuhan Sekitar. Etalase digital resmi danusan Divisi Ekonomi & Bisnis HMF FPMIPA UPI.',
};

export default async function FluksPage() {
    const [items, config] = await Promise.all([
        getFluksItems(true),
        getFluksConfig(),
    ]);

    return <FluksClient initialData={items} config={config} />;
}
