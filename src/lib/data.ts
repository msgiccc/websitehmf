/**
 * Data fetching functions untuk PUBLIC pages.
 * File ini TIDAK mengimport auth — aman digunakan di server components manapun.
 */
import { supabase } from './supabase';

export async function getKabinetAktif() {
    try {
        const { data, error } = await supabase
            .from('Kabinet')
            .select(`
                *,
                ProgramUnggulan(*)
            `)
            .eq('isAktif', true)
            .order('createdAt', { ascending: false })
            .limit(1)
            .single();
        if (error) return null;
        return data;
    } catch {
        return null;
    }
}

export async function getProkerByBidang(bidang: string) {
    try {
        const { data, error } = await supabase
            .from('ProgramKerja')
            .select('*')
            .eq('bidang', bidang);
        if (error) return [];
        return data || [];
    } catch {
        return [];
    }
}

export async function getPengurusByDivisi(divisi: string) {
    try {
        const { data, error } = await supabase
            .from('Pengurus')
            .select('*')
            .eq('divisi', divisi)
            .order('jabatan', { ascending: true });
        if (error) return [];
        return data || [];
    } catch {
        return [];
    }
}

export async function getAllPengurus() {
    try {
        const { data, error } = await supabase
            .from('Pengurus')
            .select('*')
            .order('angkatan', { ascending: true })
            .order('divisi', { ascending: false });
        if (error) return null;
        return data;
    } catch {
        return null;
    }
}

export async function getAllBidang() {
    try {
        const { data, error } = await supabase
            .from('BidangLembaga')
            .select('*')
            .order('name', { ascending: true });
        if (error) return [];
        return data || [];
    } catch {
        return [];
    }
}

export async function getBidangBySlug(slug: string) {
    try {
        const { data, error } = await supabase
            .from('BidangLembaga')
            .select('*')
            .eq('slug', slug)
            .single();
        if (error) return null;
        return data;
    } catch {
        return null;
    }
}

export async function getAllShortLinks() {
    try {
        const { data, error } = await supabase
            .from('ShortLink')
            .select('*')
            .order('createdAt', { ascending: false });
        if (error) return [];
        return data || [];
    } catch {
        return [];
    }
}

export async function getPublicShortLinks() {
    try {
        const { data, error } = await supabase
            .from('ShortLink')
            .select('*')
            .eq('isPublic', true)
            .order('createdAt', { ascending: false });
        if (error) return [];
        return data || [];
    } catch {
        return [];
    }
}

export async function getShortLinkBySlug(slug: string) {
    try {
        const { data, error } = await supabase
            .from('ShortLink')
            .select('*')
            .eq('slug', slug)
            .single();
        if (error) return null;
        return data;
    } catch {
        return null;
    }
}

export async function getShortLinksByUserId(userId: string) {
    try {
        const { data, error } = await supabase
            .from('ShortLink')
            .select('*')
            .eq('userId', userId)
            .order('createdAt', { ascending: false });
        if (error) return [];
        return data || [];
    } catch {
        return [];
    }
}

export async function getAllUsers() {
    try {
        const { data, error } = await supabase
            .from('User')
            .select('*')
            .order('name', { ascending: true });
        if (error) return [];
        return data || [];
    } catch {
        return [];
    }
}

export async function getProfilAktif() {
    try {
        const { data, error } = await supabase
            .from('Profil')
            .select('*')
            .eq('isAktif', true)
            .limit(1)
            .single();
        if (error) return null;
        return data;
    } catch {
        return null;
    }
}

// ==========================================
// MATA KULIAH KURIKULUM UPI (UNTUK KINETIK)
// ==========================================
export async function getAllMataKuliah() {
    try {
        const { data, error } = await supabase
            .from('MataKuliah')
            .select('*')
            .order('semester_rekomendasi', { ascending: true })
            .order('nama', { ascending: true });

        if (error) {
            console.error("Gagal menarik data matkul:", error.message);
            return [];
        }
        return data || [];
    } catch (err: any) {
        console.error("CATCH: Gagal menarik data matkul:", err.message);
        return [];
    }
}
