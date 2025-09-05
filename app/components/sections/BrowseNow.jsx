import React from 'react'

const BrowseNow = () => {
    return (
        <section className="">
            <div className="container text-center">
                <div className="p-12 md:p-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-300 mb-6 leading-tight">
                        Ready to Transform Your
                        <span className="text-primary"> Meal Planning?</span>
                    </h2>

                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of users who have revolutionized their cooking experience with our intelligent meal planning platform.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="custom_button_secondary text-lg px-8 py-4">
                            Browse Now
                        </button>
                        <button className="custom_button_outline_primary">
                            Learn More
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-gray-200">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">10K+</div>
                            <div className="text-gray-600 text-sm">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">50K+</div>
                            <div className="text-gray-600 text-sm">Recipes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">95%</div>
                            <div className="text-gray-600 text-sm">Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BrowseNow