'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import GaleriForm from '@/components/admin/galeri-form';
import { deleteGaleri } from '@/lib/admin-actions';
import { toast } from 'sonner';

export default function GaleriGrid({ initialData }: { initialData: any[] }) {
    const [data, setData] = useState(initialData);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleDelete = async (itemId: string) => {
        if (!confirm('Hapus gambar ini dari galeri?')) return;
        const res = await deleteGaleri(itemId);
        if (res.success) {
            toast.success(res.message);
            setData((prev) => prev.filter((item) => item.id !== itemId));
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Galeri HMF</h2>
                <Button onClick={() => setIsFormOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Unggah Gambar Baru
                </Button>
            </div>

            {data.length === 0 ? (
                <div className="rounded-md border bg-card text-center py-10 text-muted-foreground">
                    Belum ada dokumentasi di galeri.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.map((item) => (
                        <Card key={item.id} className="overflow-hidden group">
                            <div className="aspect-video w-full overflow-hidden bg-muted relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.imageUrl}
                                    alt={item.judul}
                                    className="w-full h-full object-cover transition-all group-hover:scale-105"
                                />
                            </div>
                            <CardHeader className="p-4 flex flex-row items-center justify-between pb-2">
                                <div className="font-medium truncate pr-2">{item.judul}</div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDelete(item.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium 
                      ${item.kategori === 'PRESTASI' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                                    {item.kategori}
                                </span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {isFormOpen && <GaleriForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} />}
        </div>
    );
}
