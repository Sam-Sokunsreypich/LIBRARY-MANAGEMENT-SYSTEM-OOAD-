"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { updateMemberBasicById } from "../../actions";
import { useTransition } from "react";
import type { Member } from "@/lib/types";

const FormSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
});

export default function BasicForm({ member }: { member: Member }) {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: member?.name || "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		startTransition(async () => {
			const { error } = JSON.parse(await updateMemberBasicById(member.memberId, data));
			if (error?.message) {
				toast.error("Failed to update", {
					description: (
						<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">{error.message}</code>
						</pre>
					),
				});
			} else {
				document.getElementById("create-trigger")?.click();
				toast.success("Successfully updated!");
			}
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-6"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Display Name</FormLabel>
							<FormControl>
								<Input placeholder="name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="flex gap-2 items-center w-full"
					variant="outline"
				>
					Update{" "}
					<AiOutlineLoading3Quarters
						className={cn("animate-spin", { hidden: !isPending })}
					/>
				</Button>
			</form>
		</Form>
	);
}
