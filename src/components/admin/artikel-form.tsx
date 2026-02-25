'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ArtikelSchema } from '@/lib/validations';
import { createArtikel, updateArtikel } from '@/lib/admin-actions';
import { uploadImage } from '@/lib/upload';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ArtikelFormValues = z.infer<typeof ArtikelSchema>;

export default function ArtikelForm({
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

    const form = useForm<ArtikelFormValues>({
        resolver: zodResolver(ArtikelSchema),
        defaultValues: initialData || {
            judul: '',
            slug: '',
            ringkasan: '',
            konten: '',
            thumbnail: 'https://images.unsplash.com/photo-1542435503-956c469947f6',
            author: '',
            status: 'DRAFT',
        },
    });

    const onSubmit = async (values: ArtikelFormValues) => {
        setIsSubmitting(true);
        try {
            let finalThumbUrl = values.thumbnail;
            if (imageFile) {
                finalThumbUrl = await uploadImage(imageFile);
            }

            const payload = { ...values, thumbnail: finalThumbUrl };

            let result;
            if (initialData?.id) {
                result = await updateArtikel(initialData.id, payload);
            } else {
                result = await createArtikel(payload);
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
            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Ubah Artikel' : 'Tulis Artikel'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Judul Artikel</Label>
                            <Input {...form.register('judul')} placeholder="Judul..." />
                            {form.formState.errors.judul && (
                                <p className="text-sm text-red-500">{form.formState.errors.judul.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Slug URL</Label>
                            <Input {...form.register('slug')} placeholder="judul-artikel" />
                            {form.formState.errors.slug && (
                                <p className="text-sm text-red-500">{form.formState.errors.slug.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Ringkasan</Label>
                        <Textarea {...form.register('ringkasan')} rows={2} placeholder="Brief summary..." />
                        {form.formState.errors.ringkasan && (
                            <p className="text-sm text-red-500">{form.formState.errors.ringkasan.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Konten Lengkap</Label>
                        <Textarea {...form.register('konten')} rows={6} placeholder="Full content here..." />
                        {form.formState.errors.konten && (
                            <p className="text-sm text-red-500">{form.formState.errors.konten.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Penulis / Author</Label>
                            <Input {...form.register('author')} placeholder="Nama penulis" />
                            {form.formState.errors.author && (
                                <p className="text-sm text-red-500">{form.formState.errors.author.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select
                                onValueChange={(val) => form.setValue('status', val as any)}
                                defaultValue={form.getValues('status')}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="DRAFT">DRAFT</SelectItem>
                                    <SelectItem value="PUBLISHED">PUBLISHED</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Thumbnail (Opsional - Placeholder)</Label>
                        <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Menyimpan...' : 'Simpan Artikel'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
