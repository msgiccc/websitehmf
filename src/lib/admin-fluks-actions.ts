'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function createFluksItem(formData: FormData) {
    const payload = {
        nama: formData.get('nama') as string,
        deskripsi: (formData.get('deskripsi') as string) || null,
        harga: parseInt(formData.get('harga') as string) || 0,
        kategori: formData.get('kategori') as string,
        foto_url: (formData.get('foto_url') as string) || null,
        link_order: (formData.get('link_order') as string) || null,
        tipe_link: formData.get('tipe_link') as string,
        stok: formData.get('stok') as string,
        badge: (formData.get('badge') as string) || null,
        is_active: formData.get('is_active') === 'true',
        urutan: parseInt(formData.get('urutan') as string) || 0,
    };

    if (!payload.nama) return { error: 'Nama produk wajib diisi.' };

    const { error } = await supabaseAdmin.from('FluksItem').insert([payload]);
    if (error) return { error: error.message };

    revalidatePath('/fluks');
    revalidatePath('/admin/fluks');
    return { success: true };
}

export async function updateFluksItem(id: string, formData: FormData) {
    const payload = {
        nama: formData.get('nama') as string,
        deskripsi: (formData.get('deskripsi') as string) || null,
        harga: parseInt(formData.get('harga') as string) || 0,
        kategori: formData.get('kategori') as string,
        foto_url: (formData.get('foto_url') as string) || null,
        link_order: (formData.get('link_order') as string) || null,
        tipe_link: formData.get('tipe_link') as string,
        stok: formData.get('stok') as string,
        badge: (formData.get('badge') as string) || null,
        is_active: formData.get('is_active') === 'true',
        urutan: parseInt(formData.get('urutan') as string) || 0,
    };

    const { error } = await supabaseAdmin.from('FluksItem').update(payload).eq('id', id);
    if (error) return { error: error.message };

    revalidatePath('/fluks');
    revalidatePath('/admin/fluks');
    return { success: true };
}

export async function deleteFluksItem(id: string) {
    const { error } = await supabaseAdmin.from('FluksItem').delete().eq('id', id);
    if (error) return { error: error.message };

    revalidatePath('/fluks');
    revalidatePath('/admin/fluks');
    return { success: true };
}

export async function getAllFluksItemsAdmin() {
    const { data, error } = await supabaseAdmin
        .from('FluksItem')
        .select('*')
        .order('urutan', { ascending: true })
        .order('created_at', { ascending: false });
    if (error) return [];
    return data || [];
}
