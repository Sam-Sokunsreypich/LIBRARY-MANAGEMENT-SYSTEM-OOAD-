"use client";

import { FaCamera } from "react-icons/fa";
import { ChangeEvent, useRef } from "react";
import Image from "next/image";

interface ProfileButtonProps {
	imageUrls: string[];
	setImageUrls: (urls: string[]) => void;
}

export default function ProfileButton({ imageUrls, setImageUrls }: ProfileButtonProps) {
	const imageInputRef = useRef<HTMLInputElement>(null);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			const newImageUrl = URL.createObjectURL(file);
			setImageUrls([newImageUrl]);
		}
	};

	return (
		<div className="flex flex-col items-center gap-3">
			<input
				type="file"
				accept="image/*"
				hidden
				ref={imageInputRef}
				onChange={handleImageChange}
			/>

			<button
				type="button"
				onClick={() => imageInputRef.current?.click()}
				className="relative w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-400 group"
			>
				{imageUrls.length > 0 ? (
					<Image
						src={imageUrls[0]}
						alt="Profile"
						fill
						sizes="128px"
						className="object-cover transition-transform duration-200 group-hover:scale-105"
					/>
				) : (
					<FaCamera className="text-gray-500 text-4xl" />
				)}

				<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
			</button>

			<p className="text-sm text-gray-600">Click to upload</p>
		</div>
	);
}
