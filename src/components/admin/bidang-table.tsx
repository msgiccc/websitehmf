'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Eye } from 'lucide-react';
import Link from 'next/link';
import BidangForm from '@/components/admin/bidang-form';

export default function BidangTable({ initialData }: { initialData: any[] }) {
    const [data, setData] = useState(initialData);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // Sync state if initialData changes after server revalidation
    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const handleEdit = (item: any) => {
        const formattedItem = JSON.parse(JSON.stringify(item));
        setSelectedItem(formattedItem);
        setIsFormOpen(true);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Daftar Bidang & Lembaga</h2>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Bidang/Lembaga</TableHead>
                            <TableHead className="hidden md:table-cell">Deskripsi</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                                    Belum ada data Bidang/Lembaga.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item) => (
                                <TableRow key={item.slug}>
                                    <TableCell className="font-medium">
                                        {item.name}
                                        <div className="text-xs text-muted-foreground md:hidden mt-1 line-clamp-1">{item.desc}</div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell max-w-xs truncate" title={item.desc}>
                                        {item.desc}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(item)} title="Edit Profil Bidang">
                                            <Edit className="h-4 w-4 md:mr-2" />
                                            <span className="hidden md:inline">Edit</span>
                                        </Button>
                                        <Link href={`/admin/bidang/${item.slug}`}>
                                            <Button variant="default" size="sm" className="bg-[#2c1469] hover:bg-[#1a0c3f]" title="Kelola Proker">
                                                <Eye className="h-4 w-4 md:mr-2" />
                                                <span className="hidden md:inline">Lihat Proker</span>
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {isFormOpen && (
                <BidangForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} initialData={selectedItem} />
            )}
        </div>
    );
}
