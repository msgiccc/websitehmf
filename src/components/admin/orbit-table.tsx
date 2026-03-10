'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { createOrbitItem, updateOrbitItem, deleteOrbitItem, toggleOrbitTerjual } from '@/lib/admin-orbit-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, CheckCircle2, Circle, Instagram, Tag, ShoppingBag } from 'lucide-react';
import type { OrbitItem } from '@/lib/data';
import { useRouter } from 'next/navigation';

const KATEGORI_OPTIONS = [
    { value: 'buku', label: '📚 Buku' },
    { value: 'jas_lab', label: '🥼 Jas Lab' },
    { value: 'alat_ukur', label: '📐 Alat Ukur' },
    { value: 'alat_tulis', label: '✏️ Alat Tulis' },
    { value: 'elektronik', label: '💻 Elektronik' },
    { value: 'lainnya', label: '📦 Lainnya' },
];

const KONDISI_OPTIONS = [
    { value: 'baru', label: 'Baru' },
    { value: 'baik', label: 'Kondisi Baik' },
    { value: 'cukup', label: 'Kondisi Cukup' },
    { value: 'butuh_perbaikan', label: 'Butuh Perbaikan' },
];

// ============================================================
// Form Component
// PENTING: komponen ini harus di-remount setiap kali produk yang
// diedit berubah, caranya dengan meneruskan key={item?.id ?? 'new'}
// dari parent. useForm defaultValues hanya dibaca sekali saat mount.
// ============================================================
function OrbitForm({
    isOpen,
    setIsOpen,
    initialData,
    onSuccess,
}: {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    initialData: OrbitItem | null;
    onSuccess: () => void;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [kategori, setKategori] = useState<string>(initialData?.kategori || 'lainnya');
    const [kondisi, setKondisi] = useState<string>(initialData?.kondisi || 'baik');

    const form = useForm({
        defaultValues: {
            judul: initialData?.judul || '',
            deskripsi: initialData?.deskripsi || '',
            harga: initialData?.harga?.toString() || '0',
            foto_url: initialData?.foto_url || '',
            penjual_nama: initialData?.penjual_nama || '',
            penjual_instagram: initialData?.penjual_instagram || '',
            admin_instagram: (initialData as any)?.admin_instagram || '',
            is_active: initialData?.is_active !== false,
            is_terjual: initialData?.is_terjual || false,
        },
    });

    // Sync Select state ketika initialData berubah (extra safety)
    useEffect(() => {
        setKategori(initialData?.kategori || 'lainnya');
        setKondisi(initialData?.kondisi || 'baik');
    }, [initialData]);

    const onSubmit = async (values: any) => {
        setIsSubmitting(true);
        try {
            const fd = new FormData();
            Object.entries({ ...values, kategori, kondisi }).forEach(([k, v]) => {
                fd.append(k, String(v));
            });

            let result;
            if (initialData) {
                result = await updateOrbitItem(initialData.id, fd);
            } else {
                result = await createOrbitItem(fd);
            }

            if (result?.error) {
                toast.error('Gagal menyimpan', { description: result.error });
            } else {
                toast.success(initialData ? 'Berhasil diperbarui!' : 'Listing baru berhasil ditambahkan!');
                setIsOpen(false);
                onSuccess();
            }
        } catch (e: any) {
            toast.error('Terjadi kesalahan', { description: e.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {initialData ? `Edit: ${initialData.judul}` : 'Tambah Listing Baru'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">

                    {/* Judul */}
                    <div className="space-y-2">
                        <Label>Judul Barang *</Label>
                        <Input {...form.register('judul')} placeholder="Contoh: Buku Fisika Zat Padat Kittel" />
                    </div>

                    {/* Kategori + Kondisi */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Kategori</Label>
                            <Select value={kategori} onValueChange={setKategori}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {KATEGORI_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Kondisi</Label>
                            <Select value={kondisi} onValueChange={setKondisi}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {KONDISI_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Harga */}
                    <div className="space-y-2">
                        <Label>Harga (Rp)</Label>
                        <Input {...form.register('harga')} type="number" min="0" placeholder="0 = Gratis/Hibah" />
                        <p className="text-xs text-muted-foreground">Isi 0 jika barang dihibahkan secara gratis.</p>
                    </div>

                    {/* Deskripsi */}
                    <div className="space-y-2">
                        <Label>Deskripsi</Label>
                        <Textarea {...form.register('deskripsi')} rows={3} placeholder="Kondisi detail, edisi, kelengkapan, alasan jual..." />
                    </div>

                    {/* Foto */}
                    <div className="space-y-2">
                        <Label>URL Foto Barang</Label>
                        <Input {...form.register('foto_url')} placeholder="https://... (URL gambar langsung)" />
                        <p className="text-xs text-muted-foreground">Link gambar jpg/png langsung. Untuk Google Drive: klik kanan foto → Bagikan → salin link gambar.</p>
                    </div>

                    {/* Info Penjual */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Nama Penjual *</Label>
                            <Input {...form.register('penjual_nama')} placeholder="Nama panggilan penjual" />
                        </div>
                        <div className="space-y-2">
                            <Label>IG Penjual * (tanpa @)</Label>
                            <div className="flex items-center gap-1.5 border rounded-md px-2 bg-muted/30">
                                <span className="text-muted-foreground text-sm font-bold">@</span>
                                <Input {...form.register('penjual_instagram')} placeholder="username_ig" className="border-0 bg-transparent !px-0 !shadow-none focus-visible:ring-0" />
                            </div>
                        </div>
                    </div>

                    {/* IG Admin HMF */}
                    <div className="space-y-2 pt-1 border-t border-border">
                        <Label className="flex items-center gap-2">
                            <Instagram className="w-4 h-4 text-pink-500" />
                            IG Admin HMF (tanpa @)
                        </Label>
                        <div className="flex items-center gap-1.5 border rounded-md px-2 bg-pink-50/10">
                            <span className="text-muted-foreground text-sm font-bold">@</span>
                            <Input
                                {...form.register('admin_instagram')}
                                placeholder="hmffpmipaupi"
                                className="border-0 bg-transparent !px-0 !shadow-none focus-visible:ring-0"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">Opsional — username IG admin HMF yang bisa dihubungi untuk info lebih lanjut tentang listing ini.</p>
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-center gap-6 pt-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" {...form.register('is_active')} className="w-4 h-4" />
                            <span className="text-sm font-medium">Tampilkan di Publik</span>
                        </label>
                        {initialData && (
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" {...form.register('is_terjual')} className="w-4 h-4" />
                                <span className="text-sm font-medium">Sudah Terjual</span>
                            </label>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Menyimpan...' : (initialData ? 'Simpan Perubahan' : 'Tambah Listing')}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

// ============================================================
// Main Admin ORBIT Table Component
// ============================================================
export default function OrbitTable({ initialData }: { initialData: OrbitItem[] }) {
    const [formOpen, setFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<OrbitItem | null>(null);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const router = useRouter();

    const handleAdd = () => {
        setEditingItem(null);
        setFormOpen(true);
    };

    const handleEdit = (item: OrbitItem) => {
        setEditingItem(item);
        setFormOpen(true);
    };

    const handleSuccess = () => {
        setFormOpen(false);
        router.refresh();
    };

    const handleDelete = async (id: string, judul: string) => {
        if (!confirm(`Hapus listing "${judul}"?`)) return;
        const result = await deleteOrbitItem(id);
        if (result?.error) {
            toast.error('Gagal menghapus', { description: result.error });
        } else {
            toast.success('Listing berhasil dihapus');
            router.refresh();
        }
    };

    const handleToggleTerjual = async (item: OrbitItem) => {
        setLoadingId(item.id);
        const result = await toggleOrbitTerjual(item.id, !item.is_terjual);
        setLoadingId(null);
        if (result?.error) {
            toast.error('Gagal mengubah status', { description: result.error });
        } else {
            toast.success(item.is_terjual ? '↩ Dikembalikan: Tersedia' : '✅ Ditandai: Sudah Terjual');
            router.refresh();
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-[#C9A24D]" />
                        Manajemen Listing ORBIT
                    </h2>
                    <p className="text-sm text-muted-foreground mt-0.5">{initialData.length} listing tersimpan</p>
                </div>
                <Button onClick={handleAdd} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Tambah Listing
                </Button>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-muted/50">
                            <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Barang</th>
                            <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">Kategori</th>
                            <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden sm:table-cell">Harga</th>
                            <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden lg:table-cell">Penjual</th>
                            <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Status</th>
                            <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {initialData.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-12 text-muted-foreground">
                                    Belum ada listing. Klik &quot;Tambah Listing&quot; untuk mulai.
                                </td>
                            </tr>
                        ) : (
                            initialData.map(item => (
                                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                                    {/* Kolom Barang */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            {item.foto_url ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={item.foto_url} alt={item.judul} className="w-10 h-10 rounded-xl object-cover border border-border" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center border border-border">
                                                    <Tag className="w-4 h-4 text-muted-foreground" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-foreground line-clamp-1">{item.judul}</p>
                                                <p className="text-xs text-muted-foreground">{item.kondisi}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Kolom Kategori */}
                                    <td className="px-4 py-3 hidden md:table-cell">
                                        <span className="text-xs px-2 py-1 bg-muted rounded-lg text-muted-foreground font-medium">{item.kategori}</span>
                                    </td>

                                    {/* Kolom Harga */}
                                    <td className="px-4 py-3 font-semibold text-foreground hidden sm:table-cell">
                                        {item.harga === 0 ? <span className="text-green-500">Gratis</span> : `Rp ${item.harga.toLocaleString('id-ID')}`}
                                    </td>

                                    {/* Kolom Penjual */}
                                    <td className="px-4 py-3 hidden lg:table-cell">
                                        <div className="flex items-center gap-1.5">
                                            <Instagram className="w-3.5 h-3.5 text-pink-500" />
                                            <span className="text-muted-foreground text-xs">@{item.penjual_instagram}</span>
                                        </div>
                                        <p className="text-xs text-foreground font-medium">{item.penjual_nama}</p>
                                    </td>

                                    {/* Kolom Status — tombol langsung klik toggle */}
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleToggleTerjual(item)}
                                            disabled={loadingId === item.id}
                                            title={item.is_terjual ? 'Klik untuk kembalikan ke Tersedia' : 'Klik untuk tandai Sudah Terjual'}
                                            className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-full transition-all border ${loadingId === item.id
                                                    ? 'opacity-50 cursor-wait border-transparent bg-muted'
                                                    : item.is_terjual
                                                        ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                                                        : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                                                }`}
                                        >
                                            {item.is_terjual
                                                ? <><Circle className="w-3 h-3" /> Terjual</>
                                                : <><CheckCircle2 className="w-3 h-3" /> Tersedia</>
                                            }
                                        </button>
                                    </td>

                                    {/* Kolom Aksi */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEdit(item)}
                                                className="h-8 w-8 p-0"
                                                title={`Edit: ${item.judul}`}
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(item.id, item.judul)}
                                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                                title="Hapus listing"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/*
             * KEY PROP = FIX UTAMA BUG FORM EDIT
             * Setiap kali editingItem berubah, key berubah → React unmount + remount OrbitForm
             * → useForm membaca defaultValues baru dari initialData yang benar
             */}
            <OrbitForm
                key={editingItem?.id ?? 'new-item-form'}
                isOpen={formOpen}
                setIsOpen={setFormOpen}
                initialData={editingItem}
                onSuccess={handleSuccess}
            />
        </div>
    );
}
