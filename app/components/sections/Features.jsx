import React from 'react'
import Image from 'next/image'
import { FiArrowUpRight } from 'react-icons/fi'

const Features = () => {
    const features = [
        {
            id: 1,
            title: "Recipe Search by Ingredient",
            description: "Find perfect recipes using ingredients you already have in your kitchen",
            image: "/images/recipe1.png",
            className: "bg-white"
        },
        {
            id: 2,
            title: "Automatic Meal Plan",
            description: "Get personalized meal plans generated based on your preferences",
            image: "/images/recipe3.jpg",
            className: "bg-white"
        },
        {
            id: 3,
            title: "Integration with Calendar & Nutrition Analysis",
            description: "Sync your meal plans with your calendar and track nutrition automatically",
            image: "/images/recipe2.png",
            className: "!bg-primary text-white"
        },
        {
            id: 4,
            title: "What you need we will provide",
            description: "Complete solution for all your meal planning and recipe needs",
            ctaButton: true,
            className: "bg-white flex flex-col justify-center"
        }
    ]

    return (
        <section className="py-16 ">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto md:h-[900px]">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className={`rounded-3xl bg-white cursor-pointer px-8 py-14 flex flex-col ${feature.className} relative overflow-hidden`}
                        >


                            <div className={`${feature.id === 3 ? '' : ''}`}>
                                <h3 className={`${feature.id === 4 ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}  font-bold mb-4 leading-tight`}>
                                    {feature.title}
                                </h3>

                                {feature.description && (
                                    <p className={`text-lg mb-6 ${feature.id === 3 ? 'text-gray-200' : 'text-gray-600'}`}>
                                        {feature.description}
                                    </p>
                                )}

                                {feature.ctaButton && (
                                    <div className="flex items-center gap-4">
                                        <button className="custom_button text-base font-medium">
                                            Try for Free
                                        </button>
                                        <button className="w-12 h-12 cursor-pointer bg-secondary hover:bg-secondary-hover rounded-full flex items-center justify-center transition">
                                            <FiArrowUpRight className='text-primary font-bold text-xl' />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {feature.image && (
                                <div className="relative !h-48 md:h-60 mb-6 rounded-2xl overflow-hidden">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="w-full h-auto mx-auto object-cover"
                                    />
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features