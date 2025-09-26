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
export async function uploadFile(
    file,
    bucket = "images",
    customPath = null,
    options = {}
) {
    const {
        cacheControl = "3600",
        upsert = false,
        pathGenerator = null
    } = options;

    try {
        // Validation
        if (!file) {
            throw new Error("No file selected");
        }

        if (!(file instanceof File)) {
            throw new Error("Invalid file object");
        }

        // Validate file size (10MB default limit)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            throw new Error(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
        }

        // Generate file path
        let filePath;
        if (customPath) {
            filePath = customPath;
        } else if (pathGenerator && typeof pathGenerator === 'function') {
            filePath = pathGenerator(file);
        } else {
            // Default path generation with sanitized filename
            const timestamp = Date.now();
            const randomString = Math.random().toString(36).substring(2, 8);
            const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
            filePath = `${timestamp}-${randomString}-${sanitizedName}`;
        }

        console.log(`Uploading file to: ${bucket}/${filePath}`);
        console.log(`FILE: ${file}`);

        // Upload file
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
                cacheControl,
                upsert,
            });

        if (error) {
            throw new Error(`Upload failed: ${error.message}`);
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path);

        return {
            success: true,
            path: data.path,
            url: urlData.publicUrl
        };

    } catch (error) {
        console.error("File upload error:", error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

export async function deleteFile(path, bucket = "images") {
    try {
        const { error } = await supabase.storage
            .from(bucket)
            .remove([path]);

        if (error) {
            throw new Error(`Delete failed: ${error.message}`);
        }

        return { success: true };
    } catch (error) {
        console.error("File delete error:", error.message);
        return {
            success: false,
            error: error.message
        };
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

export const getRecipeById = async (id) => {
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
      `).eq("id", id)   // filter by id
            .single();      // since only one recipe should match

        if (error) throw new Error(error.message);
        return data;
    } catch (err) {
        console.error("Get Recipes error:", err.message);
        throw err;
    }
};

export const getRecipesByUserId = async (id) => {
    console.log("Fetching recipes for user ID:", id);
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
      `).eq("user_id", id)   // filter by user id
            .order('created_at', { ascending: false }); 

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