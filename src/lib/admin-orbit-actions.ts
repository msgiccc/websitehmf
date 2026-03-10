'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

// Admin client — bypass RLS
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function createOrbitItem(formData: FormData) {
    const hargaRaw = formData.get('harga') as string;
    const payload = {
        judul: formData.get('judul') as string,
        deskripsi: (formData.get('deskripsi') as string) || null,
        harga: parseInt(hargaRaw) || 0,
        kondisi: formData.get('kondisi') as string,
        kategori: formData.get('kategori') as string,
        foto_url: (formData.get('foto_url') as string) || null,
        penjual_nama: formData.get('penjual_nama') as string,
        penjual_instagram: (formData.get('penjual_instagram') as string).replace(/^@/, ''),
        is_terjual: false,
        is_active: formData.get('is_active') === 'true',
    };

    if (!payload.judul || !payload.penjual_nama || !payload.penjual_instagram) {
        return { error: 'Judul, Nama Penjual, dan Instagram wajib diisi.' };
    }

    const { error } = await supabaseAdmin.from('OrbitItem').insert([payload]);
    if (error) return { error: error.message };

    revalidatePath('/orbit');
    revalidatePath('/admin/orbit');
    return { success: true };
}

export async function updateOrbitItem(id: string, formData: FormData) {
    const hargaRaw = formData.get('harga') as string;
    const payload = {
        judul: formData.get('judul') as string,
        deskripsi: (formData.get('deskripsi') as string) || null,
        harga: parseInt(hargaRaw) || 0,
        kondisi: formData.get('kondisi') as string,
        kategori: formData.get('kategori') as string,
        foto_url: (formData.get('foto_url') as string) || null,
        penjual_nama: formData.get('penjual_nama') as string,
        penjual_instagram: (formData.get('penjual_instagram') as string).replace(/^@/, ''),
        is_terjual: formData.get('is_terjual') === 'true',
        is_active: formData.get('is_active') === 'true',
    };

    const { error } = await supabaseAdmin.from('OrbitItem').update(payload).eq('id', id);
    if (error) return { error: error.message };

    revalidatePath('/orbit');
    revalidatePath('/admin/orbit');
    return { success: true };
}

export async function deleteOrbitItem(id: string) {
    const { error } = await supabaseAdmin.from('OrbitItem').delete().eq('id', id);
    if (error) return { error: error.message };

    revalidatePath('/orbit');
    revalidatePath('/admin/orbit');
    return { success: true };
}

export async function toggleOrbitTerjual(id: string, isTerjual: boolean) {
    const { error } = await supabaseAdmin
        .from('OrbitItem')
        .update({ is_terjual: isTerjual })
        .eq('id', id);
    if (error) return { error: error.message };

    revalidatePath('/orbit');
    revalidatePath('/admin/orbit');
    return { success: true };
}

export async function getAllOrbitItemsAdmin() {
    const { data, error } = await supabaseAdmin
        .from('OrbitItem')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) return [];
    return data || [];
}
