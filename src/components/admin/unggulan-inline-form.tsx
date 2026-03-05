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
import { Card, CardContent } from '@/components/ui/card';

type UnggulanFormValues = z.infer<typeof ProgramUnggulanSchema>;

export default function UnggulanInlineForm({
    initialData,
    kabinetId,
}: {
    initialData?: any; // Bisa string 'id' atau undefined jika kosong
    kabinetId: string;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Default value sesuai request jika belum ada data, namanya "Pelatihan Kewirausahaan"
    const isNew = !initialData;

    const form = useForm<UnggulanFormValues>({
        resolver: zodResolver(ProgramUnggulanSchema),
        defaultValues: initialData || {
            kabinetId,
            nama: 'Pelatihan Kewirausahaan',
            deskripsi: '',
            iconSvg: '',
        },
    });

    const onSubmit = async (values: UnggulanFormValues) => {
        setIsSubmitting(true);
        try {
            const result = await upsertProgramUnggulan(values);
            if (result.success) {
                toast.success('Program Unggulan Maskot berhasil disimpan!');
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            {isNew && (
                <div className="bg-yellow-50 text-yellow-800 p-3 rounded-md text-sm border border-yellow-200 mb-4">
                    Belum ada program unggulan. Silakan isi form di bawah. (Nama default: <strong>Pelatihan Kewirausahaan</strong>)
                </div>
            )}
            <div className="space-y-2">
                <Label>Nama Program Maskot</Label>
                <Input {...form.register('nama')} placeholder="Contoh: Pelatihan Kewirausahaan" />
                {form.formState.errors.nama && <p className="text-sm text-red-500">{form.formState.errors.nama.message}</p>}
            </div>

            <div className="space-y-2">
                <Label>Deskripsi</Label>
                <Textarea {...form.register('deskripsi')} rows={4} placeholder="Jelaskan detail program unggulan tersebut secara memukau..." />
                {form.formState.errors.deskripsi && <p className="text-sm text-red-500">{form.formState.errors.deskripsi.message}</p>}
            </div>

            <div className="space-y-2">
                <Label>SVG Icon (Opsional)</Label>
                <Textarea {...form.register('iconSvg')} rows={3} placeholder="Paste kode <svg> di sini..." className="font-mono text-xs text-muted-foreground" />
                <p className="text-[11px] text-muted-foreground mt-1">
                    Salin kode SVG (ukuran 24x24) dari <a href="https://heroicons.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Heroicons</a> dan tempelkan di kotak ini untuk ikon pelengkap.
                </p>
            </div>

            <div className="flex justify-start pt-4">
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Menyimpan...' : 'Simpan Pembaruan Program'}</Button>
            </div>
        </form>
    );
}
