import React from 'react'
import RecipeCard from '../cards/RecipeCard'

const RecipeListing = ({ title = "Recipe Listings" }) => {
    return (
        <section className='py-12'>
            <div className="container">
                <h2 className="text-3xl font-bold text-primary mb-6">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                </div>
            </div>
        </section>
    )
}

export default RecipeListing