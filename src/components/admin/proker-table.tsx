'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Plus } from 'lucide-react';
import ProkerForm from '@/components/admin/proker-form';
import { deleteProker } from '@/lib/admin-actions';
import { toast } from 'sonner';

export default function ProkerTable({ initialData }: { initialData: any[] }) {
    const [data, setData] = useState(initialData);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // Sync state if initialData changes after server revalidation
    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const handleEdit = (item: any) => {
        const formattedItem = {
            ...item
        };
        setSelectedItem(formattedItem);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setSelectedItem(null);
        setIsFormOpen(true);
    };

    const handleDelete = async (itemId: string) => {
        if (!confirm('Yakin ingin menghapus Proker ini?')) return;
        const res = await deleteProker(itemId);
        if (res.success) {
            toast.success(res.message);
            setData((prev) => prev.filter((item) => item.id !== itemId));
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Data Program Kerja</h2>
                <Button onClick={handleAdd} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Rencana Baru
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Program</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                                    Belum ada Proker.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.nama}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${item.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                                item.status === 'ONGOING' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {item.status}
                                        </span>
                                    </TableCell>
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
                <ProkerForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} initialData={selectedItem} />
            )}
        </div>
    );
}
