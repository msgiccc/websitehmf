import { getProfilAktif } from "@/lib/data";
import ProfilForm from "@/components/admin/profil-form";

export const dynamic = 'force-dynamic';

export default async function AdminProfilPage() {
    const data = await getProfilAktif();

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Profil Himpunan</h1>
                <p className="text-muted-foreground">
                    Kelola informasi sejarah, penjelasan lambang, hingga teks mars dan hymne.
                </p>
            </div>

            <ProfilForm initialData={data} />
        </div>
    );
}
