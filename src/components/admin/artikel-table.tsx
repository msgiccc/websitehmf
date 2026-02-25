'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Plus } from 'lucide-react';
import ArtikelForm from '@/components/admin/artikel-form';
import { deleteArtikel } from '@/lib/admin-actions';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function ArtikelTable({ initialData }: { initialData: any[] }) {
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

    const handleDelete = async (itemId: string) => {
        if (!confirm('Yakin ingin menghapus artikel ini?')) return;
        const res = await deleteArtikel(itemId);
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
                <h2 className="text-xl font-bold">Kelola Artikel</h2>
                <Button onClick={handleAdd} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Tulis Artikel Baru
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Judul</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Tanggal Dibuat</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                    Belum ada artikel.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium max-w-[250px] truncate">{item.judul}</TableCell>
                                    <TableCell>{item.author}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {item.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(item.createdAt), 'dd MMM yyyy', { locale: id })}
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
                <ArtikelForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} initialData={selectedItem} />
            )}
        </div>
    );
}
