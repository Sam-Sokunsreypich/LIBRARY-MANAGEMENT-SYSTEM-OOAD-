import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import { createSupabaseBrowserClient } from "./browser";

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