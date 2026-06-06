import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
    return redirect({
        to: '/admin/dashboard',
        search: {
            limit: '10',
            page: '1',
            search: '',
        }

    });
}
