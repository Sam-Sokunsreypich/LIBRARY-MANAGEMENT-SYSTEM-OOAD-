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
import { rejectRequest } from '@/app/admin/book_requests/action/acceptBorrow'

interface EditRuleProps{
    open : boolean,
    onOpenChange: (open: boolean)=> void,
    defaultValues?: z.infer<typeof formSchema>
    onSubmitData?: (values: z.infer<typeof formSchema>) => void
}


const formSchema = z.object({
  id: z.number(),
  reject_reason: z.string().min(8, {
    message: "Reason must be at least 8 characters.",
    })
})

export default function RejectRequest({open, onOpenChange, defaultValues, onSubmitData}:EditRuleProps) {
 const [isModalOpen, setIsModalOpen] = useState(false)

   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reject_reason: "",
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

      await rejectRequest(defaultValues.id, values);
      toast.success("The Request has Rejected!");
      onSubmitData?.({ ...values, id: defaultValues.id });
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to Reject");
    }
  }
  

  return (
    <Dialog  open={open} onOpenChange={onOpenChange}>
         <DialogContent>
            <DialogHeader>
                <DialogTitle>Reject Request</DialogTitle>
            </DialogHeader>
             <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="reject_reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Input placeholder={defaultValues?.reject_reason} {...field} />
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
          <Button className='bg-red-500 hover:bg-red-600 text-white' type="submit">Reject</Button>
        </div>
      </form>
    </Form>
         </DialogContent>

    </Dialog>
  )
}
