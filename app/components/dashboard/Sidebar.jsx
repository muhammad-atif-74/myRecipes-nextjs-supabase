"use client"
import { useAuthStore } from '@/app/store/useAuthStore';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaSpoon } from 'react-icons/fa6';
import { FiBook, FiHeart, FiHome, FiLogOut, FiPlus, FiSettings, FiUser, FiX } from 'react-icons/fi';

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = useAuthStore(state => state.user)
    const pathname = usePathname();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: FiHome, href: '/dashboard' },
        { id: 'add-recipe', label: 'Add Recipe', icon: FiPlus, href: '/dashboard/add-recipe' },
        { id: 'my-recipes', label: 'My Recipes', icon: FiBook, href: '/dashboard/my-recipes' },
        { id: 'favorites', label: 'Favorites', icon: FiHeart, href: '/dashboard/favorites' },
        { id: 'profile', label: 'Profile', icon: FiUser, href: '/dashboard/profile' },
        { id: 'settings', label: 'Settings', icon: FiSettings, href: '/dashboard/settings' },
    ];

    const handleLogout = () => {
        console.log('Logout clicked');
    };

    return (
        <>
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
                    <Link href={'/'} className="flex items-center space-x-2">
                        {/* <FaSpoon className="text-2xl text-primary" /> */}
                        <span className="text-xl font-bold font-lora text-gray-800"><span className='text-primary'>My</span><span className='text-secondary'>Recipes</span></span>
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
                        <FiX size={20} />
                    </button>
                </div>

                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                            {
                                user ?
                                    <Image src={user && user?.user_metadata?.avatar_url} alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
                                    : (
                                        <img src="/images/chef1.png" alt="" />
                                    )
                            }
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{user && user?.user_metadata?.full_name}</p>
                            <p className="text-xs text-gray-500">{user && user?.user_metadata?.email_verified ? 'Verified' : 'Non verified'}</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {menuItems.map(item => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                ${pathname === item.href ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                        <FiLogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
