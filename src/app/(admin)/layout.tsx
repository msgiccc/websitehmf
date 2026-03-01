'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, FileText, Briefcase, Image as ImageIcon, LogOut, Shield } from "lucide-react";
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

    const navLinks = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/kabinet', label: 'Kabinet', icon: Shield },
        { href: '/admin/pengurus', label: 'Pengurus', icon: Users },
        { href: '/admin/artikel', label: 'Artikel', icon: FileText },
        { href: '/admin/bidang', label: 'Bidang & Lembaga', icon: Briefcase },
        { href: '/admin/galeri', label: 'Galeri', icon: ImageIcon },
    ];

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
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
                                <p className="text-xs text-muted-foreground">Administrator</p>
                            </div>
                        )}
                        <Button variant="outline" className="w-full gap-2" onClick={handleLogout}>
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
