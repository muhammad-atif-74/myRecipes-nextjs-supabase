"use client"
import { usePathname } from 'next/navigation';
import React from 'react'

const isActive = "bg-white text-primary px-4 rounded-full hover:text-white shadow-sm";
const isHovering = "hover:bg-gray-50 hover:text-primary px-4 rounded-full ";

const navLinks = [
    {
        id: 1,
        name: "Home",
        link: "/"
    },
    {
        id: 2,
        name: "About",
        link: "/about"
    },
    {
        id: 3,
        name: "Features",
        link: "/features"
    },
]

const Navbar = () => {
    const pathName = usePathname();
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
                                    <li key={link.id} className={`px-3 mx-2 cursor-pointer py-2 transition ${pathName === link.link && isActive} ${isHovering}`}>{link.name}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="register">
                        <button className='custom_button'>Register</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar