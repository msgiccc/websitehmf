'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ProfilSchema } from '@/lib/validations';
import { upsertProfil } from '@/lib/admin-actions';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type ProfilFormValues = z.infer<typeof ProfilSchema>;

export default function ProfilForm({ initialData }: { initialData?: any }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ProfilFormValues>({
        resolver: zodResolver(ProfilSchema),
        defaultValues: initialData || {
            sejarah_p1: '',
            sejarah_p2: '',
            sejarah_card1: '',
            sejarah_card2: '',
            lambang_desc: '',
            lambang_tulisan: '',
            lambang_mahkota: '',
            lambang_lingkaran: '',
            lambang_sayap: '',
            lambang_elektron: '',
            lambang_segitiga: '',
            warna_biru: '',
            warna_merah: '',
            warna_putih: '',
            mars_ciptaan: '',
            mars_lirik: '',
            hymne_ciptaan: '',
            hymne_lirik: '',
        },
    });

    const onSubmit = async (values: ProfilFormValues) => {
        setIsSubmitting(true);
        try {
            const result = await upsertProfil(values);
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (e: any) {
            toast.error('Gagal menyimpan data profil', { description: e.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {/* Bagian Sejarah */}
            <Card>
                <CardHeader>
                    <CardTitle>Sejarah Himpunan</CardTitle>
                    <CardDescription>Paragraf-paragraf sejarah yang tampil di tab "Sejarah Singkat".</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Sejarah Paragraf 1</Label>
                        <Textarea rows={3} {...form.register('sejarah_p1')} />
                        {form.formState.errors.sejarah_p1 && <p className="text-sm text-red-500">{form.formState.errors.sejarah_p1.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label>Sejarah Paragraf 2 (Momentum Pendirian)</Label>
                        <Textarea rows={4} {...form.register('sejarah_p2')} />
                        {form.formState.errors.sejarah_p2 && <p className="text-sm text-red-500">{form.formState.errors.sejarah_p2.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label>Sejarah Card Kanan Atas (Evolusi Nama)</Label>
                        <Textarea rows={3} {...form.register('sejarah_card1')} />
                        {form.formState.errors.sejarah_card1 && <p className="text-sm text-red-500">{form.formState.errors.sejarah_card1.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label>Sejarah Card Kanan Bawah (Kondisi Terkini)</Label>
                        <Textarea rows={3} {...form.register('sejarah_card2')} />
                        {form.formState.errors.sejarah_card2 && <p className="text-sm text-red-500">{form.formState.errors.sejarah_card2.message}</p>}
                    </div>
                </CardContent>
            </Card>

            {/* Bagian Lambang & Detail */}
            <Card>
                <CardHeader>
                    <CardTitle>Makna Lambang</CardTitle>
                    <CardDescription>Deskripsi elemen-elemen logo HMF.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Deskripsi Pembuka Lambang</Label>
                        <Textarea rows={2} {...form.register('lambang_desc')} />
                        {form.formState.errors.lambang_desc && <p className="text-sm text-red-500">{form.formState.errors.lambang_desc.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Makna: Tulisan & Lingkaran</Label>
                            <Textarea rows={3} {...form.register('lambang_tulisan')} />
                            {form.formState.errors.lambang_tulisan && <p className="text-sm text-red-500">{form.formState.errors.lambang_tulisan.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Makna: Mahkota Segilima</Label>
                            <Textarea rows={3} {...form.register('lambang_mahkota')} />
                            {form.formState.errors.lambang_mahkota && <p className="text-sm text-red-500">{form.formState.errors.lambang_mahkota.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Makna: Lingkaran Biru Dalam</Label>
                            <Textarea rows={3} {...form.register('lambang_lingkaran')} />
                            {form.formState.errors.lambang_lingkaran && <p className="text-sm text-red-500">{form.formState.errors.lambang_lingkaran.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Makna: Sepasang Sayap</Label>
                            <Textarea rows={3} {...form.register('lambang_sayap')} />
                            {form.formState.errors.lambang_sayap && <p className="text-sm text-red-500">{form.formState.errors.lambang_sayap.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Makna: Lintasan Elektron Merah</Label>
                            <Textarea rows={3} {...form.register('lambang_elektron')} />
                            {form.formState.errors.lambang_elektron && <p className="text-sm text-red-500">{form.formState.errors.lambang_elektron.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Makna: Segitiga Terbalik Merah</Label>
                            <Textarea rows={3} {...form.register('lambang_segitiga')} />
                            {form.formState.errors.lambang_segitiga && <p className="text-sm text-red-500">{form.formState.errors.lambang_segitiga.message}</p>}
                        </div>
                    </div>

                    <div className="pt-4 border-t mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Simbolik Warna: Biru</Label>
                            <Textarea rows={2} {...form.register('warna_biru')} />
                            {form.formState.errors.warna_biru && <p className="text-sm text-red-500">{form.formState.errors.warna_biru.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Simbolik Warna: Merah</Label>
                            <Textarea rows={2} {...form.register('warna_merah')} />
                            {form.formState.errors.warna_merah && <p className="text-sm text-red-500">{form.formState.errors.warna_merah.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Simbolik Warna: Putih</Label>
                            <Textarea rows={2} {...form.register('warna_putih')} />
                            {form.formState.errors.warna_putih && <p className="text-sm text-red-500">{form.formState.errors.warna_putih.message}</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Bagian Mars & Hymne */}
            <Card>
                <CardHeader>
                    <CardTitle>Mars & Hymne</CardTitle>
                    <CardDescription>Lirik dan detail Mars serta Hymne HMF FPMIPA UPI.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Mars */}
                        <div className="space-y-4 border p-4 rounded-xl bg-gray-50/50">
                            <h3 className="font-bold text-lg text-red-600">Pengaturan MARS</h3>
                            <div className="space-y-2">
                                <Label>Nama Pencipta Mars</Label>
                                <Input {...form.register('mars_ciptaan')} />
                                {form.formState.errors.mars_ciptaan && <p className="text-sm text-red-500">{form.formState.errors.mars_ciptaan.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Lirik Mars</Label>
                                <Textarea rows={10} {...form.register('mars_lirik')} placeholder="Gunakan Enter/Baris baru untuk memisahkan lirik" />
                                {form.formState.errors.mars_lirik && <p className="text-sm text-red-500">{form.formState.errors.mars_lirik.message}</p>}
                            </div>
                        </div>

                        {/* Hymne */}
                        <div className="space-y-4 border p-4 rounded-xl bg-gray-50/50">
                            <h3 className="font-bold text-lg text-blue-600">Pengaturan HYMNE</h3>
                            <div className="space-y-2">
                                <Label>Nama Pencipta Hymne</Label>
                                <Input {...form.register('hymne_ciptaan')} />
                                {form.formState.errors.hymne_ciptaan && <p className="text-sm text-red-500">{form.formState.errors.hymne_ciptaan.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Lirik Hymne</Label>
                                <Textarea rows={10} {...form.register('hymne_lirik')} placeholder="Gunakan Enter/Baris baru untuk memisahkan lirik" />
                                {form.formState.errors.hymne_lirik && <p className="text-sm text-red-500">{form.formState.errors.hymne_lirik.message}</p>}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full md:w-auto text-lg px-8" disabled={isSubmitting}>
                {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan Profil'}
            </Button>
        </form>
    );
}
