import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ 
    component: () => <></>, 
    beforeLoad: async () => {
        throw redirect({ to: '/auth/login' });
    }
});