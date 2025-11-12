import { createSupabaseBrowserClient } from "@/lib/supabase/storage/browser";
import { deleteImage } from "@/lib/supabase/storage";
import { uploadImage } from "@/lib/supabase/storage";

export async function replaceImage({
    oldImageUrl,
    newFile,
    bucket,
    table,
    recordId,
    folder,
}:{
    oldImageUrl: string | null;
    newFile: File;
    bucket: string;
    table: string;
    recordId: string | number;
    folder?: string;

}){
    const supabase = await createSupabaseBrowserClient();

    try{
        if(oldImageUrl){
        const { success, error } = await deleteImage({imageUrl: oldImageUrl, bucket});
        if(!success) console.warn("Delete warning", error);
    }

    const {imageUrl, error} = await uploadImage({file: newFile, bucket, folder});
    if(error) throw new Error(error);

    const { error: dbError } = await supabase
    .from(table)
    .update({imageUrl: imageUrl})
    .eq("id", recordId);

    if(dbError) throw dbError;

    return {imageUrl, error: ""};
    }catch(error: any){
        console.error("Replace image failed", error.message);
        return { success:false, error: error.message};
    }
}