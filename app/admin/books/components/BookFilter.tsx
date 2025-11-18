"use client";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button"; 
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fetchCategoriesAndSubcategories } from "@/lib/api";
import { Categories, Subcategories } from "@/lib/types/booktype";
import CreateBook from "./CreateBook";

const FilterSchema = z.object({
  categoryId: z.string().optional(),
  subcategoryId: z.string().optional(),
});

interface BookFilterProps {
  onFilterSubmit: (data: z.infer<typeof FilterSchema>) => void;
}

export default function BookFilter({ onFilterSubmit }: BookFilterProps) {
  const form = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      categoryId: "",
      subcategoryId: "",
    },
  });

  const selectedCategoryId = form.watch("categoryId");

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories-subcategories-filter"],
    queryFn: fetchCategoriesAndSubcategories,
  });

const filteredSubcategories =
  selectedCategoryId && selectedCategoryId !== ""
    ? data?.subcategories.filter(
        (sub: Subcategories) =>
          String(sub.category_id) === String(selectedCategoryId)
      ) || []
    : data?.subcategories || [];


  useEffect(() => {
    form.setValue("subcategoryId", "");
  }, [selectedCategoryId, form]);

  if (isLoading) return <p>Loading Categories...</p>;
  if (error || !data) return <p>Failed to fetch categories</p>;

  const handleSubmit = form.handleSubmit((values) => {
    const filterData = {
      categoryId: values.categoryId || "",
      subcategoryId: values.subcategoryId || "",
    };
    onFilterSubmit(filterData);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div className="flex items-end gap-4">
          {/* 1. Category Field */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category:</FormLabel>
                <Select
                  onValueChange={(value) => {
                    const newValue = value === "all" ? "" : value;
                    field.onChange(newValue);
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {data?.categories.map((cat: Categories) => (
                      <SelectItem
                        key={cat.category_id}
                        value={String(cat.category_id)}
                      >
                        {cat.category_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* 2. Subcategory Field */}
          <FormField
            control={form.control}
            name="subcategoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory:</FormLabel>
                <Select
                  onValueChange={(value) => {
                    const newValue = value === "all" ? "" : value;
                    field.onChange(newValue);
                  }}
                  value={field.value}
                  disabled={
                    !selectedCategoryId || filteredSubcategories.length === 0
                  }
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Subcategory" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="all">All Subcategories</SelectItem>
                    {filteredSubcategories.map((sub: Subcategories) => (
                      <SelectItem
                        key={sub.subcategory_id}
                        value={String(sub.subcategory_id)}
                      >
                        {sub.subcategory_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* 3. Apply Filter Button */}
          <Button type="submit" className="mt-2 bg-purple-100 text-purple-700 border-2 border-purple-600 hover:bg-purple-500 hover:text-purple-50">
            Apply Filter
          </Button>
        </div>


      </form>
    </Form>
  );
}
