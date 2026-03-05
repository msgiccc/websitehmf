import { getAllMataKuliah } from '@/lib/data';
import KinetikClient from './kinetik-client';

export const metadata = {
    title: 'KINETIK - Kalkulator IPK | HMF FPMIPA UPI',
    description: 'Kalkulator Indeks Nilai dan Evaluasi Target IPK Kampus untuk mahasiswa Fisika Pendidikan UPI.',
};

export const revalidate = 0; // Fetch data matkul terbaru! (Opsional: ganti jadi revalidate time jika jarang berubah)

export default async function KinetikServerPage() {
    // 1. Tarik Data Server-Side dari Database
    const serverMataKuliah = await getAllMataKuliah();

    // 2. Lempar ke Komponen Client sebagai props
    return <KinetikClient initialData={serverMataKuliah} />;
}
