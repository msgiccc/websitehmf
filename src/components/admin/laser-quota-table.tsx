'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { updateUserQuota } from '@/lib/admin-actions';
import { Edit, Save, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function LaserQuotaTable({ initialData }: { initialData: any[] }) {
    const [users, setUsers] = useState(initialData);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<number>(0);
    const [isSaving, setIsSaving] = useState(false);

    const handleEdit = (user: any) => {
        setEditingId(user.id);
        setEditValue(user.shortlink_quota || 0);
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    const handleSave = async (userId: string) => {
        setIsSaving(true);
        try {
            const res = await updateUserQuota(userId, editValue);
            if (res.success) {
                toast.success(res.message);
                setUsers(users.map(u => u.id === userId ? { ...u, shortlink_quota: editValue } : u));
                setEditingId(null);
            } else {
                toast.error(res.message);
            }
        } catch (e: any) {
            toast.error('Gagal memperbarui kuota', { description: e.message });
        } finally {
            setIsSaving(false);
        }
    };

    // Filter out administrator if we only want to show 'Bidang' users
    const filteredUsers = users.filter((u: any) => u.username !== 'admin');

    return (
        <div className="space-y-4">
            <div className="border border-border/50 rounded-xl overflow-hidden bg-background">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border/50">
                            <tr>
                                <th className="px-4 py-3">Nama Akun (Bidang)</th>
                                <th className="px-4 py-3">Username</th>
                                <th className="px-4 py-3 text-center">Kuota LASER</th>
                                <th className="px-4 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((item: any) => (
                                    <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-3 font-medium text-foreground">
                                            {item.name}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                                            @{item.username}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {editingId === item.id ? (
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(parseInt(e.target.value) || 0)}
                                                    className="w-20 text-center mx-auto h-8"
                                                />
                                            ) : (
                                                <span className="font-bold text-lg">{item.shortlink_quota ?? 5}</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-1">
                                                {editingId === item.id ? (
                                                    <>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" onClick={() => handleSave(item.id)} disabled={isSaving}>
                                                            <Save className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:bg-neutral-100" onClick={handleCancel} disabled={isSaving}>
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => handleEdit(item)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-10 text-center text-muted-foreground">
                                        Belum ada data akun bidang.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
