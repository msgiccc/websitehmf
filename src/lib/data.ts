/**
 * Data fetching functions untuk PUBLIC pages.
 * File ini TIDAK mengimport auth — aman digunakan di server components manapun.
 */
import { supabase } from './supabase';

export async function getKabinetAktif() {
    try {
        const { data, error } = await supabase
            .from('Kabinet')
            .select('*')
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
            .eq('bidang', bidang)
            .order('tanggalPelaksanaan', { ascending: true });
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
