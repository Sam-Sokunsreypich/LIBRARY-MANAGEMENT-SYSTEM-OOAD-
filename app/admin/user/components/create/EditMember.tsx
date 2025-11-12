"use client";
import { Button } from "@/components/ui/button";
import DialogForm from "../edit/DialogForm";
import BasicForm from "../edit/BasicForm";
import { Member } from "@/lib/types";
import BasicEdit from "./BasicEdit";

interface BasicMembersProps{
    member: Member
}
export default function EditMember({ member }: BasicMembersProps) {
  return (
    <DialogForm
      id="basic-form"
      title="Edit Member"
      Trigger={
        <Button
          className=" 
            px-5
            bg-blue-100
            text-blue-700 
            border border-blue-500 
            rounded-xl 
            transition-none 
            hover:bg-blue-50
          "
        >
          Edit
        </Button>
      }
      form={<BasicEdit member={member} />}
    />
  );
}