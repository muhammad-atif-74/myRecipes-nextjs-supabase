import React from 'react'
import { ToastContainer } from 'react-toastify'

const page = () => {
    return (
        <main>
            <ToastContainer />
            <div className="p-6">
                <div className="max-w-8xl mx-auto">

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold font-lora text-gray-800 mb-2">
                            Your Recipes
                        </h1>
                        <p className="text-gray-600">
                            Share your delicious creation with the community
                        </p>
                    </div>


                </div>
            </div>
        </main>
    )
}

export default page