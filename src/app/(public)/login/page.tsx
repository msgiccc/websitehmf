import LoginForm from '@/components/public/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login Admin | HMF FPMIPA UPI',
};

export default function LoginPage() {
    return (
        <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 overflow-hidden pt-16">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#071324]/90 bg-gradient-to-t from-[#071324] via-[#0B1F3A]/80 to-[#1A2C4D]/80 mix-blend-multiply z-10"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/bg-hero.png" alt="Background Login" className="w-full h-full object-cover object-center" />

                {/* Glowing Accents */}
                <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-10"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none z-10"></div>
            </div>

            <div className="relative z-20 w-full mb-8 text-center animate-in fade-in slide-in-from-bottom-6 duration-700">
                <h1 className="font-serif text-white text-3xl md:text-5xl font-black tracking-tight drop-shadow-md">
                    Niskala Cakra
                </h1>
                <p className="text-[#C9A24D] font-bold tracking-widest text-xs md:text-sm uppercase mt-2 drop-shadow-sm">
                    Portal Akses Pengurus
                </p>
            </div>

            <div className="relative z-20 w-full animate-in fade-in slide-in-from-bottom-10 duration-700 delay-150">
                <LoginForm />
            </div>

            {/* Dekorasi Blob Merah di Bawah Form */}
            <div className="absolute top-1/2 left-1/2 w-full max-w-lg h-96 bg-[#E63946]/5 rounded-full blur-[100px] pointer-events-none z-10 -translate-x-1/2 -translate-y-1/2"></div>
        </main>
    );
}
