import { 
    Dialog, 
    DialogHeader,
    DialogContent,
    DialogTitle,
    DialogTrigger } from "@/components/ui/dialog";
import { ReactNode } from "react";

export default function DiaglogForm({
    Trigger,
    id,
    title,
    form,
}: {
    title: string;
    Trigger: ReactNode;
    id: string;
    form: ReactNode;
}){
    return(
        <Dialog>
            <DialogTrigger asChild id={id}>
                <div>
                    {Trigger}
                </div>
            </DialogTrigger>
            <DialogContent className="
            ">
                <div className="
                ">
                    <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {form}
                </div>
            </DialogContent>
        </Dialog>
    )
}