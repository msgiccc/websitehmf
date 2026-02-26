'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { KabinetSchema } from '@/lib/validations';
import { upsertKabinet } from '@/lib/admin-actions';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type KabinetFormValues = z.infer<typeof KabinetSchema>;

export default function KabinetForm({ initialData }: { initialData?: any }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<KabinetFormValues>({
        resolver: zodResolver(KabinetSchema),
        defaultValues: initialData || {
            namaKabinet: '',
            periode: '',
            logoUrl: '',
            visi: '',
            misi: '',
        },
    });

    const onSubmit = async (values: KabinetFormValues) => {
        setIsSubmitting(true);
        try {
            const result = await upsertKabinet(values);
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (e: any) {
            toast.error('Gagal menyimpan data kabinet', { description: e.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="namaKabinet">Nama Kabinet</Label>
                    <Input
                        id="namaKabinet"
                        {...form.register('namaKabinet')}
                        placeholder="Niskala Cakra Murni"
                    />
                    {form.formState.errors.namaKabinet && (
                        <p className="text-sm text-red-500">{form.formState.errors.namaKabinet.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="periode">Periode</Label>
                    <Input
                        id="periode"
                        {...form.register('periode')}
                        placeholder="2025/2026"
                    />
                    {form.formState.errors.periode && (
                        <p className="text-sm text-red-500">{form.formState.errors.periode.message}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="logoUrl">URL Logo Kabinet</Label>
                <Input
                    id="logoUrl"
                    {...form.register('logoUrl')}
                    placeholder="/niskala.png atau https://..."
                />
                <p className="text-xs text-muted-foreground">
                    Bisa path lokal (contoh: /niskala.png) atau URL eksternal (https://...)
                </p>
                {form.formState.errors.logoUrl && (
                    <p className="text-sm text-red-500">{form.formState.errors.logoUrl.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="visi">Visi Kabinet</Label>
                <Textarea
                    id="visi"
                    {...form.register('visi')}
                    rows={3}
                    placeholder="Tuliskan visi kabinet..."
                />
                {form.formState.errors.visi && (
                    <p className="text-sm text-red-500">{form.formState.errors.visi.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="misi">Misi Kabinet</Label>
                <Textarea
                    id="misi"
                    {...form.register('misi')}
                    rows={5}
                    placeholder="Tuliskan misi kabinet (pisahkan tiap poin dengan enter baru)..."
                />
                <p className="text-xs text-muted-foreground">
                    Tips: pisahkan setiap poin misi dengan baris baru
                </p>
                {form.formState.errors.misi && (
                    <p className="text-sm text-red-500">{form.formState.errors.misi.message}</p>
                )}
            </div>

            <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? 'Menyimpan...' : 'Simpan Data Kabinet'}
            </Button>
        </form>
    );
}
