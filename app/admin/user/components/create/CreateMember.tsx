import { Button } from "@/components/ui/button";
import DiaglogForm from "../component/DiaglogForm";

import CreateForm from "./CreateForm";

export default function CreateMember(){
    return(
        <DiaglogForm
        id="create-trigger"
        title="Create Member"
        Trigger={<Button className="
            h-12 
            p-2
            px-10
            bg-blue-100
            text-blue-700 
            border-2 border-blue-500 
            rounded-xl transition-none 
            hover:bg-blue-50 
            "
            >Create Members</Button>}
        form = {<CreateForm/>}
        />
    )
}