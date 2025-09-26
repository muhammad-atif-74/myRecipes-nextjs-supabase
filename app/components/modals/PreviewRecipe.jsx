import React from 'react';
import Image from 'next/image';
import { FaRegClock, FaTimes } from 'react-icons/fa';
import { ImSpoonKnife } from "react-icons/im";
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { getEmbedUrl } from '@/app/lib/utils';

const PreviewRecipe = ({ isOpen, onClose, recipeData }) => {
    if (!isOpen) return null;

    console.log(recipeData)

    const preview = {
        title: recipeData?.title || 'Recipe Title',
        description: recipeData?.description || 'Recipe description will appear here...',
        category: recipeData?.category || 'Main Course',
        prepTime: recipeData?.prepTime || '20',
        cookTime: recipeData?.cookTime || '20',
        serves: recipeData?.serves || '2',
        difficulty: recipeData?.difficulty || 'Medium',
        image: recipeData?.image || null,
        ingredients: recipeData.ingredients,
        directions: recipeData.directions,
        videoUrl: recipeData?.videoUrl,
        imagePreview: recipeData?.imagePreview || null,
    };



    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] overflow-y-auto w-full relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
                >
                    <FaTimes className="text-gray-600" />
                </button>

                {/* Modal Content */}
                <div className="p-6">
                    {/* Header Section */}
                    <section className='py-8'>
                        <div className="container mx-auto">
                            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                                <aside className='w-full md:w-[65%] border-r border-r-gray-200 pr-4'>
                                    <span className="bg-orange-100 text-orange-600 px-3 py-1.5 mb-4 inline-block rounded-full text-sm font-semibold">
                                        {preview.category}
                                    </span>
                                    <h1 className="text-2xl md:text-4xl font-extrabold mb-4">
                                        {preview.title}
                                    </h1>
                                    <p className="text-gray-600 text-base mb-4">
                                        {preview.description}
                                    </p>
                                </aside>

                                <aside className='w-full md:w-[25%]'>
                                    <div className="flex items-start gap-3 mb-4">
                                        <div><FaRegClock className='mt-[1px] text-gray-500' /></div>
                                        <div>
                                            <p className='text-gray-500 font-light text-xs'>PREP</p>
                                            <h5 className='text-sm font-medium'>{preview.prepTime} minutes</h5>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 mb-4">
                                        <div><FaRegClock className='mt-[1px] text-gray-500' /></div>
                                        <div>
                                            <p className='text-gray-500 font-light text-xs'>COOK</p>
                                            <h5 className='text-sm font-medium'>{preview.cookTime} minutes</h5>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 mb-4">
                                        <div><ImSpoonKnife className='mt-[1px] text-gray-500' /></div>
                                        <div>
                                            <p className='text-gray-500 font-light text-xs'>SERVES</p>
                                            <h5 className='text-sm font-medium'>{preview.serves} people</h5>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </section>

                    {/* Image Section */}
                    <section className="py-2">
                        <div className="container mx-auto">
                            <div className="w-full rounded-xl overflow-hidden bg-gray-200 shadow-lg h-48 md:h-64">
                                <img
                                    src={preview.imagePreview}
                                    alt="Recipe Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Content Section */}
                    <section className="py-6">
                        <div className="container mx-auto">
                            {/* Share buttons */}
                            <div className='flex gap-2 items-center mb-6'>
                                <p className="text-sm">Share Recipe</p>
                                <div className='flex items-center gap-2'>
                                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                                        <FiFacebook className="text-white text-xs" />
                                    </div>
                                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                                        <FiTwitter className="text-white text-xs" />
                                    </div>
                                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                                        <FiInstagram className="text-white text-xs" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                                <div className="w-full md:w-[60%]">
                                    {/* Ingredients */}
                                    <div className="bg-gray-50 mb-6 p-6 rounded-lg">
                                        <h2 className='text-xl font-semibold mb-4'>Ingredients</h2>
                                        <ul className='space-y-2'>
                                            {
                                                console.log(preview.ingredients)
                                            }
                                            {preview.ingredients
                                                .length > 0 ? preview.ingredients
                                                    .map((ingredient, i) => (
                                                        <li key={i} className='text-sm text-gray-700 flex items-start'>
                                                            <span className="text-orange-600 mr-2">•</span>
                                                            {ingredient}
                                                        </li>
                                                    )) : (
                                                <li className='text-sm text-gray-700 flex items-start'>
                                                    <span className="text-orange-600 mr-2">•</span>
                                                    No ingredients added.
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* Directions */}
                                    <div className='mb-6'>
                                        <h2 className='text-xl font-semibold mb-4'>Directions</h2>
                                        <ol className='text-gray-700 text-sm leading-relaxed list-decimal pl-4 space-y-2'>
                                            {
                                            preview.directions
                                            .length > 0 ? preview.directions
                                            .map((direction, i) => (
                                                <li key={i}>{direction}</li>
                                            )): (
                                                <li>No directions added.</li>
                                            )}
                                        </ol>
                                    </div>

                                    {/* Video */}
                                    {
                                        preview.videoUrl && (
                                            <div className="mb-6">
                                                <h2 className="text-xl font-semibold mb-4">
                                                    Inspiration Video
                                                </h2>
                                                <div className="w-full h-64 md:h-72 bg-gray-200 rounded-lg ">
                                                    {preview.videoUrl ? (
                                                        <div className="text-center">
                                                            <iframe
                                                                src={getEmbedUrl(preview.videoUrl) || "https://www.youtube.com/embed/4kyTkEItmDc"}
                                                                frameBorder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                                className="w-full h-64 md:h-72 rounded-lg"
                                                            ></iframe>
                                                        </div>
                                                    ) : (
                                                        <p className="text-gray-500 text-sm">No video URL provided</p>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>

                                {/* Sidebar */}
                                <div className="w-full md:w-[35%]">
                                    <div className="text-center">
                                        {/* Chef Section */}
                                        {/* <div className="mb-6">
                                            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                                                <span className="text-2xl">👨‍🍳</span>
                                            </div>
                                            <div className="text-center">
                                                <h3 className='text-lg font-semibold mb-2'>About Me</h3>
                                                <p className='text-gray-700 text-sm'>Recipe creator profile...</p>
                                            </div>
                                        </div> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer Actions */}
                    <div className="border-t pt-4 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        >
                            Close Preview
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewRecipe;