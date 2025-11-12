"use client";
import { Button } from "@/components/ui/button";
import React, { useTransition} from "react";
import { deleteMemberById } from "../../actions";
import { toast } from "sonner";

export default function DeleteMember({ user_id }: {user_id: string}){
    const [isPending, startTransition] = useTransition();

    const onSubmit =  () => {
        startTransition(async () => {
            const result = JSON.parse(await deleteMemberById(user_id));

        if(result?.error?.message){
            toast.error("Failed to delete");
        }else{
            toast.success("Successfully delete");
          }
        })
    }
    return(
        <form action={onSubmit}>
            <Button className="bg-red-100 border border-red-500 rounded-xl text-red-700">
                Delete
            </Button>
        </form>
    )
};
