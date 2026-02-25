import { supabase } from "@/lib/supabase";
import ProkerTable from "@/components/admin/proker-table";

export const revalidate = 0;

export default async function AdminProkerPage() {
    const { data: proker } = await supabase
        .from('ProgramKerja')
        .select('*')
        .order('tanggalPelaksanaan', { ascending: false });

    return (
        <div className="space-y-6">
            <ProkerTable initialData={proker || []} />
        </div>
    );
}
