'use server';

import { supabase } from './supabase';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { ArtikelSchema, BidangSchema, KabinetSchema, PengurusSchema, ProkerSchema, ProgramUnggulanSchema } from './validations';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

// Cek apakah user sudah login sebagai admin
async function checkAdmin() {
    try {
        const session = await auth();
        if (!session?.user) return false;
        return (session.user as any).username === 'admin';
    } catch {
        return false;
    }
}

const USER_BIDANG_MAP: Record<string, string> = {
    'kesek': 'lembaga-kesekretariatan',
    'keuangan': 'lembaga-keuangan',
    'akademik': 'bidang-akademik',
    'ekbis': 'bidang-ekonomi-dan-bisnis',
    'kaderisasi': 'bidang-kaderisasi',
    'kerohanian': 'bidang-kerohanian',
    'kominfo': 'bidang-komunikasi-dan-media-informasi',
    'litbang': 'bidang-penelitian-dan-pengembangan',
    'mikat': 'bidang-pengembangan-minat-dan-bakat',
    'sospol': 'bidang-sosial-dan-politik',
};

async function checkBidangAccess(targetSlug: string) {
    try {
        const session = await auth();
        if (!session?.user) return false;
        const username = (session.user as any).username;
        if (username === 'admin') return true;
        return USER_BIDANG_MAP[username] === targetSlug;
    } catch {
        return false;
    }
}

// Reusable function to standardized error/success responses
function response(success: boolean, message: string, data?: any) {
    return { success, message, data };
}

// ------------------- PENGUBAHAN PASSWORD -------------------
export async function changePassword(data: any) {
    try {
        const session = await auth();
        if (!session?.user) return response(false, 'Anda harus login untuk mengubah password.');

        const userId = session.user.id;
        const { oldPassword, newPassword } = data;

        if (!oldPassword || !newPassword) return response(false, 'Mohon isi password lama dan password baru.');
        if (newPassword.length < 6) return response(false, 'Password baru harus minimal 6 karakter.');

        // 1. Ambil data user dari database (termasuk password lama yg di-hash)
        const { data: userData, error: fetchError } = await supabase
            .from('User')
            .select('password')
            .eq('id', userId)
            .single();

        if (fetchError || !userData) return response(false, 'Pengguna tidak ditemukan di database.');

        // 2. Verifikasi apakah password lama cocok
        const isMatch = await bcrypt.compare(oldPassword, userData.password);
        if (!isMatch) {
            // Cek kondisi fallback hardcode khusus admin jika bcrypt fail (mirip di authorize)
            const isAdminFallback = (session.user as any)?.username === 'admin' && oldPassword === 'password123';
            if (!isAdminFallback) {
                return response(false, 'Password lama yang Anda masukkan salah.');
            }
        }

        // 3. Hash password baru
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // 4. Update data pengguna
        const { error: updateError } = await supabase
            .from('User')
            .update({ password: hashedNewPassword })
            .eq('id', userId);

        if (updateError) return response(false, 'Gagal menyimpan password baru: ' + updateError.message);

        return response(true, 'Password berhasil diubah. Silakan gunakan password baru pada login berikutnya.');
    } catch (e: any) {
        return response(false, 'Terjadi kesalahan sistem: ' + e.message);
    }
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
    if (!(await checkBidangAccess(data.bidang))) return response(false, 'Akses Ditolak: Anda bukan pengurus bidang ini.');
    const { error } = await supabase.from('ProgramKerja').insert(data);
    if (error) return response(false, error.message);
    revalidatePath('/admin/proker');
    revalidatePath('/program-kerja');
    revalidatePath('/');
    return response(true, 'Proker berhasil dibuat');
}
export async function updateProker(id: string, data: any) {
    if (!(await checkBidangAccess(data.bidang))) return response(false, 'Akses Ditolak: Anda bukan pengurus bidang ini.');
    const { error } = await supabase.from('ProgramKerja').update(data).eq('id', id);
    if (error) return response(false, error.message);
    revalidatePath('/admin/proker');
    revalidatePath('/program-kerja');
    revalidatePath('/');
    return response(true, 'Proker berhasil diubah');
}
export async function deleteProker(id: string) {
    const { data: curr } = await supabase.from('ProgramKerja').select('bidang').eq('id', id).single();
    if (!curr || !(await checkBidangAccess(curr.bidang))) return response(false, 'Akses ditolak.');

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
    if (!(await checkBidangAccess(slug))) return response(false, 'Akses Ditolak: Anda tidak dapat mengedit profil bidang lain.');
    const { error } = await supabase.from('BidangLembaga').update(data).eq('slug', slug);
    if (error) return response(false, error.message);
    revalidatePath('/admin/bidang');
    revalidatePath(`/admin/bidang/${slug}`);
    revalidatePath('/program-kerja');
    revalidatePath(`/program-kerja/${slug}`);
    return response(true, 'Profil Bidang/Lembaga berhasil diperbarui');
}

// ------------------- SHORTLINK -------------------
export async function createShortLink(data: any) {
    const session = await auth();
    if (!session?.user) return response(false, 'Sesi ditolak. Silahkan Login.');

    const userId = session.user.id;

    // Cek kuota statis dari DB User
    const { data: userData } = await supabase.from('User').select('shortlink_quota').eq('id', userId).single();
    const quota = userData?.shortlink_quota ?? 5; // Fallback ke 5 jika tidak ditemukan

    const { count } = await supabase.from('ShortLink')
        .select('*', { count: 'exact', head: true })
        .eq('userId', userId);

    if (count !== null && count >= quota) {
        return response(false, `Batas Kuota Tercapai! Akun Anda hanya dapat membuat maksimal ${quota} Tautan Pendek/LASER.`);
    }

    // Set Owner ID
    data.userId = userId;

    const { error } = await supabase.from('ShortLink').insert(data);
    if (error) {
        if (error.code === '23505') return response(false, 'Tautan pendek (slug) ini sudah digunakan. Silakan pilih yang lain.');
        return response(false, error.message);
    }

    revalidatePath('/admin/shortlink');
    revalidatePath('/link-shortener');
    revalidatePath('/laser');
    return response(true, 'Shortlink berhasil dibuat');
}

export async function updateShortLink(id: string, data: any) {
    const session = await auth();
    if (!session?.user) return response(false, 'Sesi ditolak. Silahkan Login.');

    // Validasi kepemilikan
    const { data: curr } = await supabase.from('ShortLink').select('userId').eq('id', id).single();
    if (curr?.userId !== session.user.id && session.user.name !== 'Administrator') {
        return response(false, 'Anda tidak memiliki akses untuk mengubah tautan ini.');
    }

    const { error } = await supabase.from('ShortLink').update(data).eq('id', id);
    if (error) {
        if (error.code === '23505') return response(false, 'Tautan pendek (slug) ini sudah digunakan.');
        return response(false, error.message);
    }

    revalidatePath('/admin/shortlink');
    revalidatePath('/link-shortener');
    return response(true, 'Shortlink berhasil diubah');
}

export async function deleteShortLink(id: string) {
    if (!(await checkAdmin())) return response(false, 'Sesi admin tertolak oleh Server. Silahkan Logout dan Login kembali.');
    const { error } = await supabase.from('ShortLink').delete().eq('id', id);
    if (error) return response(false, error.message);
    revalidatePath('/admin/shortlink');
    revalidatePath('/link-shortener');
    return response(true, 'Shortlink berhasil dihapus');
}

// Fungsi Increment Klik berjalan publik (tanpa checkAdmin), dipanggil dari Route Handler / Middleware
export async function incrementShortLinkClick(id: string) {
    const { error } = await supabase.rpc('increment_shortlink_click', { p_id: id });
    if (error) {
        // Jika RPC belum ada, fallback pakai cara standar (bisa race condition)
        const { data: curr } = await supabase.from('ShortLink').select('jumlah_klik').eq('id', id).single();
        if (curr) {
            await supabase.from('ShortLink').update({ jumlah_klik: curr.jumlah_klik + 1 }).eq('id', id);
        }
    }
    return true;
}

// ------------------- USER QUOTA (Admin Only) -------------------
export async function updateUserQuota(userId: string, newQuota: number) {
    if (!(await checkAdmin())) return response(false, 'Hanya Admin Utama yang dapat mengubah kuota Akun Bidang.');

    // Minimal kuota 0 (tidak boleh negatif)
    if (newQuota < 0) return response(false, 'Kuota tidak valid.');

    const { error } = await supabase.from('User').update({ shortlink_quota: newQuota }).eq('id', userId);

    if (error) return response(false, error.message);

    revalidatePath('/admin/laser-quota');
    return response(true, 'Kuota LASER berhasil diperbarui.');
}

export async function upsertProfil(data: any) {
    if (!(await checkAdmin())) return response(false, 'Hanya Admin Utama yang dapat merubah Profil Himpunan.');

    const { data: existing } = await supabase
        .from('Profil')
        .select('id')
        .eq('isAktif', true)
        .limit(1)
        .single();

    let error;
    if (existing) {
        const { error: errUpdate } = await supabase
            .from('Profil')
            .update(data)
            .eq('id', existing.id);
        error = errUpdate;
    } else {
        const { error: errInsert } = await supabase
            .from('Profil')
            .insert([{ ...data, isAktif: true }]);
        error = errInsert;
    }

    if (error) return response(false, error.message);

    revalidatePath('/admin/profil');
    revalidatePath('/profil');
    return response(true, 'Data profil berhasil diganti');
}
