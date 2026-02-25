import LoginForm from '@/components/public/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login Admin | HMF FPMIPA UPI',
};

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center min-h-[calc(100vh-140px)] p-4">
            <LoginForm />
        </main>
    );
}
