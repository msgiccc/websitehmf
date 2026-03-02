'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, FileText, Briefcase, Image as ImageIcon, LogOut, Shield, Home } from "lucide-react";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.replace('/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div className="min-h-screen flex items-center justify-center bg-muted/40 text-muted-foreground">Memuat sesi admin...</div>;
    }

    if (status === 'unauthenticated') {
        return null; // Akan diredirect oleh useEffect
    }

    const isAdmin = (session?.user as any)?.username === 'admin';

    const navLinks = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, adminOnly: false },
        { href: '/admin/kabinet', label: 'Kabinet', icon: Shield, adminOnly: true },
        { href: '/admin/pengurus', label: 'Pengurus', icon: Users, adminOnly: true },
        { href: '/admin/artikel', label: 'Artikel', icon: FileText, adminOnly: true },
        { href: '/admin/bidang', label: 'Bidang & Lembaga', icon: Briefcase, adminOnly: false },
        { href: '/admin/galeri', label: 'Galeri', icon: ImageIcon, adminOnly: true },
        { href: '/admin/shortlink', label: 'Link Shortener', icon: Shield, adminOnly: false },
    ];

    const filteredLinks = isAdmin ? navLinks : navLinks.filter(l => !l.adminOnly);

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/login' });
    };

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
                            {filteredLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                                >
                                    <link.icon className="h-4 w-4" />
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="p-4 border-t space-y-3">
                        {session?.user?.name && (
                            <div className="px-3 py-2">
                                <p className="font-medium text-sm text-foreground">{session.user.name}</p>
                                <p className="text-xs text-muted-foreground capitalize">{isAdmin ? 'Administrator' : 'Pengurus Bidang'}</p>
                            </div>
                        )}
                        <Button variant="outline" className="w-full justify-start gap-2" asChild>
                            <Link href="/">
                                <Home className="h-4 w-4" />
                                Kembali ke Website
                            </Link>
                        </Button>
                        <Button variant="destructive" className="w-full justify-start gap-2" onClick={handleLogout}>
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
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
                    {session?.user?.name && (
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

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </SessionProvider>
    );
}
