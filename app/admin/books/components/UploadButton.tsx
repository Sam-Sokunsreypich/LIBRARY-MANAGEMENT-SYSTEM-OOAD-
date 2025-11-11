"use client";
import Image from "next/image";
import { ChangeEvent, useRef } from "react";
import { FaPlus } from "react-icons/fa";

interface UploadImageButtonProps{
    imageUrls: string[];
    setImageUrls: (urls: string[]) => void;
}

export default function UploadImageButton({imageUrls, setImageUrls}: UploadImageButtonProps){
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const fileArray = Array.from(e.target.files);
            const newImageUrls = fileArray.map((file) => URL.createObjectURL(file))
            setImageUrls([...imageUrls, ...newImageUrls]);
        }
    };

    return(
        <div className="flex gap-5 items-center">
            <input 
            type="file"
            multiple
            hidden
            ref={imageInputRef}
            onChange={handleImageChange} />

            <button
            type="button"
            onClick={()=> imageInputRef.current?.click()}
            className="w-35 h-50 p-2 bg-gray-300 flex items-center justify-center">
                <FaPlus className="text-gray-700 text-5xl"/>
            </button>


            <div>
                {imageUrls.map((url, index) => (
                    <Image
                    key={url}
                    src={url}
                    className="border border-gray-500"
                    width={150}
                    height={250}
                    alt={`img-${index}`}
                    />
                ))}
            </div>
        </div>
    )
}