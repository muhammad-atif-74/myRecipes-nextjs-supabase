import Image from 'next/image'
import React from 'react'
import { FiArrowUpRight } from "react-icons/fi";
import BlurredOverlayLabel from '../utils/BlurredOverlayLabel';

const Hero = () => {
    return (
        <section>
            <div className="container">
                <div className="hero min-h-[70vh] flex flex-col-reverse md:flex-row md:space-x-16 items-center  md:space-y-0">
                    {/* Content Section */}
                    <div className="content w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
                        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 sm:mb-6'>
                            Recipe and Meal Plan App with Ai
                        </h1>
                        <p className='text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-600'>
                            Save time in planning meals according to available ingredients and help users to have a healthy or customized diet.
                        </p>
                        <div className="flex flex-col sm:flex-row sm:space-x-4 items-center justify-center md:justify-start space-y-4 sm:space-y-0">
                            <button className='custom_button text-base sm:text-lg md:text-xl w-full sm:w-auto'>
                                Try for Free
                            </button>
                            <div className="hidden md:flex icon-container rounded-full w-12 h-12 sm:w-15 sm:h-15 bg-secondary hover:bg-secondary-hover cursor-pointer transition items-center justify-center">
                                <FiArrowUpRight className='text-2xl sm:text-3xl' />
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="w-full md:w-1/2">
                        <div className="image-container w-full overflow-hidden rounded-xl relative">
                            <BlurredOverlayLabel title="Nutrition Analysis" analytic="1K+" top={"top-4 sm:top-8"} right={"right-4 sm:right-8"} />
                            <Image
                                src="/images/heroImage.svg"
                                alt="Hero Image"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-full h-auto mx-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Hero