'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { GaleriSchema } from '@/lib/validations';
import { createGaleri } from '@/lib/admin-actions';
import { uploadImage } from '@/lib/upload';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type GaleriFormValues = z.infer<typeof GaleriSchema>;

export default function GaleriForm({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const form = useForm<GaleriFormValues>({
        resolver: zodResolver(GaleriSchema),
        defaultValues: {
            judul: '',
            imageUrl: 'https://images.unsplash.com/photo-1542435503-956c469947f6',
            kategori: 'KEGIATAN',
        },
    });

    const onSubmit = async (values: GaleriFormValues) => {
        setIsSubmitting(true);
        try {
            let finalImgUrl = values.imageUrl;
            // If user uploaded a new image, replace URL
            if (imageFile) {
                finalImgUrl = await uploadImage(imageFile);
            }

            const payload = { ...values, imageUrl: finalImgUrl };

            // Galeri hanya create & delete sesuai instruksi awal
            const result = await createGaleri(payload);

            if (result.success) {
                toast.success(result.message);
                setIsOpen(false);
                form.reset();
                setImageFile(null);
            } else {
                toast.error(result.message);
            }
        } catch (e: any) {
            toast.error('Gagal memproses upload', { description: e.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Unggah Foto Baru</DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Judul / Keterangan Foto</Label>
                        <Input {...form.register('judul')} placeholder="Keterangan gambar..." />
                        {form.formState.errors.judul && (
                            <p className="text-sm text-red-500">{form.formState.errors.judul.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Kategori Dokumentasi</Label>
                        <Select
                            onValueChange={(val) => form.setValue('kategori', val as any)}
                            defaultValue={form.getValues('kategori')}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="KEGIATAN">Kegiatan Internal/Eksternal</SelectItem>
                                <SelectItem value="PRESTASI">Penghargaan / Prestasi</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Pilih Gambar</Label>
                        <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                        <p className="text-xs text-muted-foreground">URL Placeholder akan digunakan jika tidak mengunggah file.</p>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Mengunggah...' : 'Unggah ke Galeri'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
