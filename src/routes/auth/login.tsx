import { LoginForm } from '@/features/auth/components/login-form';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { getSession } from '@/features/auth/server/get-session.server';

export const Route = createFileRoute('/auth/login')({
    beforeLoad: async () => {
        try {
            await getSession();
        } catch {
            return;
        }
        throw redirect({ to: '/admin/dashboard', search: { page: 1, limit: 10, search: '' } });
    },
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    Innova Code Workplace
                </a>
                <LoginForm />
            </div>
        </div>
    );
}
