"use client";
import { Input } from "@/components/ui/input";

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
import { toast } from "sonner";
import { Member } from "@/lib/types";
import { 
	Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem } from "@/components/ui/select";
import { createMember } from "../../actions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useEffect, useState, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import { Department, Faculty } from "@/lib/types/facultyType";
import { fetchFacultyAndDepartments } from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";
import { convertBlobUrlToFile } from "@/app/admin/books/actions/image";
import { uploadImage } from "@/lib/supabase/storage";
import ProfileButton from "@/components/profiles/profileButton";

const FormSchema = z
	.object({
		identity: z.string(),
		profile_image: z.string(),
		name: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		role: z.enum(["user", "admin", "staff"]),
		status: z.enum(["active", "resigned"]),
		email: z.string().email(),
		password: z
			.string()
			.min(6, { message: "Password should be 6 characters" }),
		confirm: z
			.string()
			.min(6, { message: "Password should be 6 characters" }),
		faculty_id: z.string().optional(),
		department_id: z.string().optional(),
		description: z.string().optional(),
	})
	.refine((data) => data.confirm === data.password, {
		message: "Passowrd doesn't match",
		path: ["confirm"],
	});

export default function MemberForm() {
	// --- Hooks ---
	const [imageUrls, setImageUrls] = useState<string[]>([]);
	const [isPending, startTransition] = useTransition();
	const roles = ["admin", "user", "staff"];
	const status = ["active", "resigned"];

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			identity: "",
			profile_image: "",
			name: "",
			role: "user",
			status: "active",
			email: "",
			faculty_id: "",
			department_id: "",
			description: "",
		},
	});

	const selectedFacultyId = form.watch("faculty_id");

	const { data, isLoading, error } = useQuery<{
	faculties : Faculty[]; departments: Department[];
	}>({
		queryKey: ["faculties-departments"],
		queryFn: fetchFacultyAndDepartments,
		initialData: { faculties: [], departments: [] },
	});


	useEffect(() => {
		form.setValue("department_id", "")
	}, [selectedFacultyId, form]);

	if(isLoading) return <p>Loading Faculties...</p>
	if(error || !data) return <p>Failed to fetch faculties.</p>


	const filteredDepartments =
  data?.departments?.filter(
    (dep) => String(dep.faculty_id) === String(selectedFacultyId)
  ) || [];

     // --- Image Upload ---
	async function uploadAllImages() {
	const uploadedUrls: string[] = [];

	for (const url of imageUrls) {
		const imageFile = await convertBlobUrlToFile(url);
		const { imageUrl, error } = await uploadImage({ file: imageFile, bucket: "book_image/profile" });
		if (error) throw new Error("Image Upload failed: " + error.message);
		uploadedUrls.push(imageUrl);
	}
	return uploadedUrls;
	}

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		startTransition(async () => {
			try {
				const uploadedUrls = await uploadAllImages();
				if (uploadedUrls.length > 0) {
					data.profile_image = uploadedUrls[0];
				}

				const result = await createMember(data);
				const { error } =
					typeof result === "string" ? JSON.parse(result) : result;

				if (error?.message) {
					toast("Failed to create member", {
						description: (
							<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
								<code className="text-white">{error.message}</code>
							</pre>
						),
					});
				} else {
					document.getElementById("create-trigger")?.click();
					toast("Successfully created user 🎉");
				}
			} catch (err: any) {
				toast("Image upload failed", {
					description: err.message,
				});
			}
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className=" space-y-3"
			>

			{/* Profile Image */}
			<ProfileButton imageUrls={imageUrls} setImageUrls={setImageUrls}/>
			
			{/* Password and Confirm Password */}
				<div className="flex gap-2">
				{/* Member ID */}
				<FormField
				control={form.control}
				name="identity"
				render={({field})=> (
					<FormItem>
						<FormLabel>Member ID:</FormLabel>
						<FormControl>
							<Input 
							placeholder="Member ID: 12345"
							type="text" 
							{...field}
							onChange={field.onChange}/>
						</FormControl>
					</FormItem>
				)}/>

				{/* Email */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="email@gmail.com"
									type="email"
									{...field}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				</div>

				{/* Password */}
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder="******"
									type="password"
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Confirm Password  */}
				<FormField
					control={form.control}
					name="confirm"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									placeholder="******"
									type="password"
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Member Name */}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder="display name"
									onChange={field.onChange}
								/>
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex gap-1">

				{/* Role */}
				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role</FormLabel>
							<Select
								onValueChange={field.onChange}
								value={field.value}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a role" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{roles.map((role, index) => {
										return (
											<SelectItem
												value={role}
												key={index}
											>
												{role}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Status */}
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<Select
								onValueChange={field.onChange}
								value={field.value}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select user status" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{status.map((status, index) => {
										return (
											<SelectItem
												value={status}
												key={index}
											>
												{status}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>

					{/* Faculty */}
				<FormField
				control={form.control}
				name="faculty_id"
				render={({field}) => (
					<FormItem>
						<FormLabel>Faculty: </FormLabel>
						<FormControl>
							<Select
							onValueChange={field.onChange}
							value={field.value}
							defaultValue={field.value}>
								<SelectTrigger className="w-30 truncate">
									<SelectValue placeholder="Select Faculty" className="truncate"/>
								</SelectTrigger>

								<SelectContent>
									{data?.faculties.map((fac : Faculty) => (
										<SelectItem key={fac.faculty_id} value={String(fac.faculty_id)}>
											{fac.faculty_name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</FormControl>
					</FormItem>
				)}
				/>

				{/* Departments */}
				<FormField
				control={form.control}
				name="department_id"
				render={({field}) => (
					<FormItem>
						<FormLabel>Department: </FormLabel>
						<FormControl>
							<Select
							onValueChange={field.onChange}
							value={field.value}
							defaultValue={field.value}
							disabled={!selectedFacultyId}
							>
								<SelectTrigger className="w-40 truncate">
									<SelectValue placeholder="Select Department" className="truncate"/>
								</SelectTrigger>

								<SelectContent>
									{filteredDepartments.map((dep : Department) => (
										<SelectItem key={dep.department_id} value={String(dep.department_id)}>
											{dep.department_name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</FormControl>
					</FormItem>
				)}/>

				</div>

				<FormField
				control={form.control}
				name="description"
				render={({field}) => (
					<FormItem>
						<FormLabel>Description: </FormLabel>
						<FormControl>
							<Textarea 
							onChange={field.onChange}
							placeholder="Description..."/>
						</FormControl>
					</FormItem>
				)}/>

				<div className="flex">
					<Button
					type="button"
					className="w-1/2 flex items-center mr-2 border border-gray-400 text-gray-500"
					variant="outline"
					onClick={() => {
						document.getElementById("create-trigger")?.click();
					}}
				>
					Cancel
				</Button>
				<Button
					type="submit"
					className="w-1/2 flex items-center bg-yellow-200 border border-amber-700 text-amber-700"
					variant="outline"
				>
					Submit{" "}
					<AiOutlineLoading3Quarters
						className={cn("animate-spin", { hidden: !isPending })}
					/>
				</Button>
				</div>
			</form>
		</Form>
	);
}
