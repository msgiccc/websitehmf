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

// ==========================================
// BEARR LINKS (BANK SOAL, EBOOK, DSB)
// ==========================================
export type BearrKategori = 'bank_soal' | 'ebook' | 'aplikasi' | 'responsi' | 'referensi';
export type BearrTipeUrl = 'drive' | 'form' | 'list' | 'wa' | 'lainnya';

export interface BearrLink {
    id: string;
    kategori: BearrKategori;
    judul: string;
    deskripsi: string | null;
    url: string;
    tipe_url: BearrTipeUrl;
    is_active: boolean;
    urutan: number;
    created_at: string;
    updated_at: string;
}

export async function getAllBearrLinks(onlyActive = true): Promise<BearrLink[]> {
    try {
        let query = supabase
            .from('BearrLink')
            .select('*')
            .order('urutan', { ascending: true })
            .order('created_at', { ascending: true });

        if (onlyActive) {
            query = query.eq('is_active', true);
        }

        const { data, error } = await query;
        if (error) {
            console.error("Gagal menarik data BEARR:", error.message);
            return [];
        }
        return (data || []) as BearrLink[];
    } catch (err: any) {
        console.error("CATCH: Gagal menarik data BEARR:", err.message);
        return [];
    }
}

// ==========================================
// ORBIT - Marketplace Barang Bekas Mahasiswa
// ==========================================
export type OrbitKategori = 'buku' | 'jas_lab' | 'alat_ukur' | 'alat_tulis' | 'elektronik' | 'lainnya';
export type OrbitKondisi = 'baru' | 'baik' | 'cukup' | 'butuh_perbaikan';

export interface OrbitItem {
    id: string;
    judul: string;
    deskripsi: string | null;
    harga: number;               // 0 = gratis/hibah
    kondisi: OrbitKondisi;
    kategori: OrbitKategori;
    foto_url: string | null;
    penjual_nama: string;
    penjual_instagram: string;   // username IG tanpa @
    is_terjual: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export async function getOrbitItems(onlyActive = true): Promise<OrbitItem[]> {
    try {
        let query = supabase
            .from('OrbitItem')
            .select('*')
            .order('created_at', { ascending: false });

        if (onlyActive) {
            query = query.eq('is_active', true);
        }

        const { data, error } = await query;
        if (error) {
            console.error("Gagal menarik data ORBIT:", error.message);
            return [];
        }
        return (data || []) as OrbitItem[];
    } catch (err: any) {
        console.error("CATCH: Gagal menarik data ORBIT:", err.message);
        return [];
    }
}

// ==========================================
// FLUKS - Etalase Digital Danusan Ekobis
// ==========================================
export type FluksKategori = 'buku' | 'makanan' | 'aplikasi' | 'merchandise' | 'layanan' | 'lainnya';
export type FluksTipeLInk = 'instagram' | 'whatsapp' | 'lainnya';
export type FluksStok = 'tersedia' | 'terbatas' | 'habis';

export interface FluksItem {
    id: string;
    nama: string;
    deskripsi: string | null;
    harga: number;
    kategori: FluksKategori;
    foto_url: string | null;
    link_order: string | null;
    tipe_link: FluksTipeLInk;
    stok: FluksStok;
    badge: string | null;
    is_active: boolean;
    urutan: number;
    created_at: string;
    updated_at: string;
}

export interface FluksConfig {
    id: string;
    form_order_url: string;
    catatan: string | null;
    updated_at: string;
}

export async function getFluksItems(onlyActive = true): Promise<FluksItem[]> {
    try {
        let query = supabase
            .from('FluksItem')
            .select('*')
            .order('urutan', { ascending: true })
            .order('created_at', { ascending: false });

        if (onlyActive) {
            query = query.eq('is_active', true);
        }

        const { data, error } = await query;
        if (error) {
            console.error("Gagal menarik data FLUKS:", error.message);
            return [];
        }
        return (data || []) as FluksItem[];
    } catch (err: any) {
        console.error("CATCH: Gagal menarik data FLUKS:", err.message);
        return [];
    }
}

export async function getFluksConfig(): Promise<FluksConfig | null> {
    try {
        const { data, error } = await supabase
            .from('FluksConfig')
            .select('*')
            .limit(1)
            .single();
        if (error) return null;
        return data as FluksConfig;
    } catch {
        return null;
    }
}
