'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { createBearrLink, updateBearrLink, deleteBearrLink } from '@/lib/admin-bearr-actions';
import type { BearrLink } from '@/lib/data';
import { ExternalLink, Pencil, Trash2, Plus, Eye, EyeOff } from 'lucide-react';

interface BearrFormProps {
    initialData?: BearrLink;
    onSuccess: () => void;
    onCancel: () => void;
}

export function BearrForm({ initialData, onSuccess, onCancel }: BearrFormProps) {
    const isEdit = !!initialData;
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        try {
            if (isEdit) {
                const res = await updateBearrLink(initialData.id, formData);
                if (res?.error) toast.error("Gagal Update: " + res.error);
                else { toast.success("Link BEARR diperbarui!"); onSuccess(); }
            } else {
                const res = await createBearrLink(formData);
                if (res?.error) toast.error("Gagal Simpan: " + res.error);
                else { toast.success("Link BEARR baru ditambahkan!"); onSuccess(); }
            }
        } catch { toast.error("Terjadi kesalahan sistem."); }
        finally { setIsLoading(false); }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50/50 p-5 rounded-xl border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3">{isEdit ? 'Edit Link BEARR' : 'Tambah Link Baru'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-gray-500">Kategori *</label>
                    <Select name="kategori" defaultValue={initialData?.kategori || 'bank_soal'} required>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bank_soal">Bank Soal</SelectItem>
                            <SelectItem value="referensi">Referensi Belajar</SelectItem>
                            <SelectItem value="ebook">E-Book</SelectItem>
                            <SelectItem value="aplikasi">Aplikasi</SelectItem>
                            <SelectItem value="responsi">Responsi</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-gray-500">Tipe URL *</label>
                    <Select name="tipe_url" defaultValue={initialData?.tipe_url || 'drive'} required>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="drive">Google Drive</SelectItem>
                            <SelectItem value="form">Formulir Google</SelectItem>
                            <SelectItem value="list">Dokumen / Daftar</SelectItem>
                            <SelectItem value="wa">WhatsApp</SelectItem>
                            <SelectItem value="lainnya">Lainnya</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1 col-span-2">
                    <label className="text-xs font-semibold uppercase text-gray-500">Judul *</label>
                    <Input name="judul" required defaultValue={initialData?.judul} placeholder="Contoh: Bank Soal Fisika Dasar 1" />
                </div>
                <div className="space-y-1 col-span-2">
                    <label className="text-xs font-semibold uppercase text-gray-500">URL / Tautan *</label>
                    <Input name="url" required defaultValue={initialData?.url} placeholder="https://drive.google.com/..." />
                </div>
                <div className="space-y-1 col-span-2">
                    <label className="text-xs font-semibold uppercase text-gray-500">Deskripsi (Opsional)</label>
                    <Input name="deskripsi" defaultValue={initialData?.deskripsi || ''} placeholder="Deskripsi singkat tentang tautan ini..." />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-gray-500">Urutan Tampil</label>
                    <Input type="number" min="0" name="urutan" defaultValue={initialData?.urutan ?? 0} />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-gray-500">Status Aktif</label>
                    <Select name="is_active" defaultValue={initialData?.is_active !== false ? 'true' : 'false'}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="true">Aktif (Tampil di Publik)</SelectItem>
                            <SelectItem value="false">Nonaktif (Tersembunyi)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onCancel}>Batal</Button>
                <Button type="submit" disabled={isLoading}>{isLoading ? 'Menyimpan...' : 'Simpan'}</Button>
            </div>
        </form>
    );
}

const KATEGORI_LABEL: Record<string, string> = {
    bank_soal: 'Bank Soal', referensi: 'Referensi', ebook: 'E-Book', aplikasi: 'Aplikasi', responsi: 'Responsi'
};
const KATEGORI_COLORS: Record<string, string> = {
    bank_soal: 'bg-blue-100 text-blue-700',
    referensi: 'bg-emerald-100 text-emerald-700',
    ebook: 'bg-amber-100 text-amber-700',
    aplikasi: 'bg-purple-100 text-purple-700',
    responsi: 'bg-rose-100 text-rose-700',
};

export function BearrTable({ links }: { links: BearrLink[] }) {
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleDelete = async (id: string, judul: string) => {
        if (confirm(`Yakin hapus link "${judul}"?`)) {
            const res = await deleteBearrLink(id);
            if (res?.error) toast.error("Gagal Hapus: " + res.error);
            else toast.success("Link dihapus.");
        }
    };

    return (
        <div className="space-y-4">
            {editingId === 'new' && (
                <BearrForm onSuccess={() => setEditingId(null)} onCancel={() => setEditingId(null)} />
            )}

            {!editingId && (
                <div className="flex justify-between items-center bg-amber-50/50 p-4 border border-amber-100 rounded-lg">
                    <p className="text-sm text-amber-800 font-medium">Kelola semua link yang tampil di halaman publik BEARR.</p>
                    <Button onClick={() => setEditingId('new')} className="bg-[#0B1F3A] hover:bg-blue-900">
                        <Plus className="w-4 h-4 mr-1" /> Tambah Link
                    </Button>
                </div>
            )}

            <div className="border rounded-lg overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">Kategori</th>
                            <th className="px-4 py-3">Judul</th>
                            <th className="px-4 py-3">Tipe URL</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Urutan</th>
                            <th className="px-4 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {links.map((link) => (
                            <tr key={link.id} className="hover:bg-gray-50">
                                {editingId === link.id ? (
                                    <td colSpan={6} className="p-0">
                                        <BearrForm
                                            initialData={link}
                                            onSuccess={() => setEditingId(null)}
                                            onCancel={() => setEditingId(null)}
                                        />
                                    </td>
                                ) : (
                                    <>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs px-2 py-1 rounded font-bold ${KATEGORI_COLORS[link.kategori] || 'bg-gray-100 text-gray-700'}`}>
                                                {KATEGORI_LABEL[link.kategori] || link.kategori}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-medium max-w-xs">
                                            <p className="truncate">{link.judul}</p>
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5">
                                                <ExternalLink className="w-2.5 h-2.5" /> {link.url.substring(0, 40)}...
                                            </a>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 uppercase text-xs font-mono">{link.tipe_url}</td>
                                        <td className="px-4 py-3">
                                            {link.is_active
                                                ? <span className="flex items-center gap-1 text-xs text-emerald-600 font-bold"><Eye className="w-3.5 h-3.5" /> Aktif</span>
                                                : <span className="flex items-center gap-1 text-xs text-gray-400 font-bold"><EyeOff className="w-3.5 h-3.5" /> Nonaktif</span>
                                            }
                                        </td>
                                        <td className="px-4 py-3 text-center text-gray-500">{link.urutan}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline" onClick={() => setEditingId(link.id)}>
                                                    <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleDelete(link.id, link.judul)}>
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                        {links.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">Belum ada link BEARR. Klik tombol Tambah Link.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
