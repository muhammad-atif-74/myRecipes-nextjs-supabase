'use client'

import React, { useState } from 'react'
import { 
  FiHome, 
  FiPlus, 
  FiBook, 
  FiHeart, 
  FiSettings, 
  FiUser, 
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
  FiSearch
} from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'
import { FaSpoon } from 'react-icons/fa6'

const DashboardLayout = ({ children, activeTab = 'dashboard' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome, href: '/dashboard' },
    { id: 'add-recipe', label: 'Add Recipe', icon: FiPlus, href: '/dashboard/add-recipe' },
    { id: 'my-recipes', label: 'My Recipes', icon: FiBook, href: '/dashboard/my-recipes' },
    { id: 'favorites', label: 'Favorites', icon: FiHeart, href: '/dashboard/favorites' },
    { id: 'profile', label: 'Profile', icon: FiUser, href: '/dashboard/profile' },
    { id: 'settings', label: 'Settings', icon: FiSettings, href: '/dashboard/settings' },
  ]

  const handleLogout = () => {
    // Logout functionality will be implemented later
    console.log('Logout clicked')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <FaSpoon className="text-2xl text-secondary" />
            <span className="text-xl font-bold font-lora text-gray-800">RecipeApp</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <Image
                src="/api/placeholder/40/40"
                alt="Profile"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">John Doe</p>
              <p className="text-xs text-gray-500">Home Chef</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeTab === item.id
                  ? 'bg-secondary/10 text-secondary border-r-2 border-secondary'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
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
            {/* Search Bar */}
            <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
              <FiSearch className="text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search recipes..."
                className="bg-transparent outline-none text-sm w-48"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <FiBell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 cursor-pointer">
              <Image
                src="/api/placeholder/32/32"
                alt="Profile"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default DashboardLayout