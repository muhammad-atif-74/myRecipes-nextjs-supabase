import ChefRecipeCard from '../../../components/cards/ChefRecipeCard';
import RecipeReviews from '../../../components/sections/RecipeReviews';
import Image from 'next/image'
import React from 'react'
import { FaFacebook, FaRegClock } from 'react-icons/fa6'
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import { ImSpoonKnife } from "react-icons/im";
import { getRecipeById } from '@/app/lib/action';


export async function generateMetadata({ params }) {
    const { id } = params;
    const recipe = await getRecipeById(id);

    return {
        title: `${recipe.title} | MyRecipe`,
        description: recipe.description,
        keywords: recipe.category,
    };
}

const page = async ({ params }) => {
    const { id } = params;
    const recipe = await getRecipeById(id);

    return (
        <>
            <section className='py-16'>
                <div className="container">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                        <aside className='w-full md:w-[65%] border-r border-r-gray-200'>
                            <span className="bg-secondary/20 text-primary px-3 py-1.5 mb-4 inline-block rounded-full text-sm font-semibold">
                                {recipe.category}
                            </span>
                            <h1 className="text-3xl md:text-6xl font-extrabold mb-4 font-lora">
                                {recipe.title}
                            </h1>
                            <p className="text-gray-600 text-lg mb-4">
                                {recipe.description}
                            </p>

                            <div className="flex items-center gap-2">

                                <button className="custom_button_outline_primary">Jump to recipe</button>
                                <button className="custom_button_outline_primary !border-0 hover:!bg-transparent hover:!text-primary">Watch Inspiration</button>
                            </div>
                        </aside>
                        <aside className='w-full md:w-[25%]'>
                            <div className="flex items-start gap-4 mb-6">
                                <div><FaRegClock className='mt-[1px] text-gray-500' /></div>
                                <div>
                                    <p className='text-gray-500 font-light text-sm'>PREP</p>
                                    <h5 className='text-lg'>{recipe.prep_time} minutes</h5>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 mb-6">
                                <div><FaRegClock className='mt-[1px] text-gray-500' /></div>
                                <div>
                                    <p className='text-gray-500 font-light text-sm'>COOK</p>
                                    <h5 className='text-lg'>{recipe.cook_time} minutes</h5>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 mb-6">
                                <div><ImSpoonKnife className='mt-[1px] text-gray-500' /></div>
                                <div>
                                    <p className='text-gray-500 font-light text-sm'>SERVES</p>
                                    <h5 className='text-lg'>{recipe.serves} people</h5>
                                </div>
                            </div>
                        </aside>
                    </div>

                </div>
            </section>

            <section className="py-2">
                <div className="container">

                    <div className="image w-[100%] rounded-2xl md:rounded-4xl overflow-hidden bg-amber-800 shadow-lg">
                        <Image
                            src={recipe.image_url}
                            alt={recipe.title}
                            className='w-full h-full object-cover'
                            width={600}
                            height={600}
                        />
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="container-narrow">
                    <div className='flex gap-2 items-center mb-6'>
                        <p>Share Recipe</p>
                        <div className='flex items-center gap-3'>
                            <a href="#" className="w-8 h-8 bg-primary hover:bg-secondary rounded-full flex items-center justify-center transition">
                                <FiFacebook className="text-white" />
                            </a>
                            <a href="#" className="w-8 h-8 bg-primary hover:bg-secondary rounded-full flex items-center justify-center transition">
                                <FiTwitter className="text-white" />
                            </a>
                            <a href="#" className="w-8 h-8 bg-primary hover:bg-secondary rounded-full flex items-center justify-center transition">
                                <FiInstagram className="text-white" />
                            </a>

                        </div>

                    </div>

                    <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
                        <div className="w-full md:w-[60%] rounded-4xl ">
                            <div className="bg-white mb-6 p-12">
                                <h2 className='text-2xl md:text-3xl font-lora font-semibold mb-6'>Ingredients</h2>
                                <ul className='ps-10 recipeIngredients'>
                                    {
                                        recipe.ingredients.map((ingredient, i) => (
                                            <li key={i} className='text-base text-gray-700 ingredient mb-4'>{ingredient}</li>
                                        ))
                                    }
                                </ul>

                            </div>
                            <div className='mb-6'>
                                <h2 className='text-2xl md:text-3xl font-lora font-semibold mb-6'>Directions</h2>
                                <ul className='text-gray-700 text-lg leading-relaxed list-decimal ps-4'>
                                    {
                                        recipe.directions.map((direction, i) => (
                                            <li key={i} className='mb-4'>{direction}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="mb-6">
                                <h2 className="text-2xl md:text-3xl font-lora font-semibold mb-6">
                                    Inspiration Video
                                </h2>
                                <iframe
                                    src={recipe.video_url || "https://www.youtube.com/embed/4kyTkEItmDc"}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-64 md:h-96 rounded-lg"
                                ></iframe>
                            </div>

                            <div className="mb-6">
                                <RecipeReviews />
                            </div>

                        </div>
                        <div className="w-full md:w-[40%] ">
                            <div className="w-[70%] text-center mx-auto">
                                <div className="chef mb-8">
                                    <div className="image mx-auto rounded-4xl overflow-hidden mb-4">
                                        <Image
                                            src={recipe.chef.avatar_url || "/images/chef1.png"}
                                            alt={`Chef-${recipe.chef.full_name}`}
                                            className='w-full h-full object-cover'
                                            width={1000}
                                            height={1000}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h3 className='text-2xl md:text-3xl font-lora font-semibold mb-2'>About Me</h3>
                                        <p className='text-gray-700'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita?</p>
                                    </div>
                                </div>

                                <div className="otherRecipes">
                                    <h2 className='text-2xl md:text-3xl font-lora font-semibold mb-6'>Other Recipes</h2>

                                    <div className="otherListings">
                                        {
                                            [1, 2, 3].map((r, i) => {
                                                return (
                                                    <ChefRecipeCard key={i} recipe={recipe} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page