'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        try {
            const result = await signIn('credentials', {
                username,
                password,
                redirect: false, // Tangani redirect manual agar bisa handle error
            });

            if (result?.error) {
                setError('Username atau password salah.');
            } else if (result?.ok) {
                // Login berhasil — hard redirect untuk memastikan Vercel Edge Server membaca Cookie Authentication
                window.location.href = '/admin';
            } else {
                setError('Terjadi kesalahan tidak terduga. Coba lagi.');
            }
        } catch (err) {
            setError('Gagal terhubung ke server. Coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-sm mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.5)] bg-[#1a0b40]/80 backdrop-blur-xl border-white/10 text-white overflow-hidden relative">
            {/* Ambient Lighting di dalam Card */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E63946]/20 rounded-full blur-[40px] pointer-events-none"></div>

            <CardHeader className="space-y-1 relative z-10">
                <CardTitle className="text-2xl font-bold text-center font-serif text-white">Login Admin</CardTitle>
                <CardDescription className="text-center text-gray-400">
                    Masukkan username dan password admin Anda
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2 relative z-10">
                        <Label htmlFor="username" className="text-gray-300">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="admin"
                            required
                            disabled={isLoading}
                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus-visible:ring-[#E63946]"
                        />
                    </div>
                    <div className="space-y-2 relative z-10">
                        <Label htmlFor="password" className="text-gray-300">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            minLength={6}
                            disabled={isLoading}
                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus-visible:ring-[#E63946]"
                        />
                    </div>

                    <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                        {error && (
                            <>
                                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                                <p className="text-sm text-red-500">{error}</p>
                            </>
                        )}
                    </div>

                    <Button type="submit" className="w-full bg-[#E63946] hover:bg-[#c92020] text-white shadow-[0_0_15px_rgba(230,57,70,0.4)] border-none font-bold" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Memproses...
                            </>
                        ) : 'Login Perangkat'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
