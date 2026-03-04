'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, ExternalLink, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteShortLink } from '@/lib/admin-actions';
import { toast } from 'sonner';
import ShortLinkForm from './shortlink-form';

export default function ShortLinkTable({ initialData }: { initialData: any[] }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const handleAdd = () => {
        setSelectedItem(null);
        setIsFormOpen(true);
    };

    const handleEdit = (item: any) => {
        setSelectedItem(item);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Yakin ingin menghapus tautan pendek ini? Tautan tidak bisa dikembalikan.')) {
            try {
                const res = await deleteShortLink(id);
                if (res.success) toast.success(res.message);
                else toast.error(res.message);
            } catch (e: any) {
                toast.error('Gagal menghapus tautan pendek', { description: e.message });
            }
        }
    };

    const handleCopy = (slug: string) => {
        const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/${slug}`;
        navigator.clipboard.writeText(url);
        toast.success('URL berhasil disalin ke clipboard');
    };

    const getOrigin = () => typeof window !== 'undefined' ? window.location.origin : '';

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h3 className="text-xl font-bold">Daftar LASER</h3>
                    <p className="text-sm text-muted-foreground mt-1">Kelola URL/tautan pendek untuk keperluan publikasi dan pendaftaran.</p>
                </div>
                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4" /> Buat Tautan Baru
                </Button>
            </div>

            <div className="border border-border/50 rounded-xl overflow-hidden bg-background">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border/50">
                            <tr>
                                <th className="px-4 py-3 whitespace-nowrap">Kata Kunci (Slug)</th>
                                <th className="px-4 py-3">URL Asli (Tujuan)</th>
                                <th className="px-4 py-3 text-center whitespace-nowrap">Klik</th>
                                <th className="px-4 py-3 text-center whitespace-nowrap">Status Publik</th>
                                <th className="px-4 py-3 text-right whitespace-nowrap">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {initialData.length > 0 ? (
                                initialData.map((item) => (
                                    <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-3 font-medium whitespace-nowrap font-mono text-primary flex items-center gap-2">
                                            /{item.slug}
                                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-muted text-muted-foreground transition-transform hover:scale-105" onClick={() => handleCopy(item.slug)} title="Salin URL">
                                                <Copy className="h-3 w-3" />
                                            </Button>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-muted-foreground max-w-[200px] md:max-w-xs xl:max-w-md truncate">
                                            <a href={item.url_asli} target="_blank" rel="noreferrer" className="hover:text-primary hover:underline inline-flex items-center gap-1 group">
                                                {item.url_asli}
                                                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        </td>
                                        <td className="px-4 py-3 text-center font-semibold text-foreground">
                                            {item.jumlah_klik.toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${item.isPublic ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {item.isPublic ? 'Publik' : 'Private'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => handleEdit(item)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center">
                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                            <ExternalLink className="w-10 h-10 mb-3 text-muted-foreground/50" />
                                            <p>Belum ada tautan pendek yang dibuat.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isFormOpen && (
                <ShortLinkForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} initialData={selectedItem} />
            )}
        </div>
    );
}
