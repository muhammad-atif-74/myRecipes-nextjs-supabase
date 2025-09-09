'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const RecipeReviews = ({
    reviews = [],
    averageRating = 4.7,
    totalReviews = 245,
    allowNewReview = true
}) => {
    const [showAllReviews, setShowAllReviews] = useState(false)
    const [newReviewRating, setNewReviewRating] = useState(0)
    const [newReviewText, setNewReviewText] = useState('')
    const [showWriteReview, setShowWriteReview] = useState(false)

    // Sample reviews data if none provided
    const sampleReviews = [
        {
            id: 1,
            user: {
                name: "Sarah Johnson",
                avatar: "/images/chef1.png",
                verified: true
            },
            rating: 5,
            text: "This recipe is absolutely incredible! The flavors are so rich and authentic. My family couldn't stop raving about it. The instructions were clear and easy to follow. Will definitely be making this again soon!",
            date: "2024-01-15",
            helpful: 24,
            images: ["/images/recipe1.png", "/images/recipe2.png"]
        },
        {
            id: 2,
            user: {
                name: "Michael Chen",
                avatar: "/images/user-michael.jpg",
                verified: false
            },
            rating: 4,
            text: "Really good recipe! I made a few small modifications - added a bit more spice and used coconut milk instead of heavy cream. Turned out amazing. Thanks for sharing!",
            date: "2024-01-12",
            helpful: 18
        },
        {
            id: 3,
            user: {
                name: "Emily Rodriguez",
                avatar: "/images/user-emily.jpg",
                verified: true
            },
            rating: 5,
            text: "Perfect! This is exactly what I was looking for. The step-by-step instructions made it so easy even for a beginner like me. Restaurant quality results at home.",
            date: "2024-01-10",
            helpful: 31,
            images: ["/images/review-3.jpg"]
        },
        {
            id: 4,
            user: {
                name: "David Wilson",
                avatar: "/images/user-david.jpg",
                verified: false
            },
            rating: 4,
            text: "Delicious recipe! The only thing I'd change is maybe adding a bit more garlic, but that's just personal preference. Overall fantastic!",
            date: "2024-01-08",
            helpful: 12
        },
        {
            id: 5,
            user: {
                name: "Priya Patel",
                avatar: "/images/user-priya.jpg",
                verified: true
            },
            rating: 5,
            text: "As someone who grew up eating authentic Indian food, I can say this recipe is spot on! The spice balance is perfect and it brings back memories of my grandmother's cooking.",
            date: "2024-01-05",
            helpful: 42
        }
    ]

    const displayReviews = reviews.length > 0 ? reviews : sampleReviews
    const visibleReviews = showAllReviews ? displayReviews : displayReviews.slice(0, 3)

    // Render star rating
    const renderStars = (rating, size = 'w-5 h-5', interactive = false, onRate = null) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        className={`${size} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
                        onClick={interactive && onRate ? () => onRate(star) : undefined}
                        disabled={!interactive}
                    >
                        <svg
                            className={`w-full h-full transition-colors ${star <= rating
                                    ? 'text-yellow-400 fill-current'
                                    : interactive
                                        ? 'text-gray-300 hover:text-yellow-200'
                                        : 'text-gray-300'
                                }`}
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </button>
                ))}
            </div>
        )
    }

    // Submit new review
    const handleSubmitReview = (e) => {
        e.preventDefault()
        if (newReviewRating === 0 || newReviewText.trim() === '') return

        // Here you would typically send the review to your backend
        console.log('New review:', {
            rating: newReviewRating,
            text: newReviewText
        })

        // Reset form
        setNewReviewRating(0)
        setNewReviewText('')
        setShowWriteReview(false)
    }

    return (
        <div className="space-y-8">
            {/* Reviews Header with Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl md:text-3xl font-lora font-semibold mb-6">
                        Reviews ({totalReviews})
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            {renderStars(averageRating, 'w-6 h-6')}
                            <span className="text-2xl font-bold text-primary">{averageRating}</span>
                            <span className="text-gray-600">out of 5</span>
                        </div>
                        <div className="text-gray-500">
                            Based on {totalReviews} reviews
                        </div>
                    </div>
                </div>

                {allowNewReview && (
                    <button
                        onClick={() => setShowWriteReview(!showWriteReview)}
                        className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Write Review
                    </button>
                )}
            </div>

            {/* Write Review Form */}
            {showWriteReview && (
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4">Share Your Experience</h3>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Rating
                            </label>
                            {renderStars(newReviewRating, 'w-8 h-8', true, setNewReviewRating)}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Review
                            </label>
                            <textarea
                                value={newReviewText}
                                onChange={(e) => setNewReviewText(e.target.value)}
                                placeholder="Tell us about your experience with this recipe..."
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                required
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={newReviewRating === 0 || newReviewText.trim() === ''}
                                className="bg-primary hover:bg-primary-hover disabled:bg-gray-300 text-white px-6 py-2 rounded-full font-semibold transition-colors"
                            >
                                Submit Review
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowWriteReview(false)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-full font-semibold transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
                {visibleReviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                        {/* Review Header */}
                        <div className="flex items-start gap-4 mb-4">
                            <div className="relative flex-none">
                                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                    {review.user.avatar ? (
                                        <Image
                                            src={review.user.avatar}
                                            alt={review.user.name}
                                            width={48}
                                            height={48}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                            <span className="text-primary font-semibold text-lg">
                                                {review.user.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {review.user.verified && (
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                                    <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                                {renderStars(review.rating)}
                            </div>
                        </div>

                        {/* Review Text */}
                        <p className="text-gray-700 leading-relaxed mb-4">{review.text}</p>

                        {/* Review Images (if any) */}
                        {review.images && review.images.length > 0 && (
                            <div className="flex gap-3 mb-4 overflow-x-auto">
                                {review.images.map((image, index) => (
                                    <div key={index} className="flex-none w-24 h-24 rounded-lg overflow-hidden">
                                        <Image
                                            src={image}
                                            alt={`Review image ${index + 1}`}
                                            width={96}
                                            height={96}
                                            className="object-cover w-full h-full hover:scale-105 transition-transform cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                ))}
            </div>

            {/* Show More/Less Button */}
            {displayReviews.length > 3 && (
                <div className="text-center">
                    <button
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold transition-colors"
                    >
                        {showAllReviews
                            ? 'Show Less Reviews'
                            : `Show All ${displayReviews.length} Reviews`
                        }
                    </button>
                </div>
            )}
        </div>
    )
}

export default RecipeReviews