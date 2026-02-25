'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { PengurusSchema } from '@/lib/validations';
import { createPengurus, updatePengurus } from '@/lib/admin-actions';
import { uploadImage } from '@/lib/upload';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type PengurusFormValues = z.infer<typeof PengurusSchema>;

export default function PengurusForm({
    isOpen,
    setIsOpen,
    initialData,
}: {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    initialData?: any;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const form = useForm<PengurusFormValues>({
        resolver: zodResolver(PengurusSchema),
        defaultValues: initialData || {
            nama: '',
            npm: '',
            jabatan: '',
            divisi: '',
            angkatan: '',
            fotoUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36', // Default placeholder
            linkedinUrl: '',
            instagramUrl: '',
        },
    });

    const onSubmit = async (values: PengurusFormValues) => {
        setIsSubmitting(true);
        try {
            let finalFotoUrl = values.fotoUrl;
            // If user uploaded a new image, replace URL
            if (imageFile) {
                finalFotoUrl = await uploadImage(imageFile);
            }

            const payload = { ...values, fotoUrl: finalFotoUrl };

            let result;
            if (initialData?.id) {
                result = await updatePengurus(initialData.id, payload);
            } else {
                result = await createPengurus(payload);
            }

            if (result.success) {
                toast.success(result.message);
                setIsOpen(false);
                form.reset();
                setImageFile(null);
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
                    <DialogTitle>{initialData ? 'Ubah Pengurus' : 'Tambah Pengurus'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Nama Lengkap</Label>
                        <Input {...form.register('nama')} placeholder="Budi Santoso" />
                        {form.formState.errors.nama && (
                            <p className="text-sm text-red-500">{form.formState.errors.nama.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>NPM</Label>
                        <Input {...form.register('npm')} placeholder="2100123" />
                        {form.formState.errors.npm && (
                            <p className="text-sm text-red-500">{form.formState.errors.npm.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Jabatan</Label>
                        <Input {...form.register('jabatan')} placeholder="Ketua BEM" />
                        {form.formState.errors.jabatan && (
                            <p className="text-sm text-red-500">{form.formState.errors.jabatan.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Divisi</Label>
                        <Input {...form.register('divisi')} placeholder="BPH" />
                        {form.formState.errors.divisi && (
                            <p className="text-sm text-red-500">{form.formState.errors.divisi.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Angkatan</Label>
                        <Input {...form.register('angkatan')} placeholder="2021" />
                        {form.formState.errors.angkatan && (
                            <p className="text-sm text-red-500">{form.formState.errors.angkatan.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Foto Profil (Opsional - Placeholder)</Label>
                        <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                        <p className="text-xs text-muted-foreground">Biarkan kosong jika tetap menggunakan URL default.</p>
                    </div>

                    <div className="space-y-2">
                        <Label>LinkedIn URL (Opsional)</Label>
                        <Input {...form.register('linkedinUrl')} placeholder="https://linkedin.com/in/budi" />
                    </div>
                    <div className="space-y-2">
                        <Label>Instagram URL (Opsional)</Label>
                        <Input {...form.register('instagramUrl')} placeholder="https://instagram.com/budi" />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
