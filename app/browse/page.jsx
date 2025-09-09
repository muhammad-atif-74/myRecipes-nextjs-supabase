import React from 'react'
import RecipeSearch from '../components/browse/RecipeSearch'
import RecipeListing from '../components/listings/RecipeListing'
import CarouselListing from '../components/listings/CarouselListing'
import { sampleRecipes } from '@/public/data/recipesData'

const page = () => {
    return (
        <>
            <RecipeSearch />
            <RecipeListing title='Browse Most Popular'/>
            <CarouselListing recipes={sampleRecipes}/>
        </>

    )
}

export default page