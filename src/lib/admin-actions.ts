'use server';

import { supabase } from './supabase';
import { revalidatePath } from 'next/cache';

// Reusable function to standardized error/success responses
function response(success: boolean, message: string, data?: any) {
    return { success, message, data };
}

// ------------------- PENGURUS -------------------
export async function createPengurus(data: any) {
    const { error } = await supabase.from('Pengurus').insert(data);
    if (error) return response(false, error.message);
    revalidatePath('/admin/pengurus');
    revalidatePath('/tentang-kami');
    return response(true, 'Pengurus berhasil ditambahkan');
}
export async function updatePengurus(id: string, data: any) {
    const { error } = await supabase.from('Pengurus').update(data).eq('id', id);
    if (error) return response(false, error.message);
    revalidatePath('/admin/pengurus');
    revalidatePath('/tentang-kami');
    return response(true, 'Pengurus berhasil diubah');
}
export async function deletePengurus(id: string) {
    const { error } = await supabase.from('Pengurus').delete().eq('id', id);
    if (error) return response(false, error.message);
    revalidatePath('/admin/pengurus');
    revalidatePath('/tentang-kami');
    return response(true, 'Pengurus berhasil dihapus');
}

// ------------------- ARTIKEL -------------------
export async function createArtikel(data: any) {
    const { error } = await supabase.from('Artikel').insert(data);
    if (error) return response(false, error.message);
    revalidatePath('/admin/artikel');
    revalidatePath('/artikel');
    revalidatePath('/');
    return response(true, 'Artikel berhasil dibuat');
}
export async function updateArtikel(id: string, data: any) {
    const { error } = await supabase.from('Artikel').update(data).eq('id', id);
    if (error) return response(false, error.message);
    revalidatePath('/admin/artikel');
    revalidatePath('/artikel');
    revalidatePath('/');
    return response(true, 'Artikel berhasil diubah');
}
export async function deleteArtikel(id: string) {
    const { error } = await supabase.from('Artikel').delete().eq('id', id);
    if (error) return response(false, error.message);
    revalidatePath('/admin/artikel');
    revalidatePath('/artikel');
    revalidatePath('/');
    return response(true, 'Artikel berhasil dihapus');
}

// ------------------- PROKER -------------------
export async function createProker(data: any) {
    const { error } = await supabase.from('ProgramKerja').insert(data);
    if (error) return response(false, error.message);
    revalidatePath('/admin/proker');
    revalidatePath('/program');
    revalidatePath('/');
    return response(true, 'Proker berhasil dibuat');
}
export async function updateProker(id: string, data: any) {
    const { error } = await supabase.from('ProgramKerja').update(data).eq('id', id);
    if (error) return response(false, error.message);
    revalidatePath('/admin/proker');
    revalidatePath('/program');
    revalidatePath('/');
    return response(true, 'Proker berhasil diubah');
}
export async function deleteProker(id: string) {
    const { error } = await supabase.from('ProgramKerja').delete().eq('id', id);
    if (error) return response(false, error.message);
    revalidatePath('/admin/proker');
    revalidatePath('/program');
    revalidatePath('/');
    return response(true, 'Proker berhasil dihapus');
}

// ------------------- GALERI -------------------
export async function createGaleri(data: any) {
    const { error } = await supabase.from('Galeri').insert(data);
    if (error) return response(false, error.message);
    revalidatePath('/admin/galeri');
    revalidatePath('/galeri');
    return response(true, 'Foto galeri berhasil ditambahkan');
}
export async function deleteGaleri(id: string) {
    const { error } = await supabase.from('Galeri').delete().eq('id', id);
    if (error) return response(false, error.message);
    revalidatePath('/admin/galeri');
    revalidatePath('/galeri');
    return response(true, 'Foto galeri berhasil dihapus');
}
