import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const revalidate = 60;

export default async function ProgramKerjaPage() {
    let prokerList: any[] = [];

    try {
        const { data, error } = await supabase
            .from("ProgramKerja")
            .select("*")
            .order("tanggalPelaksanaan", { ascending: true });

        if (!error && data) {
            prokerList = data;
        }
    } catch (e) {
        console.error("Gagal load program kerja:", e);
    }

    const activeProkers = prokerList.filter(p => p.status === 'ONGOING' || p.status === 'PLANNING');
    const completedProkers = prokerList.filter(p => p.status === 'COMPLETED');

    const RenderTimeline = ({ title, items }: { title: string, items: any[] }) => (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold border-b pb-2">{title}</h2>
            {items.length === 0 ? (
                <p className="text-muted-foreground italic">Tidak ada program di kategori ini.</p>
            ) : (
                <div className="relative border-l-2 border-muted ml-3 space-y-10">
                    {items.map((proker, i) => (
                        <div key={proker.id} className="relative pl-8">
                            {/* Timeline Dot */}
                            <div className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-background 
                ${proker.status === 'COMPLETED' ? 'bg-green-500' :
                                    proker.status === 'ONGOING' ? 'bg-blue-500 animate-pulse' : 'bg-amber-500'}`}
                            />

                            <Card className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3 border-b bg-muted/20">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <CardTitle className="text-xl mb-1">{proker.nama}</CardTitle>
                                            <div className="flex items-center text-sm text-muted-foreground gap-1.5">
                                                <Calendar className="h-4 w-4" />
                                                <span>{format(new Date(proker.tanggalPelaksanaan), 'dd MMMM yyyy', { locale: id })}</span>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase shrink-0 w-fit
                        ${proker.status === 'COMPLETED' ? 'bg-green-100 text-green-700 border border-green-200' :
                                                proker.status === 'ONGOING' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                                            {proker.status}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <p className="text-muted-foreground leading-relaxed">{proker.deskripsi}</p>
                                </CardContent>
                                <CardFooter className="bg-muted/10 border-t py-3 px-6 text-sm font-medium text-primary flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Penanggung Jawab: {proker.penanggungJawab}
                                </CardFooter>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="container py-12 md:py-20 px-4 md:px-6 mx-auto max-w-5xl">
            <div className="text-center space-y-4 mb-16">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-primary">Agenda Program Kerja</h1>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                    Lihat seluruh lini masa acara dan program kerja yang dicanangkan HMF FPMIPA UPI.
                </p>
            </div>

            <div className="space-y-16">
                <RenderTimeline title="Program Aktif & Mendatang" items={activeProkers} />
                <RenderTimeline title="Program Selesai" items={completedProkers} />
            </div>
        </div>
    );
}
