'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

// Admin client bypasses RLS
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function createBearrLink(formData: FormData) {
    const payload = {
        kategori: formData.get('kategori') as string,
        judul: formData.get('judul') as string,
        deskripsi: (formData.get('deskripsi') as string) || null,
        url: formData.get('url') as string,
        tipe_url: formData.get('tipe_url') as string,
        is_active: formData.get('is_active') === 'true',
        urutan: parseInt(formData.get('urutan') as string) || 0,
    };

    if (!payload.kategori || !payload.judul || !payload.url) {
        return { error: 'Kategori, Judul, dan URL wajib diisi.' };
    }

    const { error } = await supabaseAdmin.from('BearrLink').insert([payload]);
    if (error) return { error: error.message };

    revalidatePath('/bearr');
    revalidatePath('/admin/bearr');
}

export async function updateBearrLink(id: string, formData: FormData) {
    const payload = {
        kategori: formData.get('kategori') as string,
        judul: formData.get('judul') as string,
        deskripsi: (formData.get('deskripsi') as string) || null,
        url: formData.get('url') as string,
        tipe_url: formData.get('tipe_url') as string,
        is_active: formData.get('is_active') === 'true',
        urutan: parseInt(formData.get('urutan') as string) || 0,
    };

    const { error } = await supabaseAdmin.from('BearrLink').update(payload).eq('id', id);
    if (error) return { error: error.message };

    revalidatePath('/bearr');
    revalidatePath('/admin/bearr');
}

export async function deleteBearrLink(id: string) {
    const { error } = await supabaseAdmin.from('BearrLink').delete().eq('id', id);
    if (error) return { error: error.message };

    revalidatePath('/bearr');
    revalidatePath('/admin/bearr');
}
