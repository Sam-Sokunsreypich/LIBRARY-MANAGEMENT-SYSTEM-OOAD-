"use client";
import { Button } from "@/components/ui/button";
import DialogForm from "../edit/DialogForm";
import { Member } from "@/lib/types";
import EditForm from "./EditForm";
import { FaGear } from "react-icons/fa6";

interface BasicMembersProps{
    member: Member
}
export default function EditDialog({ member }: BasicMembersProps) {
  return (
    <DialogForm
      id="edit-trigger"
      title="Edit Member"
      Trigger={
        <Button
          className=" 
            px-5
            bg-white
            transition-none 
            hover:bg-blue-50
          "
        >
       <FaGear className="text-black"/>
        </Button>
      }
      form={<EditForm member={member} />}
    />
  );
}