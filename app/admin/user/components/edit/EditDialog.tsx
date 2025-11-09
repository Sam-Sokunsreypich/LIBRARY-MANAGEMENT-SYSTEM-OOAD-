import { Button } from "@/components/ui/button";
import DialogForm from "./DialogForm";
import EditForm from "./EditorForm";
import { Member } from "@/lib/types";

export default function EditDialogForm({ member }: { member: Member }) {
    return (
        <DialogForm
            id="create-trigger"
            title="Edit Member"
            Trigger={
                <Button className="
                    p-1
                    px-5
                    bg-blue-100
                    text-blue-700 
                    border-2 border-blue-500 
                    rounded-xl transition-none 
                    hover:bg-blue-50
                ">
                    Edit
                </Button>
            }
            form={<EditForm member={member} />}
        />
    );
}
