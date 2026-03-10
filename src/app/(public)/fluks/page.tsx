import { getFluksItems } from '@/lib/data';
import FluksClient from './fluks-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FLUKS — Toko Danusan Ekobis | HMF FPMIPA UPI',
    description: 'Fasilitas Layanan Usaha dan Kebutuhan Sekitar. Etalase digital resmi danusan Divisi Ekonomi & Bisnis HMF FPMIPA UPI.',
};

export default async function FluksPage() {
    const items = await getFluksItems(true);
    return <FluksClient initialData={items} />;
}
