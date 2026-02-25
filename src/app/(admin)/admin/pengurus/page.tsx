import { supabase } from "@/lib/supabase";
import PengurusTable from "@/components/admin/pengurus-table";

export const revalidate = 0; // Disable full caching for dashboard pages

export default async function AdminPengurusPage() {
    const { data: pengurus, error } = await supabase
        .from('Pengurus')
        .select('*')
        .order('createdAt', { ascending: false });

    return (
        <div className="space-y-6">
            <PengurusTable initialData={pengurus || []} />
        </div>
    );
}
