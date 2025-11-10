import React from "react";
import DiaglogForm from "../component/DiaglogForm";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import EditForm from "./EditorForm";
import { IPermission } from "@/lib/types";

export default function EditMember({
	isAdmin,
	permission,
}: {
	isAdmin: boolean;
	permission: IPermission;
}) {
	return (
		<DiaglogForm
			id="update-trigger"
			title="Edit Member"
			Trigger={
				<Button variant="outline">
					<Pencil1Icon />
					Edit
				</Button>
			}
			form={<EditForm isAdmin={isAdmin} permission={permission} />}
		/>
	);
}