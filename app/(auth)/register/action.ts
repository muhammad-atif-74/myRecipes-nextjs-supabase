import { supabase } from '../../lib/supabaseClient'

export const registerUser = async (formData) => {
    try {
        const { email, password } = formData;
        if (!email || !password) {
            throw new Error("Email and password are required");
        }
        console.log(email, password)
        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
        });

        if (error) throw new Error(error.message);
        return data;
    }
    catch (err) {
        console.log(err)
        throw new Error(err);
    }
}

export const loginUser = async (formData) => {
    try {
        const { email, password } = formData;
        if (!email || !password) {
            throw new Error("Email and password are required");
        }
        console.log(email, password)
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        if (error) throw new Error(error.message);
        return data;
    }
    catch (err) {
        console.log(err)
        throw new Error(err);
    }
}

export const addUserProfile = async (userData) => {
    try {
        const { email, fullName, role, id, avatarUrl } = userData;
        if (!email || !id) {
            throw new Error("Email and id are required");
        }
        const { data, error } = await supabase.from("users").insert({
            id,
            role,
            email,
            full_name: fullName,
            avatar_url: avatarUrl
        });

        if (error) throw new Error(error.message);
        return data;
    }
    catch (err) {
        console.log(err)
        throw new Error(err);
    }
}