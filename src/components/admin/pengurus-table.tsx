'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Plus } from 'lucide-react';
import PengurusForm from '@/components/admin/pengurus-form';
import { deletePengurus } from '@/lib/admin-actions';
import { toast } from 'sonner';

export default function PengurusTable({ initialData }: { initialData: any[] }) {
    const [data, setData] = useState(initialData);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const handleEdit = (item: any) => {
        setSelectedItem(item);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setSelectedItem(null);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Yakin ingin menghapus pengurus ini?')) return;
        const res = await deletePengurus(id);
        if (res.success) {
            toast.success(res.message);
            // Optimistic update
            setData((prev) => prev.filter((item) => item.id !== id));
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Data Pengurus</h2>
                <Button onClick={handleAdd} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Tambah Pengurus
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>NPM</TableHead>
                            <TableHead>Jabatan</TableHead>
                            <TableHead>Divisi</TableHead>
                            <TableHead>Angkatan</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                                    Belum ada data pengurus.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.nama}</TableCell>
                                    <TableCell>{item.npm}</TableCell>
                                    <TableCell>{item.jabatan}</TableCell>
                                    <TableCell>{item.divisi}</TableCell>
                                    <TableCell>{item.angkatan}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="icon" onClick={() => handleEdit(item)}>
                                            <Edit className="h-4 w-4 text-primary" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(item.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {isFormOpen && (
                <PengurusForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} initialData={selectedItem} />
            )}
        </div>
    );
}
