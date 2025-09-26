"use client"
import { supabase } from '@/app/lib/supabaseClient';
import { useAuthStore } from '@/app/store/useAuthStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const isActive = "bg-white text-primary px-4 rounded-full shadow-sm";
const isHovering = "hover:bg-gray-50 hover:text-primary px-4 rounded-full ";

const navLinks = [
    {
        id: 1,
        name: "Home",
        link: "/"
    },
    {
        id: 2,
        name: "Browse",
        link: "/browse"
    },
    {
        id: 3,
        name: "Features",
        link: "/features"
    },
]

const Navbar = () => {
    const pathName = usePathname();
    const user = useAuthStore(state => state.user)
    // console.log(user)

    const handleLogout = async () => {
        await supabase.auth.signOut();
    }

    return (
        <nav className='bg-transparent w-full py-4'>
            <div className="container">
                <div className="flex items-center justify-between">
                    <div className="logo">
                        <h5 className='text-2xl md:text-3xl font-semibold'><span className='text-primary'>My</span><span className='text-secondary'>Recipes</span></h5>
                    </div>
                    <div className="navigation hidden md:block">
                        <ul className="flex bg-gray-200 p-2 rounded-full">
                            {
                                navLinks.map((link) => (
                                    <Link href={link.link} key={link.id} className={`px-3 mx-2 cursor-pointer py-2 transition ${pathName === link.link && isActive} ${isHovering}`}>{link.name}</Link>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="register">
                        {
                            user ? (
                                <>
                                    <div className="flex items-center space-x-2" >
                                        <Link href="/dashboard">
                                            <button className='custom_button'>Dashboard</button>
                                        </Link>
                                        <button onClick={handleLogout} className='custom_button_outline_primary'>Logout</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link href={'/register'}>
                                        <button className='custom_button'>Register</button>
                                    </Link>
                                </>
                            )
                        }

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar