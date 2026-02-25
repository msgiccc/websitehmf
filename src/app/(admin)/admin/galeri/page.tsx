import { supabase } from "@/lib/supabase";
import GaleriGrid from "@/components/admin/galeri-table";

export const revalidate = 0;

export default async function AdminGaleriPage() {
    const { data: galeri } = await supabase
        .from('Galeri')
        .select('*')
        .order('createdAt', { ascending: false });

    return (
        <div className="space-y-6">
            <GaleriGrid initialData={galeri || []} />
        </div>
    );
}
