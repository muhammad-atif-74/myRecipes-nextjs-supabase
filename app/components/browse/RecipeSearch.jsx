'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const RecipeSearch = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    // State management
    const [searchQuery, setSearchQuery] = useState('')
    const [searchType, setSearchType] = useState('name') // 'name' or 'ingredients'
    const [isSearchFocused, setIsSearchFocused] = useState(false)

    // Initialize from URL params
    useEffect(() => {
        const query = searchParams.get('q') || ''
        const type = searchParams.get('type') || 'name'
        setSearchQuery(query)
        setSearchType(type)
    }, [searchParams])

    // Suggestion pills
    const suggestions = {
        name: [
            'Chocolate Chip Cookies',
            'Chicken Tikka Masala',
            'Spaghetti Carbonara',
            'Beef Tacos',
            'Caesar Salad',
            'Banana Bread',
            'Thai Green Curry',
            'Margherita Pizza'
        ],
        ingredients: [
            'Chicken, Rice, Garlic',
            'Tomatoes, Basil, Mozzarella',
            'Eggs, Flour, Butter',
            'Salmon, Lemon, Herbs',
            'Avocado, Lime, Cilantro',
            'Beef, Onions, Bell Peppers',
            'Coconut Milk, Curry, Vegetables',
            'Pasta, Parmesan, Cream'
        ]
    }

    // Handle search submission
    const handleSearch = (query = searchQuery) => {
        if (!query.trim()) return

        const params = new URLSearchParams()
        params.set('q', query.trim())
        params.set('type', searchType)

        router.push(`/browse-recipes?${params.toString()}`)
    }

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion)
        handleSearch(suggestion)
    }

    // Handle search type change
    const handleSearchTypeChange = (type) => {
        setSearchType(type)
        if (searchQuery) {
            const params = new URLSearchParams()
            params.set('q', searchQuery)
            params.set('type', type)
            router.push(`/browse-recipes?${params.toString()}`)
        }
    }

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        handleSearch()
    }

    // Handle Enter key
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <section className="relative  py-8 overflow-hidden">

            <div className="container max-w-4xl mx-auto px-4 relative z-10">
                {/* Hero Content */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-300 mb-6 leading-tight">
                        Discover Your Next
                        <span className="text-primary"> Favorite Recipe</span>
                    </h1>
                    <p className="text-xl md:text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Search through thousands of delicious recipes by ingredients you have or by name. Your perfect meal is just a search away.
                    </p>
                </div>

                {/* Advanced Search Bar */}
                <div className="mb-8">
                    <div className={`bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 ${isSearchFocused ? 'border-primary shadow-2xl' : 'border-gray-200'
                        }`}>
                        {/* Search Type Toggle */}
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => handleSearchTypeChange('name')}
                                className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 ${searchType === 'name'
                                        ? 'bg-primary text-white rounded-tl-2xl'
                                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    Search by Name
                                </div>
                            </button>
                            <button
                                onClick={() => handleSearchTypeChange('ingredients')}
                                className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 ${searchType === 'ingredients'
                                        ? 'bg-primary text-white rounded-tr-2xl'
                                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    Search by Ingredients
                                </div>
                            </button>
                        </div>

                        {/* Search Input */}
                        <form onSubmit={handleSubmit} className="relative">
                            <div className="flex items-center">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => setIsSearchFocused(true)}
                                        onBlur={() => setIsSearchFocused(false)}
                                        onKeyPress={handleKeyPress}
                                        placeholder={
                                            searchType === 'name'
                                                ? 'Enter recipe name (e.g., "Chicken Tikka Masala")'
                                                : 'Enter ingredients separated by commas (e.g., "chicken, rice, garlic")'
                                        }
                                        className="w-full px-6 py-6 text-lg text-gray-700 placeholder-gray-500 bg-transparent border-none outline-none rounded-bl-2xl"
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="bg-secondary hover:bg-secondary-hover text-primary px-8 py-6 rounded-br-2xl font-semibold transition-colors duration-200 flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Suggestion Pills */}
                <div className="text-center">
                    <p className="text-gray-600 mb-4 font-medium">
                        {searchType === 'name' ? 'Popular Recipes:' : 'Popular Ingredient Combinations:'}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                        {suggestions[searchType].map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="bg-white hover:bg-primary hover:text-white text-gray-700 px-4 py-2 rounded-full border border-gray-200 hover:border-primary transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RecipeSearch