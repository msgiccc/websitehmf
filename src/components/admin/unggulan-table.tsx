'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteProgramUnggulan } from '@/lib/admin-actions';
import { toast } from 'sonner';
import UnggulanForm from './unggulan-form';

export default function UnggulanTable({ initialData, kabinetId }: { initialData: any[]; kabinetId: string }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const handleAdd = () => {
        setSelectedItem(null);
        setIsFormOpen(true);
    };

    const handleEdit = (item: any) => {
        setSelectedItem(item);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Yakin ingin menghapus program unggulan ini?')) {
            try {
                const res = await deleteProgramUnggulan(id);
                if (res.success) toast.success(res.message);
                else toast.error(res.message);
            } catch (e: any) {
                toast.error('Gagal menghapus program', { description: e.message });
            }
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">Top Program Kerja</h3>
                    <p className="text-sm text-muted-foreground">Satu program kerja maskot yang mewakili Kabinet ini.</p>
                </div>
                {initialData.length === 0 && (
                    <Button onClick={handleAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Baru
                    </Button>
                )}
            </div>

            <div className="border rounded-md">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium border-b">
                        <tr>
                            <th className="p-4">Nama Program</th>
                            <th className="p-4">Deskripsi</th>
                            <th className="p-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {initialData.length > 0 ? (
                            initialData.map((item) => (
                                <tr key={item.id} className="hover:bg-muted/50">
                                    <td className="p-4 font-medium">{item.nama}</td>
                                    <td className="p-4 text-xs text-muted-foreground max-w-sm truncate" title={item.deskripsi}>{item.deskripsi}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="p-8 text-center text-muted-foreground">Belum ada Program Unggulan terkait Kabinet aktif.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isFormOpen && (
                <UnggulanForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} initialData={selectedItem} kabinetId={kabinetId} />
            )}
        </div>
    );
}
