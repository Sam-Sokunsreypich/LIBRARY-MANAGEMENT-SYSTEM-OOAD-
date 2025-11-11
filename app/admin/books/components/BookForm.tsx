"use client";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery } from "@tanstack/react-query";
import UploadImageButton from "./UploadButton";
import { convertBlobUrlToFile } from "../actions/image";
import { uploadImage } from "@/lib/supabase/storage";
import { createBooks } from "../actions/book";
import { Books, Categories, Subcategories } from "@/lib/types/booktype";
import { fetchCategoriesAndSubcategories } from "@/lib/api";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

const FormSchema = z.object({
  book_id: z.string().min(5, { message: "Please enter Book ID" }),
  book_image: z.string(),
  book_title: z.string().min(2, { message: "Book Title must be 2 characters" }),
  publication_year: z.string().min(4, { message: "Please Enter a Publication Year" }),
  book_total: z.number().min(1, { message: "Enter Book Total" }),
  book_location: z.string(),
  book_description: z.string(),
  category_id: z.string(),
  subcategory_id: z.string(),
  author_first_name: z.string(),
  author_last_name: z.string(),
});

export default function BookForm({ book }: { book?: Books }) {
  // --- Hooks ---
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      book_id: "",
      book_image: "",
      book_title: "",
      publication_year: "",
      book_total: 1,
      book_location: "",
      book_description: "",
      category_id: "",
      subcategory_id: "",
      author_first_name: "",
      author_last_name: "",
    },
  });

  const selectedCategoryId = form.watch("category_id");
  const selectedSubcategoryId = form.watch("subcategory_id");
  const { data, isLoading, error } = useQuery<{ categories: Categories[]; subcategories: Subcategories[] }>({
    queryKey: ["categories-subcategories"],
    queryFn: fetchCategoriesAndSubcategories,
  });

  const filteredSubcategories = data?.subcategories.filter(
    (sub) => String(sub.category_id) === String(selectedCategoryId),
  ) || [];

  useEffect(() => {
    form.setValue("subcategory_id", "")
  },
  [selectedCategoryId, form]);


  if (isLoading) return <p>Loading Categories...</p>;
  if (error || !data) return <p>Failed to fetch categories</p>;

  // --- Image Upload ---
  async function uploadAllImages() {
    const uploadedUrls: string[] = [];

    for (const url of imageUrls) {
      const imageFile = await convertBlobUrlToFile(url);
      const { imageUrl, error } = await uploadImage({ file: imageFile, bucket: "book_image" });
      if (error) throw new Error("Image Upload failed: " + error.message);
      uploadedUrls.push(imageUrl);
    }
    return uploadedUrls;
  }

  // --- Form Submission ---
  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      try {
        const uploadedUrls = await uploadAllImages();
        const bookData: Books = {
          book_id: formData.book_id,
          book_image: uploadedUrls[0] || "",
          book_title: formData.book_title,
          publication_year: formData.publication_year,
          book_total: formData.book_total,
          book_location: formData.book_location,
          book_description: formData.book_description,
          category_id: formData.category_id,
          subcategory_id: formData.subcategory_id,
          author: {
            author_first_name: formData.author_first_name,
            author_last_name: formData.author_last_name,
          },
          authorId: undefined
        };
        await createBooks({ book: bookData });
        console.log("Book submitted: ", bookData);

        toast.success("Book Submitted Successfully!");
        document.getElementById("create-trigger")?.click();
      } catch (err) {
        console.error("Submission failed: ", err);

        toast.error("Failed to create Book");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Book Image */}
        <FormLabel>Book Image:</FormLabel>
        <UploadImageButton imageUrls={imageUrls} setImageUrls={setImageUrls}/>

        <div className="flex justify-between">
          {/* Book ID */}
        <FormField
          control={form.control}
          name="book_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book ID:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Book Title */}
        <FormField
          control={form.control}
          name="book_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Title:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <div className="flex justify-between gap-2">
          {/* Publication Year */}
        <FormField
          control={form.control}
          name="publication_year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publication Year:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Book Total */}
        <FormField
          control={form.control}
          name="book_total"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Total:</FormLabel>
              <FormControl>
                <Input 
                type="number" {...field} 
                onChange = {(event) => {
                    const value = event.target.value;
                    field.onChange(value=== "" ? 0 : + value);
                }}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Book Location */}
        <FormField
        control={form.control}
        name="book_location"
        render={({field}) => (
          <FormItem>
            <FormLabel>Book Location:</FormLabel>
            <FormControl>
              <Input type="text" {...field}/>
            </FormControl>
          </FormItem>
        )}/>
        </div>

        {/* Author */}
        <FormLabel>Author Name:</FormLabel>
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="author_first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author_last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2">
          {/* Category */}
        <FormField
        control={form.control}
        name="category_id"
        render={({field})=> (
            <FormItem>
                <FormLabel>Category: </FormLabel>
                <FormControl>
                    <Select 
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Category"/>
                        </SelectTrigger>
                        <SelectContent>
                        {data?.categories.map((cat: Categories) => (
                            <SelectItem key={cat.category_id} value={String(cat.category_id)}>
                            {cat.category_name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </FormControl>
            </FormItem>
        )}/>

        {/* Subcategory */}
        <FormField
        control={form.control}
        name="subcategory_id"
        render={({field})=> (
            <FormItem>
                <FormLabel>Subcategory: </FormLabel>
                <FormControl>
                    <Select 
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                    disabled={!selectedCategoryId}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Subcategory "/>
                        </SelectTrigger>
                        <SelectContent>
                        {filteredSubcategories.map((sub: Subcategories) => (
                            <SelectItem key={sub.subcategory_id} value={String(sub.subcategory_id)}>
                            {sub.subcategory_name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </FormControl>
            </FormItem>
        )}/>
        </div>

        {/* Book Description */}
        <FormField
        control={form.control}
        name="book_description"
        render={({field})=> (
          <FormItem>
            <FormLabel>Book Description:</FormLabel>
            <FormControl>
              <Textarea {...field}
              rows={50}
              className="h-10"/>
            </FormControl>
          </FormItem>
        )}/>
        <Button type="submit" disabled={isPending} className="bg-amber-200 text-amber-700 border-2 border-amber-600 hover:bg-amber-600 hover:text-white">
          {isPending ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
