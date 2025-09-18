import { supabase } from "./supabaseClient";

export const addNewRecipe = async (recipeData) => {
    try {
        const { data, error } = await supabase.from("recipes").insert(recipeData).select("*");

        if (error) throw new Error(error.message);
        return data;
    } catch (err) {
        console.error("Insert error:", err.message);
        throw err;
    }
};

export async function uploadFile(file, bucket = "images", path = null) {
    try {
        if (!file) throw new Error("No file selected");

        const filePath = path || `${Date.now()}-${file.name}`;

        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
            });

        if (error) throw error;

        return { success: true, path: data.path };
    } catch (err) {
        console.error("File upload error:", err.message);
        return { success: false, error: err.message };
    }
}
export const getAllRecipes = async () => {
    try {
        const { data, error } = await supabase
            .from("recipes")
            .select(`
        *,
        chef:users (
          id,
          full_name,
          avatar_url,
          email,
          role
        )
      `);

        if (error) throw new Error(error.message);
        return data;
    } catch (err) {
        console.error("Get Recipes error:", err.message);
        throw err;
    }
};

export const getImageUrl = async (path, bucketName = "images") => {
    try {
        const { data } = supabase
            .storage
            .from(bucketName)
            .getPublicUrl(path);

        return data.publicUrl;
    }
    catch (err) {
        throw new Error(err.message)
    }
}