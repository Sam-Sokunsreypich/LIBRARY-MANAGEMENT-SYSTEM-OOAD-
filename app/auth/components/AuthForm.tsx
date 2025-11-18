"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
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
import { loginWithEmailAndPassword } from "../actions";
import { AuthTokenResponse } from "@supabase/supabase-js";

const FormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, { message: "Password can not be empty" }),
});

export default function AuthForm() {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		startTransition(async () => {
			const { error } = JSON.parse(
				await loginWithEmailAndPassword(data)
			) as AuthTokenResponse;

			if (error) {
				toast.error(
					"Fail to login",{
					description: (
						<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">{error.message}</code>
						</pre>
					),
				});
			} else {
				toast.success(
					"Successfully login 🎉",
				);
			}
		});
	}

	return (
		<div className="w-100 h-80 rounded-xl border border-gray-500 p-5 bg-white">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-6 "
				>
					<FormLabel className="flex justify-center text-lg">Login Account</FormLabel>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input 
									placeholder="example@gmail.com" {...field}
									className="border border-gray-500" />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="******"
										{...field}
										type="password"
										className="border border-gray-500"
									/>
								</FormControl>
								<FormDescription>
									{
										"contact your admin if you forgot your password"
									}
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						variant="outline"
						className="
						w-full flex items-center 
						gap-2 bg-amber-200
						text-amber-700 
						border-2 border-amber-600
						hover:bg-amber-500 hover:text-amber-50
						transition duration-75"
					>
						Login{" "}
						<AiOutlineLoading3Quarters
							className={cn("animate-spin", {
								isPending,
								hidden: true,
							})}
						/>
					</Button>
				</form>
			</Form>
		</div>
	);
}
