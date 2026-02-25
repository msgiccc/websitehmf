import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Metadata } from 'next';

export const revalidate = 60;

// Dynamic Metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { data: artikel } = await supabase
        .from("Artikel")
        .select("judul, ringkasan, thumbnail")
        .eq("slug", params.slug)
        .single();

    if (!artikel) {
        return { title: 'Artikel Tidak Ditemukan - HMF FPMIPA UPI' };
    }

    return {
        title: `${artikel.judul} | Artikel HMF`,
        description: artikel.ringkasan,
        openGraph: {
            images: [artikel.thumbnail],
        },
    };
}

export default async function ArtikelDetailPage({ params }: { params: { slug: string } }) {
    const { data: artikel, error } = await supabase
        .from("Artikel")
        .select("*")
        .eq("slug", params.slug)
        .eq("status", "PUBLISHED")
        .single();

    if (error || !artikel) {
        notFound(); // Redirects to 404 page
    }

    return (
        <article className="min-h-screen bg-background pb-20">
            {/* Article Header / Hero Image */}
            <header className="relative w-full h-[40vh] md:h-[60vh] bg-muted flex items-end">
                <div className="absolute inset-0 z-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={artikel.thumbnail}
                        alt={artikel.judul}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>

                <div className="container relative z-10 px-4 md:px-6 pb-12 w-full max-w-4xl mx-auto">
                    <Link href="/artikel" className="inline-block mb-6">
                        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 hover:text-white -ml-3">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Artikel
                        </Button>
                    </Link>
                    <div className="flex items-center gap-4 text-white/80 text-sm font-medium mb-4">
                        <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                            <Calendar className="h-4 w-4" />
                            <span>{format(new Date(artikel.createdAt), 'dd MMMM yyyy', { locale: id })}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                            <User className="h-4 w-4" />
                            <span>Oleh {artikel.author}</span>
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                        {artikel.judul}
                    </h1>
                </div>
            </header>

            {/* Article Content */}
            <main className="container px-4 md:px-6 py-12 max-w-4xl mx-auto">
                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80">
                    {/* Note: since admin enters plain/rich text, we render it directly. For production, consider using a markdown parser or sanitizing HTML if admin uses WYSIWYG */}
                    <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed text-lg">
                        {artikel.konten}
                    </div>
                </div>
            </main>
        </article>
    );
}
