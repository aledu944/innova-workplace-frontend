import { BookIcon, Certificate01Icon, Certificate02Icon, CertificateIcon, DashboardSquareIcon, IdentityCardIcon, Users } from "@hugeicons/core-free-icons";


export const SIDEBAR_MENU_OPTIONS = [
    {
        label: 'Dashboard',
        path: '/admin',
        icon: DashboardSquareIcon,
    },
    {
        label: 'Estudiantes',
        path: '/admin/students',
        icon: Certificate02Icon,
    },
    {
        label: 'Profesores',
        path: '/admin/teachers',
        icon: IdentityCardIcon,
    },
    {
        label: 'Cursos',
        path: '/admin/courses',
        icon: BookIcon,
    },
    {
        label: 'Inscripciones',
        path: '/admin/enrollments',
        icon: Certificate01Icon,
    },
    {
        label: 'Usuarios',
        path: '/admin/users',
        icon: Users,
    }

];