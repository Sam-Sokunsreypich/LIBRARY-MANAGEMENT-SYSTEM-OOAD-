"use client";
import { 
    Form,
    FormItem,
    FormControl,
    FormLabel,
    FormField,
    FormMessage
} from "@/components/ui/form";
import { Member } from "@/lib/types";
import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { updateMemberBasicById } from "../../actions";
import { convertBlobUrlToFile } from "@/app/admin/books/actions/image";
import { deleteImage, uploadImage } from "@/lib/supabase/storage";
import ProfileButton from "@/components/profiles/profileButton";
import Image from "next/image";
import { toast } from "sonner";

const BasicSchema = z.object({
    identity: z.string().optional(),
    profile_image: z.string().optional(),
    name: z.string().min(1, "Name is required").optional(),
    email: z.string().optional(),
    password: z
        .string()
        .min(6, { message: "Password should be 6 characters" }).optional(),
	});

export default function BasicEdit({ member }: { member: Member }) {
    const [imageUrls, setImageUrls] = useState<string[]>(
		member.profile_image ? [member.profile_image] : []
	);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof BasicSchema>>({
        resolver: zodResolver(BasicSchema),
        defaultValues: {
            identity: member.identity,
            profile_image: member.profile_image,
            name: member.name,
            email: member.email,
        }
    });

    console.log(form);


    async function uploadAllImages(oldImageUrl: string) {
        if (imageUrls.length === 0) return oldImageUrl;

        try {
            if (oldImageUrl) {
                const { success, error } = await deleteImage({
                    imageUrl: oldImageUrl,
                    bucket: "book_image/profile",
                });
                if (!success) console.warn("Delete warning", error);
            }

            const uploadedUrls: string[] = [];
            for (const url of imageUrls) {
                const imageFile = await convertBlobUrlToFile(url);
                const { imageUrl, error } = await uploadImage({
                    file: imageFile,
                    bucket: "book_image/profile",
                });
                if (error) throw new Error("Image Upload failed: " + error);
                uploadedUrls.push(imageUrl);
            }

            return uploadedUrls[0];
        } catch (error: any) {
            console.error("Upload failed: ", error.message);
            throw error;
        }
    }

    async function onSubmit(data: z.infer<typeof BasicSchema>) {
        if (!member?.id) {
            console.error("Member ID is undefined. Cannot update.");
            return;
        }

        startTransition(async () => {
            try {
                let newImageUrl = member.profile_image;
                const uploadedUrl = await uploadAllImages(member.profile_image);

                if (uploadedUrl) {
                    data.profile_image = uploadedUrl;
                    newImageUrl = uploadedUrl;
                }

                const updatedData = {
                    ...Object.fromEntries(
                        Object.entries(data).filter(([_, value]) => value !== undefined && value !== "")
                    ),
                    ...(newImageUrl && { profile_image: newImageUrl }),
                };

                const result = await updateMemberBasicById(member.id, updatedData);
                console.log("Updated:", result);

                document.getElementById("basic-form")?.click();

                toast.success("Update Successfully");
            } catch (err) {
                console.error("Failed to update member:", err);
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-center">
                {/* Profile Image */}
				<FormLabel>Profile Image:</FormLabel>
				<div className="flex gap-4">
					{/* ProfileButton will show existing image */}
					<ProfileButton imageUrls={imageUrls} setImageUrls={setImageUrls} />
				</div>

                {/* Member ID */}
                <FormField
                    control={form.control}
                    name="identity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Member ID:</FormLabel>
                            <FormControl>
                                <Input {...field} value={field.value ?? ""} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name:</FormLabel>
                            <FormControl>
                                <Input {...field} value={field.value ?? ""} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email:</FormLabel>
                            <FormControl>
                                <Input {...field} value={field.value ?? ""} />
                            </FormControl>
                        </FormItem>
                    )}
                />

            {/* Password */}
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="******"
                                type="password"
                                onChange={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="flex gap-2 justify-end">
                <button
                    type="submit"
                    disabled={isPending}
                    className="px-4 py-1 bg-white border border-gray-500 text-gray-600 rounded-xl"
                    onClick={() => document.getElementById("basic-form")?.click()}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="px-4 py-1 border bg-yellow-200 border-amber-500 text-amber-600 rounded-xl"
                >
                    {isPending ? "Updating..." : "Update"}
                </button>
            </div>
            </form>
        </Form>
    );
}
