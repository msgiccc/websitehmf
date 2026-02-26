import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const revalidate = 60;

export default async function GaleriPage() {
    let galeriData: any[] = [];

    try {
        const { data: pictures, error } = await supabase
            .from("Galeri")
            .select("*")
            .order("createdAt", { ascending: false });

        if (!error && pictures) {
            galeriData = pictures;
        }
    } catch (e) {
        console.error("Gagal load galeri:", e);
    }

    return (
        <div className="container py-12 md:py-20 px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-primary">Galeri Dokumentasi</h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                    Kumpulan momen, apresiasi, dan memori perjalanan organisasi HMF FPMIPA UPI.
                </p>
            </div>

            {galeriData.length === 0 ? (
                <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
                    <h2 className="text-xl font-medium text-muted-foreground">Galeri masih kosong.</h2>
                </div>
            ) : (
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                    {galeriData.map((pic) => (
                        <Card key={pic.id} className="break-inside-avoid overflow-hidden group border-none bg-muted/20 hover:shadow-xl transition-shadow relative">
                            <div className="relative overflow-hidden cursor-pointer">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={pic.imageUrl}
                                    alt={pic.judul}
                                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <span className={`inline-block px-2 py-1 mb-2 rounded-md text-[10px] font-bold uppercase tracking-wider
                    ${pic.kategori === 'PRESTASI' ? 'bg-amber-500 text-black' : 'bg-primary text-primary-foreground'}`}>
                                        {pic.kategori}
                                    </span>
                                    <h3 className="text-white font-medium text-lg leading-tight mb-1">{pic.judul}</h3>
                                    <p className="text-white/70 text-xs">
                                        {format(new Date(pic.createdAt), 'dd MMMM yyyy', { locale: id })}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
