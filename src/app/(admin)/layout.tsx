import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, FileText, Briefcase, Image as ImageIcon, LogOut, Shield } from "lucide-react";
import { signOut, auth } from "@/auth";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            {/* Sidebar Desktop */}
            <div className="hidden border-r bg-muted/40 lg:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                        <Link href="/admin" className="flex items-center gap-2 font-semibold">
                            <Shield className="h-5 w-5 text-primary" />
                            <span>CMS Admin HMF</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link href="/admin/kabinet" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                <Shield className="h-4 w-4" />
                                Kabinet
                            </Link>
                            <Link href="/admin/pengurus" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                <Users className="h-4 w-4" />
                                Pengurus
                            </Link>
                            <Link href="/admin/artikel" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                <FileText className="h-4 w-4" />
                                Artikel
                            </Link>
                            <Link href="/admin/proker" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                <Briefcase className="h-4 w-4" />
                                Program Kerja
                            </Link>
                            <Link href="/admin/galeri" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                <ImageIcon className="h-4 w-4" />
                                Galeri
                            </Link>
                        </nav>
                    </div>
                    <div className="p-4 border-t space-y-3">
                        {session?.user && (
                            <div className="px-3 py-2 text-xs text-muted-foreground">
                                <p className="font-medium text-foreground">{session.user.name}</p>
                                <p className="text-xs text-muted-foreground">Administrator</p>
                            </div>
                        )}
                        <form
                            action={async () => {
                                'use server';
                                await signOut({ redirectTo: '/login' });
                            }}
                        >
                            <Button variant="outline" className="w-full gap-2" type="submit">
                                <LogOut className="h-4 w-4" />
                                Logout
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6 justify-between">
                    <div className="lg:hidden font-semibold flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        CMS Admin HMF
                    </div>
                    {session?.user && (
                        <div className="ml-auto flex items-center gap-3">
                            <span className="text-sm text-muted-foreground hidden lg:block">
                                Selamat datang, <span className="font-semibold text-foreground">{session.user.name}</span>
                            </span>
                        </div>
                    )}
                </header>
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
