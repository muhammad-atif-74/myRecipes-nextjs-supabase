import Link from 'next/link'
import React from 'react'
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi'

const Footer = () => {
    const footerLinks = {
        product: [
            { name: "Recipe Search", href: "/recipes" },
            { name: "Meal Planning", href: "/meal-plans" },
            { name: "Nutrition Analysis", href: "/nutrition" },
            { name: "Calendar Integration", href: "/calendar" }
        ],
        company: [
            { name: "About Us", href: "/about" },
            { name: "Blog", href: "/blog" },
            { name: "Careers", href: "/careers" },
            { name: "Contact", href: "/contact" }
        ],
        support: [
            { name: "Help Center", href: "/help" },
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Cookie Policy", href: "/cookies" }
        ]
    }
    return (
        <footer className="bg-primary text-white">
            <div className="container max-w-7xl mx-auto px-4">
                {/* Main Footer Content */}
                <div className="py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {/* Logo and Description */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <h5 className='text-2xl md:text-3xl font-semibold'><span className='text-white'>My</span><span className='text-secondary'>Recipes</span></h5>
                            </div>
                            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                                Your intelligent kitchen companion that transforms the way you plan, cook, and enjoy meals every day.
                            </p>
                            <div className="flex items-center gap-4">
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition">
                                    <FiFacebook className="text-secondary" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition">
                                    <FiTwitter className="text-secondary"/>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition">
                                    <FiLinkedin className="text-secondary"/>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition">
                                    <FiInstagram className="text-secondary"/>
                                </a>
                            </div>
                        </div>

                        {/* Product Links */}
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Product</h4>
                            <ul className="space-y-3">
                                {footerLinks.product.map((link, i) => (
                                    <li key={i}>
                                        <Link href={link.href} className="text-gray-300 hover:text-secondary transition">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Company</h4>
                            <ul className="space-y-3">
                                {footerLinks.company.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-gray-300 hover:text-secondary transition">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support Links */}
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Support</h4>
                            <ul className="space-y-3">
                                {footerLinks.support.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-gray-300 hover:text-secondary transition">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-white/10 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-gray-300 text-sm">
                            © 2025 MyRecipes. All rights reserved.
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                            <Link href="/privacy" className="text-gray-300 hover:text-secondary transition">
                                Privacy
                            </Link>
                            <Link href="/terms" className="text-gray-300 hover:text-secondary transition">
                                Terms
                            </Link>
                            <Link href="/cookies" className="text-gray-300 hover:text-secondary transition">
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer