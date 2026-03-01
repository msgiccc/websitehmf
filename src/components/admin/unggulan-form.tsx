'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ProgramUnggulanSchema } from '@/lib/validations/unggulan';
import { upsertProgramUnggulan } from '@/lib/admin-actions';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type UnggulanFormValues = z.infer<typeof ProgramUnggulanSchema>;

export default function UnggulanForm({
    isOpen,
    setIsOpen,
    initialData,
    kabinetId,
}: {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    initialData?: any;
    kabinetId: string;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<UnggulanFormValues>({
        resolver: zodResolver(ProgramUnggulanSchema),
        defaultValues: initialData || {
            kabinetId,
            nama: '',
            deskripsi: '',
            iconSvg: '',
        },
    });

    const onSubmit = async (values: UnggulanFormValues) => {
        setIsSubmitting(true);
        try {
            const result = await upsertProgramUnggulan(values);
            if (result.success) {
                toast.success(result.message);
                setIsOpen(false);
            } else {
                toast.error(result.message);
            }
        } catch (e: any) {
            toast.error('Gagal menyimpan program unggulan', { description: e.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Program Unggulan' : 'Tambah Program Unggulan'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Nama Program</Label>
                        <Input {...form.register('nama')} placeholder="Contoh: Pelatihan Kewirausahaan" />
                        {form.formState.errors.nama && <p className="text-sm text-red-500">{form.formState.errors.nama.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Deskripsi</Label>
                        <Textarea {...form.register('deskripsi')} rows={4} placeholder="Jelaskan detail program unggulan tersebut..." />
                        {form.formState.errors.deskripsi && <p className="text-sm text-red-500">{form.formState.errors.deskripsi.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>SVG Icon (Opsional)</Label>
                        <Textarea {...form.register('iconSvg')} rows={3} placeholder="Paste kode <svg> di sini..." className="font-mono text-xs" />
                        <p className="text-[11px] text-muted-foreground mt-1">
                            Salin kode SVG (ukuran 24x24) dari <a href="https://heroicons.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Heroicons</a> dan tempelkan di kotak ini.
                        </p>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
                        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Menyimpan...' : 'Simpan'}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
