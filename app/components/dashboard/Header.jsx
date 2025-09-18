"use client"
import { useAuthStore } from '@/app/store/useAuthStore';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiBell, FiMenu, FiSearch } from 'react-icons/fi';

const Header = ({ setSidebarOpen }) => {
    const pathname = usePathname();
    const activeTab = pathname?.split('/').pop() || 'dashboard';

    const user = useAuthStore(state => state.user)


    return (
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                    <FiMenu size={20} />
                </button>
                <h1 className="text-xl font-semibold text-gray-800 capitalize">
                    {activeTab.replace('-', ' ')}
                </h1>
            </div>

            <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                    <FiSearch className="text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search recipes..."
                        className="bg-transparent outline-none text-sm w-48"
                    />
                </div>

                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 cursor-pointer">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                        {
                            (user && user?.user_metadata.avatar_url) ?
                                <Image src={user && user?.user_metadata?.avatar_url} alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
                                : (
                                    <img src="/images/chef1.png" alt="" />
                                )
                        }
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
