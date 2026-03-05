'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { createMatkul, updateMatkul, deleteMatkul } from '@/lib/admin-kurikulum-actions';

interface MatkulFormProps {
    initialData?: any; // Boleh null jika tambah
    onSuccess: () => void;
    onCancel: () => void;
}

export function MatkulForm({ initialData, onSuccess, onCancel }: MatkulFormProps) {
    const isEdit = !!initialData;
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            if (isEdit) {
                const res = await updateMatkul(initialData.id, formData);
                if (res?.error) toast.error("Gagal Update: " + res.error);
                else {
                    toast.success("Mata Kuliah berhasil diupdate!");
                    onSuccess();
                }
            } else {
                const res = await createMatkul(formData);
                if (res?.error) toast.error("Gagal Simpan: " + res.error);
                else {
                    toast.success("Mata Kuliah baru ditambahkan!");
                    onSuccess();
                }
            }
        } catch (error) {
            toast.error("Terjadi kesalahan sistem.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50/50 p-5 rounded-xl border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3">{isEdit ? 'Edit Mata Kuliah' : 'Tambah Baru'}</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-gray-500">Kode</label>
                    <Input name="kode" required defaultValue={initialData?.kode} placeholder="Contoh: FI111" />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-gray-500">Program Studi</label>
                    <Select name="prodi" defaultValue={initialData?.prodi || 'Umum'} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Prodi..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Umum">Umum (Fisika & Pend.Fisika)</SelectItem>
                            <SelectItem value="Fisika">Fisika Murni</SelectItem>
                            <SelectItem value="PendFisika">Pendidikan Fisika</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1 col-span-2">
                    <label className="text-xs font-semibold uppercase text-gray-500">Nama Mata Kuliah</label>
                    <Input name="nama" required defaultValue={initialData?.nama} placeholder="Contoh: Fisika Dasar 1" />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-gray-500">SKS</label>
                    <Input type="number" min="1" max="10" name="sks" required defaultValue={initialData?.sks || 2} />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-gray-500">Semester</label>
                    <Input type="number" min="1" max="8" name="semester_rekomendasi" required defaultValue={initialData?.semester_rekomendasi || 1} />
                </div>
                <div className="space-y-1 col-span-2">
                    <label className="text-xs font-semibold uppercase text-gray-500">Kategori (Opsional)</label>
                    <Input name="kategori" defaultValue={initialData?.kategori} placeholder="Contoh: Wajib, MKU, dll..." />
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onCancel}>Batal</Button>
                <Button type="submit" disabled={isLoading}>{isLoading ? 'Menyimpan...' : 'Simpan'}</Button>
            </div>
        </form>
    );
}

// -------------------------------------------------------------

export function MatkulTable({ matkuls }: { matkuls: any[] }) {
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Yakin hapus matkul ${name}?`)) {
            const res = await deleteMatkul(id);
            if (res?.error) toast.error("Gagal Hapus: " + res.error);
            else toast.success("Mata kuliah dihapus.");
        }
    }

    return (
        <div className="space-y-4">
            {editingId === 'new' && (
                <MatkulForm
                    onSuccess={() => setEditingId(null)}
                    onCancel={() => setEditingId(null)}
                />
            )}

            {!editingId && (
                <div className="flex justify-between items-center bg-blue-50/50 p-4 border border-blue-100 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">Data Mata Kuliah adalah sumber dari KINETIK Calc. Jangan asal hapus.</p>
                    <Button onClick={() => setEditingId('new')} className="bg-blue-600 hover:bg-blue-700">+ Tambah Matkul</Button>
                </div>
            )}

            <div className="border rounded-lg overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">Kode</th>
                            <th className="px-4 py-3">Mata Kuliah</th>
                            <th className="px-4 py-3">SKS</th>
                            <th className="px-4 py-3">Semester</th>
                            <th className="px-4 py-3">Prodi</th>
                            <th className="px-4 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {matkuls.map((m: any) => (
                            <tr key={m.id} className="hover:bg-gray-50">
                                {editingId === m.id ? (
                                    <td colSpan={6} className="p-0">
                                        <MatkulForm
                                            initialData={m}
                                            onSuccess={() => setEditingId(null)}
                                            onCancel={() => setEditingId(null)}
                                        />
                                    </td>
                                ) : (
                                    <>
                                        <td className="px-4 py-3 font-mono text-gray-500">{m.kode}</td>
                                        <td className="px-4 py-3 font-medium">{m.nama} <br /><span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase">{m.kategori || 'Matkul'}</span></td>
                                        <td className="px-4 py-3">{m.sks} SKS</td>
                                        <td className="px-4 py-3 text-center">{m.semester_rekomendasi}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs px-2 py-1 rounded font-bold ${m.prodi === 'Umum' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                                                {m.prodi}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline" onClick={() => setEditingId(m.id)}>Edit</Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleDelete(m.id, m.nama)}>Hapus</Button>
                                            </div>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                        {matkuls.length === 0 && (
                            <tr><td colSpan={6} className="p-8 text-center text-gray-500">Belum ada data mata kuliah.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
