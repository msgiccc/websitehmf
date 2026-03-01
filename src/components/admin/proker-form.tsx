'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ProkerSchema } from '@/lib/validations';
import { createProker, updateProker } from '@/lib/admin-actions';
import { KATEGORI_PROGRAM } from '@/lib/data-program-kerja';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ProkerFormValues = z.infer<typeof ProkerSchema>;

export default function ProkerForm({
    isOpen,
    setIsOpen,
    initialData,
}: {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    initialData?: any;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ProkerFormValues>({
        resolver: zodResolver(ProkerSchema),
        defaultValues: initialData
            ? {
                ...initialData
            }
            : {
                nama: '',
                deskripsi: '',
                status: 'PLANNING',
                bidang: '',
            },
    });

    const onSubmit = async (values: ProkerFormValues) => {
        setIsSubmitting(true);
        try {
            const payload = {
                ...values,
            };

            let result;
            if (initialData?.id) {
                result = await updateProker(initialData.id, payload);
            } else {
                result = await createProker(payload);
            }

            if (result.success) {
                toast.success(result.message);
                setIsOpen(false);
                form.reset();
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
                    <DialogTitle>{initialData ? 'Ubah Proker' : 'Tambah Proker'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Nama Program Kerja</Label>
                        <Input {...form.register('nama')} placeholder="Nama Proker" />
                        {form.formState.errors.nama && (
                            <p className="text-sm text-red-500">{form.formState.errors.nama.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Bidang / Lembaga</Label>
                        <Select
                            onValueChange={(val) => form.setValue('bidang', val)}
                            defaultValue={form.getValues('bidang')}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Bidang / Lembaga" />
                            </SelectTrigger>
                            <SelectContent>
                                {KATEGORI_PROGRAM.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {form.formState.errors.bidang && (
                            <p className="text-sm text-red-500">{form.formState.errors.bidang.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Deskripsi</Label>
                        <Textarea {...form.register('deskripsi')} rows={3} placeholder="Penjelasan mengenai program kerja..." />
                        {form.formState.errors.deskripsi && (
                            <p className="text-sm text-red-500">{form.formState.errors.deskripsi.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select
                                onValueChange={(val) => form.setValue('status', val as any)}
                                defaultValue={form.getValues('status')}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Status Proker" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PLANNING">Perencanaan</SelectItem>
                                    <SelectItem value="ONGOING">Sedang Berjalan</SelectItem>
                                    <SelectItem value="COMPLETED">Selesai</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Menyimpan...' : 'Simpan Proker'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
