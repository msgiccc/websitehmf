'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { updateBidang } from '@/lib/admin-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function BidangForm({
    isOpen,
    setIsOpen,
    initialData,
}: {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    initialData: any;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        defaultValues: {
            name: initialData?.name || '',
            shortName: initialData?.shortName || '',
            desc: initialData?.desc || '',
            icon: initialData?.icon || '',
            color: initialData?.color || '',
        },
    });

    const onSubmit = async (values: any) => {
        setIsSubmitting(true);
        try {
            const result = await updateBidang(initialData.slug, values);

            if (result.success) {
                toast.success(result.message);
                setIsOpen(false);
            } else {
                toast.error(result.message);
            }
        } catch (e: any) {
            toast.error('Gagal memproses form', { description: e.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Informasi Bidang/Lembaga</DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Nama Lengkap</Label>
                        <Input {...form.register('name')} placeholder="Nama Lengkap" />
                    </div>

                    <div className="space-y-2">
                        <Label>Singkatan (Short Name)</Label>
                        <Input {...form.register('shortName')} placeholder="Akronim/Singkatan" />
                    </div>

                    <div className="space-y-2">
                        <Label>Deskripsi</Label>
                        <Textarea {...form.register('desc')} rows={5} placeholder="Penjelasan mengenai bidang/lembaga..." />
                        <p className="text-xs text-muted-foreground">Deskripsi ini akan tampil di Halaman Profil Publik HMF.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Ikon (Lucide)</Label>
                            <Input {...form.register('icon')} placeholder="contoh: Users" />
                        </div>
                        <div className="space-y-2">
                            <Label>Gaya Warna (Tailwind)</Label>
                            <Input {...form.register('color')} placeholder="contoh: from-red-500 to-rose-400" />
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
