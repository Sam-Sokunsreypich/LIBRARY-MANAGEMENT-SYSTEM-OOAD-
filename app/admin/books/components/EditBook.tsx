"use client";
import { 
    Form,
    FormControl,
    FormItem,
    FormDescription,
    FormLabel,
    FormField,
    FormMessage,
 } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Books, Categories, Subcategories } from "@/lib/types/booktype";
import { useEffect, useState, useTransition } from "react";
import { fetchCategoriesAndSubcategories } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { convertBlobUrlToFile } from "../actions/image";
import { uploadImage } from "@/lib/supabase/storage";
import { updateBookInfo } from "../actions/book";
import { toast } from "sonner";
import UploadImageButton from "./UploadButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";

const UpdateSchema = z.object({
  book_id: z.string(),
  book_image: z.string(),
  book_title: z.string(),
  publication_year: z.string(),
  book_total: z.number().min(1, { message: "Total must be more than 1." }),
  book_location: z.string(),
  book_description: z.string(),
  category_id: z.string(),
  subcategory_id: z.string(),
});

export default function EditBookForm({book}:{book: Books}){
    const [imageUrls, setImageUrls] = useState<string[]>([]);
  const[isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateSchema>>({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      book_id: book.book_id,
      book_image: book.book_image,
      book_title: book.book_title,
      publication_year: book.publication_year,
      book_total: book.book_total,
      book_location: book.book_location,
      book_description: book.book_description,
      category_id: book.category_id,
      subcategory_id: book.subcategory_id,
    }
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


  function onSubmit(data: z.infer<typeof UpdateSchema>){
    startTransition(async() => {
      const result = JSON.parse(await updateBookInfo(book.book_id, data));
      if (result?.error) {
				toast.error("Failed to update", {
					description: (
						<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">{result.error.message}</code>
						</pre>
					),
				});
			} else {
				document.getElementById("trigger")?.click();
				toast.success("Successfully updated!");
			}
    })
  }
  const currentSubcategory = data?.subcategories.find((sub) => String(sub.subcategory_id) === String(book.subcategory_id));
  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

      {/* Book Image */}
      <FormLabel>Book Image:</FormLabel>
       <div className="flex h-59">
              <UploadImageButton imageUrls={imageUrls} setImageUrls={setImageUrls}/>
              <Image 
              src={book.book_image}
              alt={book.book_title || "Book image"}
              className="p-1 ml-1"
              width={160}
              height={0}
              />
        </div>

        <div className="border-t border-gray-300"></div>
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

        
         

        <div className="flex gap-2">
          {/* Category */}
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => {
            // Find the currently selected category object
            const currentCategory = data?.categories.find(
              (cat) => String(cat.category_id) === String(field.value || book.category_id)
            );

            return (
              <FormItem>
                <FormLabel>Category: </FormLabel>
                <FormControl>
                  <Select
                    value={field.value || String(book.category_id)}
                    onValueChange={(val) => {
                      field.onChange(val);
                      form.setValue("subcategory_id", ""); // reset subcategory
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue>{currentCategory?.category_name}</SelectValue>
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
            );
          }}
        />


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
                    value={field.value || String(book.subcategory_id)}
                    disabled={!selectedCategoryId}>
                        <SelectTrigger>
                            <SelectValue placeholder={currentSubcategory?.subcategory_name || "Select Subcategory"}/>
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
        <Button 
        type="submit" disabled={isPending} className="bg-amber-200 text-amber-700 border border-amber-600 hover:bg-amber-600 hover:text-white">
          {isPending ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Update"}
          
        </Button>
      </form>
    </Form>
  )
}
