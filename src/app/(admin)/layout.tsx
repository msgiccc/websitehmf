'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, FileText, Briefcase, Image as ImageIcon, LogOut, Shield, Home, Target, BookOpen } from "lucide-react";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import ChangePasswordDialog from "@/components/admin/change-password-dialog";

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
        { href: '/admin/profil', label: 'Profil Himpunan', icon: FileText, adminOnly: true },
        { href: '/admin/kabinet', label: 'Kabinet', icon: Shield, adminOnly: true },
        { href: '/admin/pengurus', label: 'Pengurus', icon: Users, adminOnly: true },
        { href: '/admin/artikel', label: 'Artikel', icon: FileText, adminOnly: true },
        { href: '/admin/bidang', label: 'Bidang & Lembaga', icon: Briefcase, adminOnly: false },
        { href: '/admin/galeri', label: 'Galeri', icon: ImageIcon, adminOnly: true },
        { href: '/admin/kurikulum', label: 'Kurikulum Matkul', icon: FileText, adminOnly: true },
        { href: '/admin/bearr', label: 'BEARR', icon: BookOpen, adminOnly: false },
        { href: '/admin/shortlink', label: 'LASER', icon: Shield, adminOnly: false },
    ];

    const filteredLinks = isAdmin ? navLinks : navLinks.filter(l => !l.adminOnly);

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/' });
    };

    return (
        <div className="flex min-h-screen w-full bg-[#f4f1ec]/30">
            {/* Sidebar Desktop - Creative Glassmorphism */}
            <div className="hidden lg:block w-[280px] shrink-0 p-4 relative z-20">
                <div className="flex h-full max-h-[calc(100vh-32px)] flex-col gap-2 bg-[#0B1F3A]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden relative">
                    {/* Decorative Blobs di Belakang */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#E63946]/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#c9a24d]/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="flex h-[80px] items-center border-b border-white/10 px-6 relative z-10">
                        <Link href="/admin" className="flex items-center gap-3 font-bold text-white group">
                            <div className="p-2 bg-gradient-to-tr from-[#E63946] to-[#c9a24d] rounded-xl group-hover:scale-105 transition-transform shadow-lg shadow-[#E63946]/20">
                                <Shield className="h-5 w-5 text-white" />
                            </div>
                            <span className="tracking-wide text-lg text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Niskala Dasbor</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto py-4 scrollbar-hide relative z-10 px-3">
                        <nav className="grid items-start gap-1 text-sm font-medium">
                            {filteredLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-300 transition-all hover:text-white hover:bg-white/10 hover:shadow-sm"
                                >
                                    <link.icon className="h-4 w-4 opacity-80" />
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="p-4 border-t border-white/10 space-y-3 relative z-10 bg-black/10">
                        {session?.user?.name && (
                            <div className="px-2 py-1 mb-2">
                                <p className="font-bold text-sm text-white">{session.user.name}</p>
                                <p className="text-xs text-[#c9a24d] font-medium capitalize">{isAdmin ? 'Administrator' : 'Pengurus Bidang'}</p>
                            </div>
                        )}
                        <ChangePasswordDialog />
                        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white transition-colors" asChild>
                            <Link href="/">
                                <Home className="h-4 w-4 opacity-80" />
                                Kembali ke Website
                            </Link>
                        </Button>
                        <Button variant="destructive" className="w-full justify-start gap-2 bg-[#E63946]/20 border border-[#E63946]/50 text-[#E63946] hover:bg-[#E63946] hover:text-white transition-colors" onClick={handleLogout}>
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 w-full relative z-10 overflow-hidden lg:pl-0">
                <header className="flex h-16 lg:h-20 lg:mt-4 lg:mr-4 items-center gap-4 lg:rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl px-6 justify-between shadow-sm sticky top-0 lg:top-4 z-30">
                    <div className="lg:hidden font-bold flex items-center gap-2 text-[#0B1F3A]">
                        <Shield className="h-5 w-5 text-[#E63946]" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0B1F3A] to-[#2c1469]">Niskala Dasbor</span>
                    </div>
                    {session?.user?.name && (
                        <div className="ml-auto flex items-center gap-3">
                            <span className="text-sm text-gray-600 hidden lg:flex items-center gap-2 bg-white/80 px-4 py-1.5 rounded-full shadow-sm border border-gray-100">
                                Selamat datang, <span className="font-bold text-[#0B1F3A]">{session.user.name}</span>
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            </span>
                        </div>
                    )}
                </header>
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:px-8 lg:py-6 h-[calc(100vh-64px)] lg:h-[calc(100vh-96px)] scrollbar-hide">
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
