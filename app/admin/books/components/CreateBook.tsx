"use client";
import DialogForm from "../../user/components/edit/DialogForm";
import { Button } from "@/components/ui/button";
import BookForm from "./BookForm";

export default function CreateBook(){
    return(
        <DialogForm
        id="create-trigger"
        title="Add New Book"
        Trigger = {
        <Button
        className="
        border border-amber-600
        text-amber-600
        bg-amber-200
        mt-5
        rounded-lg
        px-5
        hover:bg-amber-500
        "
        >
            + Add Book
        </Button>}
        form={<BookForm/>}/>

    )
}