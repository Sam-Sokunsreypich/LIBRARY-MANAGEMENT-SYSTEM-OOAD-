"use client";
import { Button } from "@/components/ui/button";
import DialogForm from "../edit/DialogForm";
import BasicForm from "../edit/BasicForm";
import { Member } from "@/lib/types";
import BasicEdit from "./BasicEdit";
import { FaGear } from "react-icons/fa6";
import Log from "./Log";

interface BasicMembersProps{
    member: Member
}
export default function LogForm({ member }: BasicMembersProps) {
  return (
    <DialogForm
      id="edit-trigger"
      title="Edit Member"
      Trigger={
        <Button
          className="bg-white
          "
        >
          <FaGear className="text-black"/>
        </Button>
      }
      form={<Log member={member} />}
    />
  );
}