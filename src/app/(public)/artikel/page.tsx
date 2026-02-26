import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { DUMMY_ARTIKEL } from "@/lib/dummy-data";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const revalidate = 60;

export default async function ArtikelPage() {
    let publishedArticles = DUMMY_ARTIKEL;

    try {
        const { data: articles, error } = await supabase
            .from("Artikel")
            .select("*")
            .eq("status", "PUBLISHED")
            .order("createdAt", { ascending: false });

        if (!error && articles && articles.length > 0) {
            publishedArticles = articles;
        }
    } catch (e) {
        console.error("Gagal load artikel:", e);
    }

    return (
        <div className="container py-12 md:py-20 px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-primary">Kumpulan Artikel</h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                    Wawasan, liputan acara, dan opini dari mahasiswa FPMIPA UPI.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {publishedArticles.map((artikel) => (
                    <Card key={artikel.id} className="overflow-hidden flex flex-col h-full group hover:shadow-lg transition-all border-none bg-muted/10">
                        <div className="aspect-[4/3] w-full overflow-hidden bg-muted relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={artikel.thumbnail}
                                alt={artikel.judul}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <CardHeader className="flex-1">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 font-medium">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>{format(new Date(artikel.createdAt), 'dd MMM yyyy', { locale: id })}</span>
                                </div>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                    <User className="h-3.5 w-3.5" />
                                    <span className="truncate max-w-[100px]">{artikel.author}</span>
                                </div>
                            </div>
                            <CardTitle className="line-clamp-2 leading-snug group-hover:text-primary transition-colors">{artikel.judul}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground line-clamp-3 text-sm">{artikel.ringkasan}</p>
                        </CardContent>
                        <div className="p-6 pt-0 mt-auto border-t">
                            <Link href={`/artikel/${artikel.slug}`} className="block mt-4">
                                <Button variant="ghost" className="w-full justify-between hover:bg-primary hover:text-primary-foreground transition-all">
                                    Baca Selengkapnya <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </Card>
                ))}

                {publishedArticles.length === 0 && (
                    <div className="col-span-full text-center py-20 text-muted-foreground">
                        <h3 className="text-xl font-medium mb-2">Belum ada artikel</h3>
                        <p>Admin belum mempublikasikan artikel apapun saat ini.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
