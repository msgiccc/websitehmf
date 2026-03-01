'use server';

import { supabase } from './supabase';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { ArtikelSchema, BidangSchema, KabinetSchema, PengurusSchema, ProkerSchema, ProgramUnggulanSchema } from './validations';
import { z } from 'zod';

// Cek apakah user sudah login sebagai admin
async function checkAdmin() {
    try {
        const session = await auth();
        if (!session?.user) {
            return false;
        }
        return true;
    } catch {
        return false;
    }
}

// Reusable function to standardized error/success responses
function response(success: boolean, message: string, data?: any) {
    return { success, message, data };
}

// ------------------- PENGURUS -------------------
export async function createPengurus(data: any) {
    if (!(await checkAdmin())) return response(false, 'Sesi admin tertolak oleh Server. Silahkan Logout dan Login kembali.');
    const { error } = await supabase.from('Pengurus').insert(data);
    if (error) return response(false, error.message);
    revalidatePath('/admin/pengurus');
    revalidatePath('/kabinet');
    return response(true, 'Pengurus berhasil ditambahkan');
}
export async function updatePengurus(id: string, data: any) {
    if (!(await checkAdmin())) return response(false, 'Sesi admin tertolak oleh Server. Silahkan Logout dan Login kembali.');
    const { error } = await supabase.from('Pengurus').update(data).eq('id', id);
    if (error) return response(false, error.message);
    revalidatePath('/admin/pengurus');
    revalidatePath('/kabinet');
    return response(true, 'Pengurus berhasil diubah');
}
export async function deletePengurus(id: string) {
    if (!(await checkAdmin())) return response(false, 'Sesi admin tertolak oleh Server. Silahkan Logout dan Login kembali.');
    const { error } = await supabase.from('Pengurus').delete().eq('id', id);
    if (error) return response(false, error.message);
    revalidatePath('/admin/pengurus');
    revalidatePath('/kabinet');
    return response(true, 'Pengurus berhasil dihapus');
}

// ------------------- ARTIKEL -------------------
export async function createArtikel(data: any) {
    if (!(await checkAdmin())) return response(false, 'Sesi admin tertolak oleh Server. Silahkan Logout dan Login kembali.');
    const { error } = await supabase.from('Artikel').insert(data);
    if (error) return response(false, error.message);
    revalidatePath('/admin/artikel');
    revalidatePath('/artikel');
    revalidatePath('/');
    return response(true, 'Artikel berhasil dibuat');
}
export async function updateArtikel(id: string, data: any) {
    if (!(await checkAdmin())) return response(false, 'Sesi admin tertolak oleh Server. Silahkan Logout dan Login kembali.');
    const { error } = await supabase.from('Artikel').update(data).eq('id', id);
    if (error) return response(false, error.message);
    revalidatePath('/admin/artikel');
    revalidatePath('/artikel');
    revalidatePath('/');
    return response(true, 'Artikel berhasil diubah');
}
export async function deleteArtikel(id: string) {
    if (!(await checkAdmin())) return response(false, 'Sesi admin tertolak oleh Server. Silahkan Logout dan Login kembali.');
    const { error } = await supabase.from('Artikel').delete().eq('id', id);
    if (error) return response(false, error.message);
    revalidatePath('/admin/artikel');
    revalidatePath('/artikel');
    revalidatePath('/');
    return response(true, 'Artikel berhasil dihapus');
}

// ------------------- PROKER -------------------
export async function createProker(data: any) {
    if (!(await checkAdmin())) return response(false, 'Sesi admin tertolak oleh Server. Silahkan Logout dan Login kembali.');
    const { error } = await supabase.from('ProgramKerja').insert(data);
    if (error) return response(false, error.message);
    revalidatePath('/admin/proker');
    revalidatePath('/program-kerja');
    revalidatePath('/');
    return response(true, 'Proker berhasil dibuat');
}
export async function updateProker(id: string, data: any) {
    if (!(await checkAdmin())) return response(false, 'Sesi admin tertolak oleh Server. Silahkan Logout dan Login kembali.');
    const { error } = await supabase.from('ProgramKerja').update(data).eq('id', id);
    if (error) return response(false, error.message);
    revalidatePath('/admin/proker');
    revalidatePath('/program-kerja');
    revalidatePath('/');
    return response(true, 'Proker berhasil diubah');
}
export async function deleteProker(id: string) {
    if (!(await checkAdmin())) return response(false, 'Sesi admin tertolak oleh Server. Silahkan Logout dan Login kembali.');
    const { error } = await supabase.from('ProgramKerja').delete().eq('id', id);
    if (error) return response(false, error.message);
    revalidatePath('/admin/proker');
    revalidatePath('/program-kerja');
    revalidatePath('/');
    return response(true, 'Proker berhasil dihapus');
}

// ------------------- GALERI -------------------
export async function createGaleri(data: any) {
    if (!(await checkAdmin())) return response(false, 'Sesi admin tertolak oleh Server. Silahkan Logout dan Login kembali.');
    const { error } = await supabase.from('Galeri').insert(data);
    if (error) return response(false, error.message);
    revalidatePath('/admin/galeri');
    revalidatePath('/galeri');
    return response(true, 'Foto galeri berhasil ditambahkan');
}
export async function deleteGaleri(id: string) {
    if (!(await checkAdmin())) return response(false, 'Sesi admin tertolak oleh Server. Silahkan Logout dan Login kembali.');
    const { error } = await supabase.from('Galeri').delete().eq('id', id);
    if (error) return response(false, error.message);
    revalidatePath('/admin/galeri');
    revalidatePath('/galeri');
    return response(true, 'Foto galeri berhasil dihapus');
}

// ------------------- KABINET -------------------
export async function getKabinetAktif() {
    const { data, error } = await supabase
        .from('Kabinet')
        .select('*')
        .eq('isAktif', true)
        .order('createdAt', { ascending: false })
        .limit(1)
        .single();
    if (error) return null;
    return data;
}

export async function upsertKabinet(data: any) {
    if (!(await checkAdmin())) return response(false, 'Sesi admin tertolak oleh Server. Silahkan Logout dan Login kembali.');

    // Cek apakah sudah ada kabinet aktif
    const existing = await getKabinetAktif();

    let error;
    if (existing?.id) {
        // Update kabinet yang sudah ada
        ({ error } = await supabase.from('Kabinet').update(data).eq('id', existing.id));
    } else {
        // Insert kabinet baru jika belum ada
        ({ error } = await supabase.from('Kabinet').insert({ ...data, isAktif: true }));
    }

    if (error) return response(false, error.message);
    revalidatePath('/admin/kabinet');
    revalidatePath('/');
    return response(true, 'Data kabinet berhasil disimpan');
}

// ============== PROGRAM UNGGULAN ==============
export const upsertProgramUnggulan = async (data: any) => {
    if (!(await checkAdmin())) return response(false, 'Akses ditolak.');
    try {
        const parsed = ProgramUnggulanSchema.parse(data);
        let error;
        if (parsed.id) {
            ({ error } = await supabase.from('ProgramUnggulan').update(parsed).eq('id', parsed.id));
        } else {
            ({ error } = await supabase.from('ProgramUnggulan').insert(parsed));
        }
        if (error) return response(false, error.message);
        revalidatePath('/admin/kabinet');
        revalidatePath('/kabinet');
        return response(true, 'Data unggulan disimpan.');
    } catch (err: any) {
        return response(false, err.message);
    }
};

export const deleteProgramUnggulan = async (id: string) => {
    if (!(await checkAdmin())) return response(false, 'Akses ditolak.');
    const { error } = await supabase.from('ProgramUnggulan').delete().eq('id', id);
    if (error) return response(false, error.message);
    revalidatePath('/admin/kabinet');
    revalidatePath('/kabinet');
    return response(true, 'Data unggulan dihapus.');
};

// ------------------- BIDANG & LEMBAGA -------------------
export async function updateBidang(slug: string, data: any) {
    if (!(await checkAdmin())) return response(false, 'Sesi admin tertolak oleh Server. Silahkan Logout dan Login kembali.');
    const { error } = await supabase.from('BidangLembaga').update(data).eq('slug', slug);
    if (error) return response(false, error.message);
    revalidatePath('/admin/bidang');
    revalidatePath(`/admin/bidang/${slug}`);
    revalidatePath('/program-kerja');
    revalidatePath(`/program-kerja/${slug}`);
    return response(true, 'Profil Bidang/Lembaga berhasil diperbarui');
}
