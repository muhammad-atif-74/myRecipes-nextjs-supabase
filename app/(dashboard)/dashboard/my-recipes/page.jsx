import MyRecipesClient from '@/app/components/dashboard/MyRecipesClient'
import React from 'react'
import { ToastContainer } from 'react-toastify'

const MyRecipesPage = async () => {
    return (
        <main>
            <ToastContainer />
            <div className="p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold font-lora text-gray-800 mb-2">
                            Your Recipes
                        </h1>
                        <p className="text-gray-600">
                            Manage and share your delicious creations with the community
                        </p>
                    </div>

                    <MyRecipesClient />
                </div>
            </div>
        </main>
    )
}

export default MyRecipesPage