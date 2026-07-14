import { Link } from '@tanstack/react-router'
import { Logout03Icon } from '@hugeicons/core-free-icons';
import { SIDEBAR_MENU_OPTIONS } from '../constants';
import { HugeiconsIcon } from '@hugeicons/react';
import Logo from "@/assets/images/logo.png";
import { useLogout } from '@/features/auth/hooks/use-logout';

export const Sidebar = () => {

    const { logout, isLoggingOut } = useLogout();

    return (
        <aside className='sidebar'>
            <div className='pt-12 pb-6'>
                <img src={Logo} alt="Logo" className='max-w-25 mx-auto' />
            </div>
            <nav>
                <ul className='px-4 space-y-4'>
                    {
                        SIDEBAR_MENU_OPTIONS.map((option) => (
                            <li key={option.path}>
                                <Link
                                    to={option.path}
                                    className='sidebar__menu--item'
                                    preload={false}
                                    activeProps={{
                                        className: 'sidebar__menu--item--active',
                                    }}
                                >
                                    <HugeiconsIcon
                                        icon={option.icon}
                                        size={24}
                                    />
                                    {option.label}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            <div className="sidebar__footer">
                <button
                    type="button"
                    onClick={() => logout({})}
                    disabled={isLoggingOut}
                    className="sidebar__menu--item sidebar__menu--item--logout"
                >
                    <HugeiconsIcon icon={Logout03Icon} size={24} />
                    {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
                </button>
            </div>
        </aside>
    )
}
