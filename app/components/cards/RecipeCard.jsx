'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaRegBookmark } from "react-icons/fa6";

const RecipeCard = ({
    recipe = {
        id: 1,
        title: "Chicken Tikka Masala",
        image: "/images/recipe3.jpg",
        ingredients: ["Chicken", "Yogurt", "Tomatoes", "Onions", "Garlic", "Ginger", "Spices"],
        cookingTime: 45,
        rating: 4.8,
        viewCount: 2840,
        chef: {
            name: "Sarah Johnson",
            avatar: "/images/chef1.png",
            verified: true
        }
    }
}) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(false)

    // Format view count
    const formatViewCount = (count) => {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M`
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K`
        }
        return count.toString()
    }

    // Generate star rating
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

        return (
            <div className="flex items-center gap-0.5">
                {/* Full stars */}
                {[...Array(fullStars)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                ))}
                {/* Half star */}
                {hasHalfStar && (
                    <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20">
                        <defs>
                            <linearGradient id="half-fill">
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                        <path fill="url(#half-fill)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        <path fill="none" stroke="currentColor" strokeWidth="1" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                )}
                {/* Empty stars */}
                {[...Array(emptyStars)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                ))}
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-primary/20">
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gray-200 animate-pulse ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                </div>

                {!imageError ? (
                    <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        className={`object-cover group-hover:scale-105 transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}

                {/* Favorite Button */}
                <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group/fav">
                    <svg className="w-5 h-5 text-gray-600 group-hover/fav:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>

                {/* Cooking Time Badge */}
                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                    <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {recipe.cookingTime} min
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
                {/* Title */}
                <Link href={`/recipe/${recipe.id}`} className="block mb-3 group/title">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover/title:text-primary transition-colors duration-200">
                        {recipe.title}
                    </h3>
                </Link>

                {/* Ingredients Pills */}
                <div className="mb-4 min-h-[70px]">
                    <div className="flex flex-wrap gap-2">
                        {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                            <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                            >
                                {ingredient}
                            </span>
                        ))}
                        {recipe.ingredients.length > 3 && (
                            <span className="bg-secondary/20 text-primary px-3 py-1.5 rounded-full text-sm font-semibold">
                                +{recipe.ingredients.length - 3}
                            </span>
                        )}
                    </div>
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between mb-4 text-sm">
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        {renderStars(recipe.rating)}
                        <span className="font-semibold text-gray-900">{recipe.rating}</span>
                        <span className="text-gray-500">({formatViewCount(recipe.viewCount)})</span>
                    </div>

                    {/* View Count */}
                    <div className="flex items-center gap-1.5 text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {formatViewCount(recipe.viewCount)} views
                    </div>
                </div>

                {/* Chef Profile */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <Link href={`/chef/${recipe.chef.name.toLowerCase().replace(' ', '-')}`} className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors group/chef">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                {recipe.chef.avatar && !imageError ? (
                                    <Image
                                        src={recipe.chef.avatar}
                                        alt={recipe.chef.name}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                        <span className="text-primary font-semibold text-sm">
                                            {recipe.chef.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                )}
                            </div>
                            {recipe.chef.verified && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-semibold text-gray-900 group-hover/chef:text-primary transition-colors">
                                    {recipe.chef.name}
                                </span>
                            </div>
                            <span className="text-xs text-gray-500">Chef</span>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default RecipeCard