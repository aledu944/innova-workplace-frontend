import { Link } from '@tanstack/react-router'
import { SIDEBAR_MENU_OPTIONS } from '../constants';
import { HugeiconsIcon } from '@hugeicons/react';
import Logo from "@/assets/images/logo.png";

export const Sidebar = () => {
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
        </aside>
    )
}
