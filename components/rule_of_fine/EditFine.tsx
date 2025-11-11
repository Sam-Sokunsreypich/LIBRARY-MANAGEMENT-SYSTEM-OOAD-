"use client"

import { useEffect, useState } from 'react'
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
import { toast } from 'sonner'
import { getRule, updateRule } from '@/app/admin/rule_of_fine/action/rule'

interface EditRuleProps{
    open : boolean,
    onOpenChange: (open: boolean)=> void,
    defaultValues?: z.infer<typeof formSchema>
    onSubmitData?: (values: z.infer<typeof formSchema>) => void
}


const formSchema = z.object({
  id: z.number(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(8, {
    message: "Title must be at least 8 characters.",
  }),
  fine: z.number().min(0, { message: "Fine must be positive" })
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

   useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!defaultValues?.id) {
        toast.error("Missing rule ID!");
        return;
      }

      await updateRule(defaultValues.id, values);
      toast.success("Rule updated successfully!");
      onSubmitData?.({ ...values, id: defaultValues.id });
      onOpenChange(false);
      await getRule();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update rule");
    }
  }
  

  return (
    <Dialog  open={open} onOpenChange={onOpenChange}>
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
                <Input placeholder={defaultValues?.title} {...field} />
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
                <Input placeholder={defaultValues?.description} {...field} />
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
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          
        />
        <div className='gap-3 flex justify-end'>
          <Button type='button' onClick={() => onOpenChange(false)} className='bg-gray-400 hover:bg-gray-500 text-white'>Cancel</Button>
          <Button className='bg-orange-500 hover:bg-orange-600 text-white' type="submit">Save</Button>
        </div>
      </form>
    </Form>
         </DialogContent>

    </Dialog>
  )
}
