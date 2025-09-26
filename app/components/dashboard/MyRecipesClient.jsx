'use client'

import React, { useState, useEffect } from 'react'
import {
    FiPlus,
    FiEdit3,
    FiTrash2,
    FiEye,
    FiClock,
    FiUsers,
    FiSearch,
    FiFilter,
    FiMoreVertical
} from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useAuthStore } from '@/app/store/useAuthStore'
import { getRecipesByUserId } from '@/app/lib/action'

const MyRecipesClient = () => {
    const user = useAuthStore(state => state.user)
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [sortBy, setSortBy] = useState('newest')
    const [deleteLoading, setDeleteLoading] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(null)

    const categories = ['all', 'appetizers', 'main course', 'desserts', 'breakfast', 'lunch', 'dinner', 'snacks', 'beverages', 'salads', 'soups']
    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'name', label: 'Recipe Name' },
        { value: 'category', label: 'Category' }
    ]


    const fetchRecipes = async () => {
        try {
            console.log("Fetching recipes for user:", user)
            setLoading(true)
            const data = await getRecipesByUserId(user.id)
            console.log("Fetched recipes:", data)

            setRecipes(data || [])
        } catch (error) {
            console.error('Error fetching recipes:', error)
            toast.error('Failed to load recipes')
        } finally {
            setLoading(false)
        }
    }

    // Fetch recipes on component mount
    useEffect(() => {
        console.log("user changed:", user)
        if (user?.id) {
            fetchRecipes()
        }
    }, [user?.id])

    const handleDeleteRecipe = async (recipeId) => {
        try {
            setDeleteLoading(recipeId)

            // Call your delete function here
            // await deleteRecipe(recipeId)

            // For now, just remove from state
            setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId))
            toast.success('Recipe deleted successfully')
            setShowDeleteModal(null)
        } catch (error) {
            console.error('Error deleting recipe:', error)
            toast.error('Failed to delete recipe')
        } finally {
            setDeleteLoading(null)
        }
    }

    // Filter and sort recipes
    const filteredAndSortedRecipes = React.useMemo(() => {
        let filtered = recipes.filter(recipe => {
            const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.description?.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = selectedCategory === 'all' ||
                recipe.category?.toLowerCase() === selectedCategory
            return matchesSearch && matchesCategory
        })

        // Sort recipes
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.created_at) - new Date(a.created_at)
                case 'oldest':
                    return new Date(a.created_at) - new Date(b.created_at)
                case 'name':
                    return a.title.localeCompare(b.title)
                case 'category':
                    return (a.category || '').localeCompare(b.category || '')
                default:
                    return 0
            }
        })

        return filtered
    }, [recipes, searchTerm, selectedCategory, sortBy])

    if (loading) {
        return <RecipesSkeleton />
    }

    return (
        <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search your recipes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        />
                    </div>

                    {/* Filters and Actions */}
                    <div className="flex flex-wrap gap-3 items-center">
                        {/* Category Filter */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        {/* Add Recipe Button */}
                        <Link
                            href="/dashboard/add-recipe"
                            className="flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-hover transition-colors font-medium"
                        >
                            <FiPlus size={18} />
                            <span className="hidden sm:inline">Add Recipe</span>
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>
                            {filteredAndSortedRecipes.length} of {recipes.length} recipes
                        </span>
                        {searchTerm && (
                            <span>
                                Searching for "{searchTerm}"
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Recipes Grid */}
            {filteredAndSortedRecipes.length === 0 ? (
                <EmptyState searchTerm={searchTerm} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAndSortedRecipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onDelete={() => setShowDeleteModal(recipe)}
                            deleteLoading={deleteLoading === recipe.id}
                        />
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <DeleteModal
                    recipe={showDeleteModal}
                    onConfirm={() => handleDeleteRecipe(showDeleteModal.id)}
                    onCancel={() => setShowDeleteModal(null)}
                    loading={deleteLoading === showDeleteModal.id}
                />
            )}
        </div>
    )
}

// Recipe Card Component
const RecipeCard = ({ recipe, onDelete, deleteLoading }) => {
    const [showActions, setShowActions] = useState(false)

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
            {/* Recipe Image */}
            <div className="relative h-48 bg-gray-200">
                {recipe.image_url ? (
                    <Image
                        src={recipe.image_url}
                        alt={recipe.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400 text-lg font-medium">No Image</span>
                    </div>
                )}

                {/* Actions Dropdown */}
                <div className="absolute top-3 right-3">
                    <div className="relative">
                        <button
                            onClick={() => setShowActions(!showActions)}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                        >
                            <FiMoreVertical size={16} />
                        </button>

                        {showActions && (
                            <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                                <Link
                                    href={`/recipe/${recipe.id}`}
                                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <FiEye size={16} />
                                    <span>View</span>
                                </Link>
                                <Link
                                    href={`/dashboard/edit-recipe/${recipe.id}`}
                                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <FiEdit3 size={16} />
                                    <span>Edit</span>
                                </Link>
                                <button
                                    onClick={onDelete}
                                    disabled={deleteLoading}
                                    className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <FiTrash2 size={16} />
                                    <span>Delete</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Category Badge */}
                {recipe.category && (
                    <div className="absolute bottom-3 left-3">
                        <span className="px-2 py-1 bg-secondary/90 text-white text-xs rounded-full">
                            {recipe.category}
                        </span>
                    </div>
                )}
            </div>

            {/* Recipe Content */}
            <div className="p-6">
                <h3 className="text-lg font-semibold font-lora text-gray-800 mb-2 line-clamp-1">
                    {recipe.title}
                </h3>

                {recipe.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {recipe.description}
                    </p>
                )}

                {/* Recipe Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                        {recipe.prep_time && (
                            <div className="flex items-center space-x-1">
                                <FiClock size={14} />
                                <span>{recipe.prep_time}m</span>
                            </div>
                        )}
                        {recipe.serves && (
                            <div className="flex items-center space-x-1">
                                <FiUsers size={14} />
                                <span>{recipe.serves}</span>
                            </div>
                        )}
                    </div>

                    <span className="text-xs">
                        {new Date(recipe.created_at).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    )
}

// Delete Modal Component
const DeleteModal = ({ recipe, onConfirm, onCancel, loading }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Delete Recipe
                </h3>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete "{recipe.title}"? This action cannot be undone.
                </p>

                <div className="flex space-x-3">
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            'Delete'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

// Empty State Component
const EmptyState = ({ searchTerm }) => {
    return (
        <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <FiPlus size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {searchTerm ? 'No recipes found' : 'No recipes yet'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm
                    ? `We couldn't find any recipes matching "${searchTerm}". Try adjusting your search.`
                    : "You haven't created any recipes yet. Start sharing your delicious creations!"
                }
            </p>
            {!searchTerm && (
                <Link
                    href="/dashboard/add-recipe"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-hover transition-colors font-medium"
                >
                    <FiPlus size={18} />
                    <span>Create Your First Recipe</span>
                </Link>
            )}
        </div>
    )
}

// Skeleton Loading Component
const RecipesSkeleton = () => {
    return (
        <div className="space-y-6">
            {/* Search Bar Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <div className="animate-pulse">
                    <div className="flex gap-4 items-center">
                        <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
                        <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
                        <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
                        <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            </div>

            {/* Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="animate-pulse">
                            <div className="h-48 bg-gray-200"></div>
                            <div className="p-6">
                                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                                <div className="flex justify-between">
                                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyRecipesClient