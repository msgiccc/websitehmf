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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type KabinetFormValues = z.infer<typeof KabinetSchema>;

export default function KabinetForm({ initialData }: { initialData?: any }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<KabinetFormValues>({
        resolver: zodResolver(KabinetSchema),
        defaultValues: initialData || {
            namaKabinet: '',
            periode: `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`,
            logoUrl: '',
            visi: '',
            misi: '',
            heroPhoto1: '',
            heroPhoto2: '',
            heroPhoto3: '',
            heroPhoto4: '',
        },
    });

    const watchPeriode = form.watch('periode') || `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`;
    const watchLogoUrl = form.watch('logoUrl');
    const watchHero1 = form.watch('heroPhoto1');
    const watchHero2 = form.watch('heroPhoto2');
    const watchHero3 = form.watch('heroPhoto3');
    const watchHero4 = form.watch('heroPhoto4');

    // Pecah jadi 2 bagian
    const [startYearStr, endYearStr] = watchPeriode.split('/');
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - 3 + i);

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

                <div className="space-y-4">
                    <Label htmlFor="periode">Periode Kepengurusan</Label>
                    <div className="flex items-center gap-3">
                        <Select
                            value={startYearStr}
                            onValueChange={(val) => {
                                form.setValue('periode', `${val}/${endYearStr}`);
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Tahun Awal" />
                            </SelectTrigger>
                            <SelectContent>
                                {yearOptions.map(y => (
                                    <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <span className="text-muted-foreground font-bold">/</span>

                        <Select
                            value={endYearStr}
                            onValueChange={(val) => {
                                form.setValue('periode', `${startYearStr}/${val}`);
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Tahun Akhir" />
                            </SelectTrigger>
                            <SelectContent>
                                {yearOptions.map(y => (
                                    <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {form.formState.errors.periode && (
                        <p className="text-sm text-red-500">{form.formState.errors.periode.message}</p>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <Label htmlFor="logoUrl">Logo Kabinet (URL atau Label Path)</Label>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-1 w-full space-y-2">
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

                    {/* Live Preview Box */}
                    <div className="w-full md:w-32 aspect-square rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-2 text-center text-xs text-muted-foreground overflow-hidden shrink-0 group">
                        {watchLogoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={watchLogoUrl} alt="Preview Logo" className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = 'Image tidak<br/>valid' }} />
                        ) : (
                            <span>Pratinjau<br />Logo</span>
                        )}
                    </div>
                </div>
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

            {/* FOTO LANDING PAGE */}
            <div className="space-y-4 pt-4 border-t">
                <div>
                    <Label className="text-lg font-bold">Foto Pahlawan (Landing Page)</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                        4 Ekstra foto vertikal/persegi yang akan muncul di layar utama (berjejer ke samping). Gunakan link gambar eksternal atau gambar lokal.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[1, 2, 3, 4].map((num) => {
                        const formKey = `heroPhoto${num}` as keyof KabinetFormValues;
                        // Pilih watch variabel
                        const previewVal = num === 1 ? watchHero1 : num === 2 ? watchHero2 : num === 3 ? watchHero3 : watchHero4;

                        return (
                            <div key={num} className="space-y-4 border rounded-xl p-4 bg-gray-50/50">
                                <Label htmlFor={formKey}>Foto Nomor Ke-{num}</Label>
                                <div className="flex flex-col xl:flex-row gap-4 items-start">
                                    <div className="flex-1 w-full space-y-2">
                                        <Input
                                            id={formKey}
                                            {...form.register(formKey)}
                                            placeholder="https://images.unsplash..."
                                        />
                                        {form.formState.errors[formKey] && (
                                            <p className="text-sm text-red-500">{form.formState.errors[formKey]?.message}</p>
                                        )}
                                    </div>
                                    <div className="w-full xl:w-24 aspect-[3/4] rounded-lg border-2 border-dashed border-gray-300 bg-white flex flex-col items-center justify-center p-1 text-center text-[10px] text-muted-foreground overflow-hidden shrink-0 group">
                                        {previewVal ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={previewVal as string} alt={`Hero ${num}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = 'Image tidak<br/>valid' }} />
                                        ) : (
                                            <span>Belum Ada<br />Foto</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? 'Menyimpan...' : 'Simpan Data Kabinet'}
            </Button>
        </form>
    );
}
