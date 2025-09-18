"use client";

import { supabase } from "@/app/lib/supabaseClient";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useEffect } from "react";
import { ensureUserProfile } from '../../(auth)/action'

export default function AuthClient() {
    const setUser = useAuthStore((state) => state.setUser)
    const clearUser = useAuthStore((state) => state.clearUser)

    useEffect(() => {
        let subscription;

        supabase.auth.getSession().then(({ data: session }) => {
            setUser(session?.user ?? null)
        })

        const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session) {
                setUser(session?.user);
                await ensureUserProfile(session.user);
            }
            else clearUser();
        })

        subscription = data?.subscription;

        return () => subscription.unsubscribe();
    }, [setUser, clearUser])

    return null;
}