"use client"
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoutes({ children }) {
    const user = useAuthStore(state => state.user);
    const router = useRouter();


    useEffect(() => {
        if (!user) {
            router.replace('/login')
        }
    }, [user]);

    return (
        <>
            {children}
        </>
    )
}