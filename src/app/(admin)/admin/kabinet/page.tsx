import { getKabinetAktif } from '@/lib/admin-actions';
import KabinetForm from '@/components/admin/kabinet-form';
import UnggulanTable from '@/components/admin/unggulan-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export const revalidate = 0;

export default async function AdminKabinetPage() {
    const kabinet = await getKabinetAktif();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Manajemen Kabinet</h1>
                <p className="text-muted-foreground">
                    Edit informasi kabinet aktif yang akan tampil di halaman publik.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <CardTitle>
                                {kabinet ? `Kabinet: ${kabinet.namaKabinet}` : 'Data Kabinet Belum Diisi'}
                            </CardTitle>
                            <CardDescription>
                                {kabinet
                                    ? `Periode ${kabinet.periode} — terakhir diubah. Isi form di bawah untuk memperbarui.`
                                    : 'Isi form berikut untuk menambahkan informasi kabinet aktif.'}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <KabinetForm initialData={kabinet ? JSON.parse(JSON.stringify(kabinet)) : undefined} />
                </CardContent>
            </Card>

            {kabinet && (
                <Card>
                    <CardHeader>
                        <CardTitle>Program Unggulan</CardTitle>
                        <CardDescription>
                            Daftar inovasi atau pergerakan masif unggulan dari Kabinet ini.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UnggulanTable
                            initialData={kabinet.ProgramUnggulan ? JSON.parse(JSON.stringify(kabinet.ProgramUnggulan)) : []}
                            kabinetId={kabinet.id}
                        />
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
