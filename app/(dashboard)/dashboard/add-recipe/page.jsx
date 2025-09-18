'use client'

import React, { useState } from 'react'
import {
    FiUpload,
    FiPlus,
    FiTrash2,
    FiClock,
    FiUsers,
    FiSave,
    FiEye
} from 'react-icons/fi'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-toastify'
import { addNewRecipe, uploadFile } from '@/app/lib/action'
import { useAuthStore } from '@/app/store/useAuthStore'

const AddRecipePage = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        prepTime: '',
        cookTime: '',
        serves: '',
        difficulty: 'Easy',
        image: null,
        ingredients: [''],
        directions: [''],
        tags: '',
        videoUrl: ''
    })

    const user = useAuthStore(state => state.user)

    const [imagePreview, setImagePreview] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const categories = [
        'Appetizers', 'Main Course', 'Desserts', 'Breakfast',
        'Lunch', 'Dinner', 'Snacks', 'Beverages', 'Salads', 'Soups'
    ]

    const difficulties = ['Easy', 'Medium', 'Hard']

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            category: '',
            prepTime: '',
            cookTime: '',
            serves: '',
            difficulty: 'Easy',
            image: null,
            ingredients: [''],
            directions: [''],
            tags: '',
            videoUrl: ''
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData(prev => ({ ...prev, image: file }))
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...formData.ingredients]
        newIngredients[index] = value
        setFormData(prev => ({ ...prev, ingredients: newIngredients }))
    }

    const addIngredient = () => {
        setFormData(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, '']
        }))
    }

    const removeIngredient = (index) => {
        const newIngredients = formData.ingredients.filter((_, i) => i !== index)
        setFormData(prev => ({ ...prev, ingredients: newIngredients }))
    }

    const handleDirectionChange = (index, value) => {
        const newDirections = [...formData.directions]
        newDirections[index] = value
        setFormData(prev => ({ ...prev, directions: newDirections }))
    }

    const addDirection = () => {
        setFormData(prev => ({
            ...prev,
            directions: [...prev.directions, '']
        }))
    }

    const removeDirection = (index) => {
        const newDirections = formData.directions.filter((_, i) => i !== index)
        setFormData(prev => ({ ...prev, directions: newDirections }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!formData.title || !formData.description || !formData.category) {
                toast.error("Please fill in all required fields (title, description, category).");
                return;
            }

            if (!formData.image) {
                toast.error("Recipe image is required.");
                return;
            }

            if (!user?.id) {
                toast.error("You must be logged in to add a recipe.");
                return;
            }

            console.log("Uploading file")

            const { path, success } = await uploadFile(formData.image, "images");
            if (!success) {
                toast.error("Something went wrong while uploading the image.");
                return;
            }
            console.log("Adding recipe")

            const data = await addNewRecipe({
                title: formData.title,
                description: formData.description,
                category: formData.category,
                difficulty: formData.difficulty,
                prep_time: parseInt(formData.prepTime) || 0,
                cook_time: parseInt(formData.cookTime) || 0,
                serves: parseInt(formData.serves) || 1,
                ingredients: formData.ingredients,
                directions: formData.directions,
                tags: formData.tags,
                video_url: formData.videoUrl,
                image_url: path, // Supabase storage path
                user_id: user.id,
            });

            toast.success("Recipe Uploaded Successfully 🎉");
            console.log("Inserted recipe:", data);
            resetForm()
        } catch (err) {
            toast.error(err.message || "Something went wrong.");
            console.error("Submit error:", err);
        } finally {
            setIsLoading(false);
        }
    };


    const handlePreview = () => {
        // Preview functionality will be implemented later
        console.log('Preview recipe:', formData)
    }

    return (
        <main>
            <ToastContainer />
            <div className="p-6">
                <div className="max-w-8xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold font-lora text-gray-800 mb-2">
                            Add New Recipe
                        </h1>
                        <p className="text-gray-600">
                            Share your delicious creation with the community
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information */}
                        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                            <h2 className="text-xl font-semibold font-lora mb-6 text-gray-800">
                                Basic Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Recipe Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Enter recipe title"
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe your recipe..."
                                        required
                                        rows="4"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="">Select category</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Difficulty Level
                                    </label>
                                    <select
                                        name="difficulty"
                                        value={formData.difficulty}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        {difficulties.map(difficulty => (
                                            <option key={difficulty} value={difficulty}>
                                                {difficulty}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Recipe Details */}
                        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                            <h2 className="text-xl font-semibold font-lora mb-6 text-gray-800">
                                Recipe Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <FiClock className="mr-2" />
                                        Prep Time (minutes) *
                                    </label>
                                    <input
                                        type="number"
                                        name="prepTime"
                                        value={formData.prepTime}
                                        onChange={handleInputChange}
                                        placeholder="15"
                                        required
                                        min="1"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <FiClock className="mr-2" />
                                        Cook Time (minutes) *
                                    </label>
                                    <input
                                        type="number"
                                        name="cookTime"
                                        value={formData.cookTime}
                                        onChange={handleInputChange}
                                        placeholder="30"
                                        required
                                        min="1"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <FiUsers className="mr-2" />
                                        Serves *
                                    </label>
                                    <input
                                        type="number"
                                        name="serves"
                                        value={formData.serves}
                                        onChange={handleInputChange}
                                        placeholder="4"
                                        required
                                        min="1"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Recipe Image */}
                        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                            <h2 className="text-xl font-semibold font-lora mb-6 text-gray-800">
                                Recipe Image
                            </h2>

                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                {imagePreview ? (
                                    <div className="relative">
                                        <Image
                                            src={imagePreview}
                                            alt="Recipe preview"
                                            width={300}
                                            height={200}
                                            className="mx-auto rounded-lg object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImagePreview(null)
                                                setFormData(prev => ({ ...prev, image: null }))
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <FiUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                                        <p className="text-gray-600 mb-2">Click to upload recipe image</p>
                                        <p className="text-sm text-gray-400">PNG, JPG up to 5MB</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary-hover transition-colors"
                                >
                                    {imagePreview ? 'Change Image' : 'Upload Image'}
                                </label>
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                            <h2 className="text-xl font-semibold font-lora mb-6 text-gray-800">
                                Ingredients
                            </h2>

                            <div className="space-y-4">
                                {formData.ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <input
                                            type="text"
                                            value={ingredient}
                                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                                            placeholder="e.g., 1 cup flour"
                                            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                        {formData.ingredients.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeIngredient(index)}
                                                className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addIngredient}
                                    className="flex items-center space-x-2 text-primary hover:text-primary-hover font-medium"
                                >
                                    <FiPlus size={18} />
                                    <span>Add Ingredient</span>
                                </button>
                            </div>
                        </div>

                        {/* Directions */}
                        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                            <h2 className="text-xl font-semibold font-lora mb-6 text-gray-800">
                                Directions
                            </h2>

                            <div className="space-y-4">
                                {formData.directions.map((direction, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium mt-2">
                                            {index + 1}
                                        </span>
                                        <textarea
                                            value={direction}
                                            onChange={(e) => handleDirectionChange(index, e.target.value)}
                                            placeholder="Describe this step..."
                                            rows="3"
                                            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                        />
                                        {formData.directions.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeDirection(index)}
                                                className="flex-shrink-0 p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-2"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addDirection}
                                    className="flex items-center space-x-2 text-primary hover:text-primary-hover font-medium ml-11"
                                >
                                    <FiPlus size={18} />
                                    <span>Add Step</span>
                                </button>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                            <h2 className="text-xl font-semibold font-lora mb-6 text-gray-800">
                                Additional Information
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tags (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleInputChange}
                                        placeholder="e.g., healthy, vegetarian, quick"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Video URL (optional)
                                    </label>
                                    <input
                                        type="url"
                                        name="videoUrl"
                                        value={formData.videoUrl}
                                        onChange={handleInputChange}
                                        placeholder="https://youtube.com/watch?v=..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                type="button"
                                onClick={handlePreview}
                                className="flex items-center justify-center space-x-2 px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                                <FiEye size={18} />
                                <span>Preview</span>
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 flex items-center justify-center space-x-2 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none font-medium"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Publishing...</span>
                                    </>
                                ) : (
                                    <>
                                        <FiSave size={18} />
                                        <span>Publish Recipe</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default AddRecipePage