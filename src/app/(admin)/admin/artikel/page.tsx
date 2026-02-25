import { supabase } from "@/lib/supabase";
import ArtikelTable from "@/components/admin/artikel-table";

export const revalidate = 0;

export default async function AdminArtikelPage() {
    const { data: artikel } = await supabase
        .from('Artikel')
        .select('*')
        .order('createdAt', { ascending: false });

    return (
        <div className="space-y-6">
            <ArtikelTable initialData={artikel || []} />
        </div>
    );
}
