import Image from 'next/image'
import React from 'react'

const ChefRecipeCard = ({ recipe }) => {
    return (
        <div className="bg-white rounded-2xl hover:shadow-md hover:-translate-y-2 transition-all duration-300 overflow-hidden my-4">
            <div className="image overflow-hidden rounded-2xl">
                <Image
                    src={recipe.image}
                    alt={recipe.title}
                    className={`object-cover w-full h-full`}
                    width={500}
                    height={500}
                />
            </div>
            <div className="content p-6 text-start">
                <h1 className='text-xl font-bold mb-4 cursor-pointer'>{recipe.title}</h1>
                <span className="bg-secondary/20 text-primary px-3 py-1.5 inline-block rounded-full text-sm ">
                    {recipe.category}
                </span>
            </div>
        </div>
    )
}

export default ChefRecipeCard