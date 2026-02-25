import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const lora = Lora({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Himpunan Mahasiswa FPMIPA UPI',
  description: 'Website Resmi Himpunan Mahasiswa FPMIPA UPI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${lora.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
