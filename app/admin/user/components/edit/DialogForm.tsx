"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


interface DiaglogFormProps {
    id: string;
    title: string;
    Trigger: React.ReactNode;
    form: React.ReactNode;
}

export default function DialogForm({ id, title, Trigger, form }: DiaglogFormProps) {
    return (
        <Dialog>
            <DialogTrigger asChild id = {id}>
                {Trigger}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {form}
            </DialogContent>
        </Dialog>
    );
}
