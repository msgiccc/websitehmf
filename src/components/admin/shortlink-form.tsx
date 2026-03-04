'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ShortLinkSchema } from '@/lib/validations';
import { createShortLink, updateShortLink } from '@/lib/admin-actions';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

type ShortLinkFormValues = z.infer<typeof ShortLinkSchema>;

export default function ShortLinkForm({
    isOpen,
    setIsOpen,
    initialData,
}: {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    initialData?: any;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ShortLinkFormValues>({
        resolver: zodResolver(ShortLinkSchema),
        defaultValues: initialData || {
            slug: '',
            url_asli: '',
            isPublic: true,
        },
    });

    const onSubmit = async (values: ShortLinkFormValues) => {
        setIsSubmitting(true);
        try {
            const result = initialData?.id
                ? await updateShortLink(initialData.id, values)
                : await createShortLink(values);

            if (result.success) {
                toast.success(result.message);
                setIsOpen(false);
                if (!initialData) form.reset();
            } else {
                toast.error(result.message);
            }
        } catch (e: any) {
            toast.error('Gagal menyimpan tautan pendek', { description: e.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Tautan Pendek' : 'Buat Tautan Pendek'}</DialogTitle>
                    <DialogDescription>
                        Alihkan URL yang panjang dari Google Drive, form pendaftaran, dll menjadi lebih singkat dan enak dilihat.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Kata Kunci Tautan (Slug)</Label>
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground bg-muted px-3 py-2 rounded-md text-sm whitespace-nowrap hidden sm:inline-block">/</span>
                            <Input {...form.register('slug')} placeholder="contoh: oprec-2024" className="font-mono" />
                        </div>
                        {form.formState.errors.slug && <p className="text-sm text-red-500">{form.formState.errors.slug.message}</p>}
                        <p className="text-xs text-muted-foreground">URL nantinya akan menjadi <span className="text-primary font-mono">{typeof window !== 'undefined' ? window.location.origin : 'domain.com'}/[kata-kunci]</span></p>
                    </div>

                    <div className="space-y-2">
                        <Label>URL Tujuan (Panjang)</Label>
                        <Input {...form.register('url_asli')} placeholder="https://docs.google.com/forms/..." />
                        {form.formState.errors.url_asli && <p className="text-sm text-red-500">{form.formState.errors.url_asli.message}</p>}
                    </div>

                    <div className="flex items-center space-x-2 pt-2 pb-1">
                        <Checkbox
                            id="isPublic"
                            checked={form.watch('isPublic')}
                            onCheckedChange={(checked) => form.setValue('isPublic', checked as boolean)}
                        />
                        <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="isPublic" className="font-medium cursor-pointer">
                                Tampilkan di Etalase Publik
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Jika diaktifkan, link ini akan muncul di halaman direktori publik LASER.
                            </p>
                        </div>
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
