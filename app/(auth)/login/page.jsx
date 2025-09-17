import LoginForm from '@/app/components/auth/LoginForm'
import RegisterForm from '../../components/auth/RegisterForm'
import Image from 'next/image'
import React from 'react'
const LoginPage = () => {

    return (
        <main className="bg-panel min-h-screen w-full flex items-center flex-col py-8 px-4 relative">
            {/* Header Section */}
            <div className="header mb-4 text-center max-w-5xl">
                <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl mb-2 font-bold font-lora text-primary leading-tight">
                    Login to your account
                </h1>
                <p className="text-base sm:text-base md:text-base text-gray-600 px-4">
                    Discover more than{' '}
                    <span className="text-secondary font-semibold">20,000</span>{' '}
                    delicious recipes from around the globe and share your own culinary creations.
                </p>
            </div>

            <LoginForm />


            <Image
                src="https://www.pngmart.com/files/15/Salad-Food-Plate-Top-View-PNG.png"
                alt="Salad Food Plate"
                width={320}
                height={320}
                className="absolute left-0 top-24 w-80 hidden sm:block"
            />

            <Image
                src="/images/auth_rec_2.png"
                alt="Auth Rec 2"
                width={320}
                height={320}
                className="absolute left-0 top-72 w-80 hidden sm:block"
            />

            <Image
                src="/images/auth_rec_4.png"
                alt="Auth Rec 4"
                width={592} // ≈ 37rem (37*16)
                height={400}
                className="absolute right-0 bottom-16 w-[37rem] hidden sm:block"
            />

            <Image
                src="/images/petals.png"
                alt="Petals"
                width={384} // ≈ 24rem (24*16)
                height={384}
                className="absolute right-0 top-0 w-[24rem] hidden sm:block"
            />
        </main>
    )
}

export default LoginPage