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
import { toast } from "sonner"

interface Props {
  onApprove?: () => void
}

export function ApproveRequest({ onApprove }: Props) {

   const handleApprove = async () => {
  if (onApprove) {
    await onApprove();
  }
};


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
            Are you sure, Do you want to approve this request?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end gap-3 pt-4">
              <AlertDialogCancel className="bg-gray-400 hover:bg-gray-500 text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700 text-white">
                Approve
              </Button>
              </AlertDialogAction>
            </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
