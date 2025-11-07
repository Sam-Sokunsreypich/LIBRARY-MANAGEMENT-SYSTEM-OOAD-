"use client"

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

interface EditRuleProps{
    open : boolean,
    onOpenChange: (open: boolean)=> void,
    defaultValues?: z.infer<typeof formSchema>
    onSubmitData?: (values: z.infer<typeof formSchema>) => void
}


const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(8, {
    message: "Title must be at least 8 characters.",
  }),
  fine: z.number().min(0,
    {message:"Fine must be positive"}
  ),
})

export default function EditFine({open, onOpenChange, defaultValues, onSubmitData}:EditRuleProps) {
 const [isModalOpen, setIsModalOpen] = useState(false)

   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      fine: 0,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setIsModalOpen(false)
  }
  

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
         <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Rule of Fine</DialogTitle>
            </DialogHeader>
             <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your Description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          
        />
        <FormField
          control={form.control}
          name="fine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fine</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
         </DialogContent>

    </Dialog>
  )
}
