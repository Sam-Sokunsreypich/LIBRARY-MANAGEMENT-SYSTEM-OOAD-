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
import { useTransition } from "react";
import { updateMemberAccountById } from "../../actions";
import type { Member } from "@/lib/types";


const FormSchema = z
	.object({
		email: z.string().email("Invalid email"),
		password: z.string().optional(),
		confirm: z.string().optional(),
	})
	.refine((data) => data.password === data.confirm, {
		message: "Password doesn't match",
		path: ["confirm"],
	});

export default function AccountForm({member}:{member:Member}) {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: member.email,
			password: "",
			confirm: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		startTransition(async () => {
			const { error } = JSON.parse(
				await updateMemberAccountById(member.memberId, data)
			);

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
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
				{/* Email */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="email@gmail.com"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Password */}
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="******" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Confirm Password */}
				<FormField
					control={form.control}
					name="confirm"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="******" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Submit Button */}
				<Button
					type="submit"
					className="flex gap-2 items-center w-full"
					variant="outline"
					disabled={isPending}
				>
					Update
					<AiOutlineLoading3Quarters
						className={cn("animate-spin", { hidden: !isPending })}
					/>
				</Button>
			</form>
		</Form>
	);
}
