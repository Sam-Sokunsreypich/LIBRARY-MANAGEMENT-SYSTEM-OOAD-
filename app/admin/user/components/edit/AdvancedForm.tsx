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
	FormDescription,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { updateMemberAdvanceById } from "../../actions";
import { useTransition } from "react";
import type { Permission } from "@/lib/types";

const FormSchema = z.object({
	role: z.enum(["admin", "user", "staff"]),
	status: z.enum(["active", "resigned"]),
});

export default function AdvancedForm({ permission }: { permission: Permission }) {
	const [isPending, startTransition] = useTransition();

	const roles = ["admin", "user", "staff"] as const;
	const statuses = ["active", "resigned"] as const;

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			role: permission.role || "user",
			status: permission.status || "active",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		startTransition(async () => {
			try {
				const { error } = JSON.parse(
					await updateMemberAdvanceById(permission.permissionId, data)
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
			} catch (err) {
				toast.error("Unexpected error");
				console.error(err);
			}
		});
	}

	if (!permission) return null;

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-6"
			>
				{/* Role Field */}
				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role</FormLabel>
							<Select
								value={field.value}
								onValueChange={field.onChange}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a role" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{roles.map((role) => (
										<SelectItem key={role} value={role}>
											{role}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Status Field */}
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<Select
								value={field.value}
								onValueChange={field.onChange}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select user status" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{statuses.map((status) => (
										<SelectItem key={status} value={status}>
											{status}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								“Resigned” means the user no longer works here.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

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
