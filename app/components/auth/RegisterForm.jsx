'use client'

import React, { useEffect, useState } from 'react'
import { FaKey, FaRegEnvelope, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { addUserProfile, registerUser, signInWithGoogle } from '../../(auth)/action'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        rememberMe: false
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (formData.password !== formData.confirmPassword) {
                toast.error("Passwords do not match");
                return
            }

            const data = await registerUser(formData);
            // await addUserProfile({
            //     id: data?.user.id,
            //     email: data?.user?.email,
            //     role: 'user',
            //     avatar_url: '',
            //     full_name: ''
            // });
            toast("Account created successfully, redirecting to dashboard...")
            console.log("Success:", data);
            router.push('/')
        } catch (err) {
            toast.error(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    const handleGoogleSignIn = async () => {
        try {
            const data = await signInWithGoogle();
            // await addUserProfile({
            //     id: data?.user.id,
            //     email: data?.user?.email,
            //     role: 'user',
            //     avatarUrl: '',
            //     fullName: ''  
            // });

            console.log("Signed in with google's data: ", data)
            // router.push('/')
        }
        catch (err) {
            console.error("Google Sign-In Error:", err);
            toast.error(err.message ?? "Google sign-in failed. Please try again.");
        }
    }

    const handleForgotPassword = () => {
        // Forgot password functionality will be implemented later
        console.log('Forgot password clicked')
    }

    return (
        <>
            <div className="formContainer w-[90%] sm:w-[85%] md:w-[45%] lg:w-[35%] xl:w-[30%] rounded-2xl h-fit bg-white shadow-2xl p-8 md:p-10 mt-4 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email Input */}
                    <div className="formGroup relative w-full">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter email address"
                            required
                            className="py-4 px-6 ps-12 w-full rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                        />
                        <FaRegEnvelope className="absolute text-lg left-5 top-5 text-gray-400" />
                    </div>

                    {/* Password Input */}
                    <div className="formGroup relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                            required
                            className="py-4 px-6 ps-12 pr-12 w-full rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                        />
                        <FaKey className="absolute text-lg left-5 top-5 text-gray-400" />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-5 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="formGroup relative w-full">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm password"
                            required
                            className="py-4 px-6 ps-12 pr-12 w-full rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                        />
                        <FaKey className="absolute text-lg left-5 top-5 text-gray-400" />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-5 top-5 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-secondary bg-gray-100 border-gray-300 rounded focus:ring-secondary focus:ring-2"
                            />
                            <span className="text-sm text-gray-600 select-none">Remember me</span>
                        </label>
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-sm text-secondary hover:text-secondary-hover transition-colors underline"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 px-5 bg-secondary text-white rounded-full font-semibold text-lg hover:bg-secondary-hover focus:outline-none focus:ring-4 focus:ring-secondary/30 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Creating Account...</span>
                            </div>
                        ) : (
                            'Create Account'
                        )}
                    </button>

                    {/* Divider */}
                    <div className="relative flex items-center justify-center py-0">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative bg-white px-4 text-sm text-gray-500">
                            Or continue with
                        </div>
                    </div>

                    {/* Google Sign In */}
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full py-4 px-5 bg-white border border-gray-200 rounded-full font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200/50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3"
                    >
                        <FcGoogle className="text-xl" />
                        <span>Sign up with Google</span>
                    </button>

                    {/* Sign In Link */}
                    <div className="text-center pt-2">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="text-secondary hover:text-secondary-hover font-semibold transition-colors underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </>
    )
}

export default RegisterForm