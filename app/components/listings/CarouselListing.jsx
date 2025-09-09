'use client'

import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import RecipeCard from '../cards/RecipeCard'

const CarouselListing = ({
  title = "Featured Recipes",
  recipes = [],
  autoplay = true,
  showNavigation = true,
  showPagination = false
}) => {
  const swiperRef = useRef(null)

  const displayRecipes = recipes.length > 0 ? recipes : sampleRecipes

  const swiperConfig = {
    modules: [Navigation, Pagination, Autoplay],
    spaceBetween: 24,
    loop: displayRecipes.length > 3,
    speed: 600,
    autoplay: autoplay ? {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    } : false,
    navigation: showNavigation ? {
      prevEl: '.swiper-button-prev-custom',
      nextEl: '.swiper-button-next-custom',
    } : false,
    pagination: showPagination ? {
      el: '.swiper-pagination-custom',
      clickable: true,
      dynamicBullets: true,
    } : false,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    },
  }

  return (
    <section className='py-12 bg-gray-50/50'>
      <div className='container mx-auto px-4'>
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">{title}</h2>
          </div>

          {/* Custom Navigation Buttons */}
          {showNavigation && (
            <div className="hidden md:flex items-center gap-3">
              <button className="swiper-button-prev-custom w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center group shadow-sm">
                <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="swiper-button-next-custom w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center group shadow-sm">
                <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <Swiper
            ref={swiperRef}
            {...swiperConfig}
            className="recipe-carousel !pb-12"
          >
            {displayRecipes.map((recipe) => (
              <SwiperSlide key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          {showPagination && (
            <div className="swiper-pagination-custom flex justify-center mt-6"></div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .recipe-carousel .swiper-slide {
          height: auto;
        }

        .recipe-carousel .swiper-wrapper {
          align-items: stretch;
        }

        /* Custom pagination styles */
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #d1d5db;
          opacity: 1;
          margin: 0 6px;
          transition: all 0.3s ease;
        }

        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: var(--primary-color, #3b82f6);
          transform: scale(1.2);
        }

        .swiper-pagination-custom .swiper-pagination-bullet:hover {
          background: var(--primary-color, #3b82f6);
          transform: scale(1.1);
        }

        /* Hide default swiper navigation */
        .swiper-button-next,
        .swiper-button-prev {
          display: none;
        }

        /* Smooth transitions */
        .swiper-slide-active .recipe-card {
          transform: translateY(0);
        }
      `}</style>
    </section>
  )
}

export default CarouselListing