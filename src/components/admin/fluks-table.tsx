'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { createFluksItem, updateFluksItem, deleteFluksItem, updateFluksConfig } from '@/lib/admin-fluks-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Store, Tag, ClipboardList, ExternalLink, Save } from 'lucide-react';
import type { FluksItem, FluksConfig } from '@/lib/data';
import { useRouter } from 'next/navigation';

const KATEGORI_OPTIONS = [
    { value: 'buku', label: '📚 Buku' },
    { value: 'makanan', label: '🍱 Makanan' },
    { value: 'aplikasi', label: '📱 Aplikasi Premium' },
    { value: 'merchandise', label: '🎁 Merchandise' },
    { value: 'layanan', label: '🔧 Layanan' },
    { value: 'lainnya', label: '📦 Lainnya' },
];

const STOK_OPTIONS = [
    { value: 'tersedia', label: '✅ Tersedia' },
    { value: 'terbatas', label: '⚠️ Terbatas' },
    { value: 'habis', label: '❌ Habis' },
];

const TIPE_LINK_OPTIONS = [
    { value: 'instagram', label: '📸 Instagram' },
    { value: 'whatsapp', label: '💬 WhatsApp' },
    { value: 'lainnya', label: '🔗 Lainnya' },
];

// ============================================================
// Form Dialog
// ============================================================
function FluksForm({
    isOpen,
    setIsOpen,
    initialData,
    onSuccess,
}: {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    initialData: FluksItem | null;
    onSuccess: () => void;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [kategori, setKategori] = useState<string>(initialData?.kategori || 'lainnya');
    const [stok, setStok] = useState<string>(initialData?.stok || 'tersedia');
    const [tipeLink, setTipeLink] = useState<string>(initialData?.tipe_link || 'instagram');

    const form = useForm({
        defaultValues: {
            nama: initialData?.nama || '',
            deskripsi: initialData?.deskripsi || '',
            harga: initialData?.harga?.toString() || '0',
            foto_url: initialData?.foto_url || '',
            link_order: initialData?.link_order || '',
            badge: initialData?.badge || '',
            urutan: initialData?.urutan?.toString() || '0',
            is_active: initialData?.is_active !== false,
        },
    });

    const onSubmit = async (values: any) => {
        setIsSubmitting(true);
        try {
            const fd = new FormData();
            Object.entries({ ...values, kategori, stok, tipe_link: tipeLink }).forEach(([k, v]) => {
                fd.append(k, String(v));
            });

            const result = initialData
                ? await updateFluksItem(initialData.id, fd)
                : await createFluksItem(fd);

            if (result?.error) {
                toast.error('Gagal menyimpan', { description: result.error });
            } else {
                toast.success(initialData ? 'Produk diperbarui!' : 'Produk baru ditambahkan!');
                setIsOpen(false);
                onSuccess();
            }
        } catch (e: any) {
            toast.error('Error', { description: e.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {initialData ? `Edit: ${initialData.nama}` : 'Tambah Produk FLUKS'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">

                    <div className="space-y-2">
                        <Label>Nama Produk *</Label>
                        <Input {...form.register('nama')} placeholder="Contoh: Indomie Spesial Goreng, Netflix 1 Bulan" />
                    </div>

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
                            <Label>Status Stok</Label>
                            <Select value={stok} onValueChange={setStok}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {STOK_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Harga (Rp)</Label>
                            <Input {...form.register('harga')} type="number" min="0" placeholder="0 = Gratis" />
                        </div>
                        <div className="space-y-2">
                            <Label>Urutan Tampil</Label>
                            <Input {...form.register('urutan')} type="number" min="0" placeholder="0" />
                            <p className="text-xs text-muted-foreground">Angka kecil = tampil lebih awal.</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Deskripsi</Label>
                        <Textarea {...form.register('deskripsi')} rows={3} placeholder="Detail produk, cara order, batas waktu, dsb..." />
                    </div>

                    <div className="space-y-2">
                        <Label>URL Foto Produk</Label>
                        <Input {...form.register('foto_url')} placeholder="https://... (URL gambar langsung)" />
                    </div>

                    <div className="space-y-2">
                        <Label>Badge Khusus</Label>
                        <Input {...form.register('badge')} placeholder="Terlaris / Baru / Diskon / Limited (opsional)" />
                        <p className="text-xs text-muted-foreground">Munculkan badge berwarna di kartu produk.</p>
                    </div>

                    <div className="grid grid-cols-[140px_1fr] gap-3">
                        <div className="space-y-2">
                            <Label>Tipe Link Order</Label>
                            <Select value={tipeLink} onValueChange={setTipeLink}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {TIPE_LINK_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Link / Username / Nomor</Label>
                            <Input
                                {...form.register('link_order')}
                                placeholder={
                                    tipeLink === 'instagram' ? '@hmffpmipaupi atau URL IG' :
                                        tipeLink === 'whatsapp' ? '628123456789' : 'https://...'
                                }
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                        <input type="checkbox" {...form.register('is_active')} className="w-4 h-4" id="fluks_active" />
                        <label htmlFor="fluks_active" className="text-sm font-medium cursor-pointer">Tampilkan di Halaman Publik</label>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Menyimpan...' : (initialData ? 'Simpan Perubahan' : 'Tambah Produk')}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

// ============================================================
// Config Editor — URL Formulir Pemesanan Global
// ============================================================
function FluksConfigEditor({ config, onSuccess }: { config: FluksConfig | null; onSuccess: () => void }) {
    const [isSaving, setIsSaving] = useState(false);
    const form = useForm({
        defaultValues: {
            form_order_url: config?.form_order_url || '',
            catatan: config?.catatan || '',
        },
    });

    const onSubmit = async (values: any) => {
        if (!config?.id) { toast.error('Config tidak ditemukan. Jalankan schema_fluks_v2.sql dulu.'); return; }
        setIsSaving(true);
        try {
            const fd = new FormData();
            fd.append('form_order_url', values.form_order_url);
            fd.append('catatan', values.catatan || '');
            const result = await updateFluksConfig(config.id, fd);
            if (result?.error) toast.error('Gagal menyimpan', { description: result.error });
            else { toast.success('URL Formulir berhasil diperbarui!'); onSuccess(); }
        } catch (e: any) {
            toast.error('Error', { description: e.message });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="mb-8 rounded-2xl border-2 border-orange-200 bg-orange-50/50 p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-xl">
                    <ClipboardList className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                    <h3 className="font-bold text-foreground">Formulir Pemesanan Global</h3>
                    <p className="text-xs text-muted-foreground">URL ini digunakan untuk tombol &quot;Pesan via Formulir&quot; di semua produk FLUKS.</p>
                </div>
                {config?.form_order_url && (
                    <a href={config.form_order_url} target="_blank" rel="noopener noreferrer"
                        className="ml-auto flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-800 font-semibold">
                        <ExternalLink className="w-3.5 h-3.5" /> Buka Form
                    </a>
                )}
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <div className="space-y-1.5">
                    <Label className="text-sm">URL Google Form / Link Order *</Label>
                    <Input
                        {...form.register('form_order_url')}
                        placeholder="https://docs.google.com/forms/..."
                        className="bg-white"
                    />
                </div>
                <div className="space-y-1.5">
                    <Label className="text-sm">Catatan untuk Pengunjung (opsional)</Label>
                    <Input
                        {...form.register('catatan')}
                        placeholder="Contoh: Order dibuka setiap Senin-Jumat, konfirmasi dalam 1x24 jam."
                        className="bg-white"
                    />
                </div>
                <Button type="submit" size="sm" disabled={isSaving} className="gap-2 bg-orange-500 hover:bg-orange-600 text-white">
                    <Save className="w-3.5 h-3.5" />
                    {isSaving ? 'Menyimpan...' : 'Simpan URL Form'}
                </Button>
            </form>
        </div>
    );
}

// ============================================================
// Main Admin Table
// ============================================================
export default function FluksTable({ initialData, config }: { initialData: FluksItem[]; config: FluksConfig | null }) {
    const [formOpen, setFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<FluksItem | null>(null);
    const router = useRouter();

    const handleAdd = () => { setEditingItem(null); setFormOpen(true); };
    const handleEdit = (item: FluksItem) => { setEditingItem(item); setFormOpen(true); };
    const handleSuccess = () => { setFormOpen(false); router.refresh(); };

    const handleDelete = async (id: string, nama: string) => {
        if (!confirm(`Hapus produk "${nama}"?`)) return;
        const result = await deleteFluksItem(id);
        if (result?.error) toast.error('Gagal menghapus', { description: result.error });
        else { toast.success('Produk dihapus'); router.refresh(); }
    };

    const STOK_STYLE: Record<string, string> = {
        tersedia: 'bg-green-100 text-green-700',
        terbatas: 'bg-amber-100 text-amber-700',
        habis: 'bg-red-100 text-red-600',
    };

    return (
        <div>
            {/* Editor URL Form Global */}
            <FluksConfigEditor config={config} onSuccess={() => router.refresh()} />
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Store className="w-5 h-5 text-orange-400" />
                        Manajemen Produk FLUKS
                    </h2>
                    <p className="text-sm text-muted-foreground mt-0.5">{initialData.length} produk tersimpan</p>
                </div>
                <Button onClick={handleAdd} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Tambah Produk
                </Button>
            </div>

            <div className="rounded-2xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-muted/50">
                            <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Produk</th>
                            <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">Kategori</th>
                            <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden sm:table-cell">Harga</th>
                            <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Stok</th>
                            <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden lg:table-cell">Badge</th>
                            <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {initialData.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-12 text-muted-foreground">
                                    Belum ada produk. Klik &quot;Tambah Produk&quot; untuk mulai.
                                </td>
                            </tr>
                        ) : (
                            initialData.map(item => (
                                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            {item.foto_url ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={item.foto_url} alt={item.nama} className="w-10 h-10 rounded-xl object-cover border border-border" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center border border-border">
                                                    <Tag className="w-4 h-4 text-muted-foreground" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-foreground line-clamp-1">{item.nama}</p>
                                                <p className="text-xs text-muted-foreground capitalize">{item.tipe_link}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell">
                                        <span className="text-xs px-2 py-1 bg-muted rounded-lg text-muted-foreground font-medium capitalize">{item.kategori}</span>
                                    </td>
                                    <td className="px-4 py-3 font-semibold hidden sm:table-cell">
                                        {item.harga === 0 ? <span className="text-green-500">Gratis</span> : `Rp ${item.harga.toLocaleString('id-ID')}`}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${STOK_STYLE[item.stok] || ''}`}>
                                            {item.stok}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 hidden lg:table-cell">
                                        {item.badge ? (
                                            <span className="text-xs font-bold px-2 py-0.5 bg-orange-100 text-orange-700 rounded">{item.badge}</span>
                                        ) : <span className="text-muted-foreground text-xs">—</span>}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button variant="ghost" size="sm" onClick={() => handleEdit(item)} className="h-8 w-8 p-0">
                                                <Pencil className="w-3.5 h-3.5" />
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id, item.nama)} className="h-8 w-8 p-0 text-destructive hover:text-destructive">
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

            {/* KEY fix: remount form saat item berbeda */}
            <FluksForm
                key={editingItem?.id ?? 'new-fluks-form'}
                isOpen={formOpen}
                setIsOpen={setFormOpen}
                initialData={editingItem}
                onSuccess={handleSuccess}
            />
        </div>
    );
}
