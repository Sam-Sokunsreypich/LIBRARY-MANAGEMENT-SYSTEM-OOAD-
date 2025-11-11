"use client";

import DialogForm from "../../user/components/edit/DialogForm";
import { Button } from "@/components/ui/button";
import EditBook from "./EditBook";
import { Books } from "@/lib/types/booktype";

interface EditButtonProps {
  book: Books; // make it required, since EditBook needs it
}

export default function EditButton({ book }: EditButtonProps) {
  return (
    <DialogForm
      id="trigger"
      title="Edit Book Information"
      Trigger={
        <Button
          className="
            w-20
            h-7
            border border-green-600
            text-green-700
            bg-green-200
            text-sm
            rounded-xl
            hover:bg-green-500
            hover:text-white
          "
        >
          Edit Book
        </Button>
      }
      form={<EditBook book={book} />}
    />
  );
}
