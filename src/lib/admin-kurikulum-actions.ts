'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Idealnya Service_Role untuk Admin, tapi ini demo

const supabase = createClient(supabaseUrl, supabaseKey);

// -------------------------------------------------------------------------------- //
// TABEL MATA KULIAH KURIKULUM UPI                                                    //
// -------------------------------------------------------------------------------- //

export async function createMatkul(formData: FormData) {
    const kode = formData.get('kode') as string;
    const nama = formData.get('nama') as string;
    const sks = Number(formData.get('sks'));
    const semester_rekomendasi = Number(formData.get('semester_rekomendasi'));
    const prodi = formData.get('prodi') as string;
    const kategori = formData.get('kategori') as string;

    const { error } = await supabase.from('MataKuliah').insert({
        kode,
        nama,
        sks,
        semester_rekomendasi,
        prodi,
        kategori: kategori || null,
    });

    if (error) return { error: error.message };

    revalidatePath('/admin/kurikulum');
    revalidatePath('/kinetik'); // Revalidate halaman user
    return { success: true };
}

export async function updateMatkul(id: string, formData: FormData) {
    const kode = formData.get('kode') as string;
    const nama = formData.get('nama') as string;
    const sks = Number(formData.get('sks'));
    const semester_rekomendasi = Number(formData.get('semester_rekomendasi'));
    const prodi = formData.get('prodi') as string;
    const kategori = formData.get('kategori') as string;

    const { error } = await supabase.from('MataKuliah').update({
        kode,
        nama,
        sks,
        semester_rekomendasi,
        prodi,
        kategori: kategori || null,
    }).eq('id', id);

    if (error) return { error: error.message };

    revalidatePath('/admin/kurikulum');
    revalidatePath('/kinetik');
    return { success: true };
}

export async function deleteMatkul(id: string) {
    const { error } = await supabase.from('MataKuliah').delete().eq('id', id);

    if (error) return { error: error.message };

    revalidatePath('/admin/kurikulum');
    revalidatePath('/kinetik');
    return { success: true };
}
