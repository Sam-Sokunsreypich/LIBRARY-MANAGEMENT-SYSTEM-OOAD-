import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import { createSupabaseBrowserClient } from "./browser";
import { success } from "zod";

async function getStorage(){
    const supabase = await createSupabaseBrowserClient();
    return supabase.storage;
}

type UploadProps = {
    file: File;
    bucket: string;
    folder?: string;
}

export async function uploadImage({file, bucket, folder}: UploadProps){
    const fileName = file.name;
    const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
    const path = `${folder ? folder + "/" : ""}${uuidv4()}.${fileExtension}`;

    try{
        file = await imageCompression(file, {
            maxSizeMB: 1,
            useWebWorker: true,
        });
    }catch(error: any){
        console.error("Compression error: ", error.message);
        return { imageUrl: "", error: error.message || "Image compression failed"};
    }

    const storage = await getStorage();
    const { data, error } = await storage.from(bucket).upload(path, file);

    if (error){
        console.error("Upload error: ", error.message);
        return { imageUrl: "", error: "Upload failed: " + error.message};
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${data?.path}`;

    return {imageUrl, error: ""};
}

export async function deleteImage({imageUrl, bucket}: {imageUrl: string, bucket: string}){
    if(!imageUrl) return {success: false, error: "No image URL provided"};

    try{
        const storage = await getStorage();

        const path = imageUrl.split(`${bucket}/`)[1];
        if(!path) throw new Error("Invalid image URL format");

        const { error } = await storage.from(bucket).remove([path]);
        if(error) throw error;

        return { success:true, error: ""}
    }catch (error: any){
        console.error("Failed to delete image", error.message);
        return {success: false, error: error.message};
    }
}