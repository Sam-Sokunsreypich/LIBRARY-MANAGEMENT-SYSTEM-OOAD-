"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { useState } from "react"

interface Props {
  onApprove?: (data: { start_date: string; end_date: string }) => void
}

export function ApproveRequest({ onApprove }: Props) {
  const form = useForm({
    defaultValues: {
      start_date: "",
      end_date: "",
    },
  })

  const onSubmit = (data: { start_date: string; end_date: string }) => {
    if (onApprove) onApprove(data)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700" size="sm">
          Approve
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Approve Request</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter the start and end dates before approving.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <AlertDialogCancel className="bg-gray-400 hover:bg-gray-500 text-white">
                Cancel
              </AlertDialogCancel>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                Approve
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
