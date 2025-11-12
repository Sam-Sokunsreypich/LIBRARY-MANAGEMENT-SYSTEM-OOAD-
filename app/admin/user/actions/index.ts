"use server";
import { createSupabaseAdmin, createSupabaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";
import { readUserSession } from "@/lib/actions";

//Create Member
export async function createMember(data: {
  member_id: string;
  profile_image: string;
  email: string;
  password: string;
  name: string;
  role: "user" | "admin" | "staff";
  status: "active" | "resigned";
  faculty_id: string;
  department_id: string;
  description: string;
}) {

  const supabase = await createSupabaseAdmin();

  try {
    // 1️. Insert into description table
    const { data: descriptionData, error: descriptionError } = await supabase
      .from("description")
      .insert({ descriptions: data.description || "" })
      .select("description_id")
      .single();

if (descriptionError) throw descriptionError;

    const descriptionId = descriptionData?.description_id;
  
    // 2️.Insert into user_info table
    const { data: infoData, error: infoError } = await supabase
      .from("user_info")
      .insert({
        faculty_id: data.faculty_id,
        department_id: data.department_id,
        description_id: descriptionId,
      })
      .select("info_id")
      .single();

    if (infoError) throw infoError;

    const infoId = infoData?.info_id;

    // 3️. Create user in Supabase Auth
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email: data.email!,
      password: data.password!,
      email_confirm: true,
      user_metadata: { 
        role: data.role,
        status: data.status },
    });

    if (userError) throw userError;
    if (!userData.user?.id) throw new Error("User creation failed, ID undefined");

    const userId = userData.user.id;

    // 4️. Insert into member table
    const { error: memberError } = await supabase.from("member").insert({
      id: userId,
      member_id: data.member_id,
      profile_image: data.profile_image,
      name: data.name,
      email: data.email,
      password: data.password,
      info_id: infoId,
    });

    if (memberError) throw memberError;

    // 5️.Insert into permission table
    const { error: permissionError } = await supabase
    .from("permission")
    .insert({
      member_id: userId,
      role: data.role,
      status: data.status,
    });

    if (permissionError) throw permissionError;

    // 6️. Revalidate admin user page
    revalidatePath("/admin/user");

   return JSON.stringify({ success: true, userId });

  } catch (err) {
    console.error("Failed to create member:", err);
    return JSON.stringify({ success: false, error: err instanceof Error ? err.message : err });
  }
}

//Fetch members data
export async function fetchMembers() {
    const supabase = await createSupabaseAdmin();

    // Fetch members
    const { data: members, error: memberError } = await supabase
        .from("member")
        .select("*");

    if (memberError) throw new Error(memberError.message);

    // Fetch permissions
    const { data: permissions, error: permissionError } = await supabase
        .from("permission")
        .select("*");

    if (permissionError) throw new Error(permissionError.message);

    return JSON.stringify(members,permissions);
}

//Update Member Basic ID
export async function updateMemberBasicById(
    id: string,
    data: Partial<{ 
      identity: string,
      profile_image: string | null,
      name: string,
      email: string,
      password: string,
     }>
){
    if (!id) throw new Error("Member ID is undefined");

    const supabase = await createSupabaseAdmin();

    const { data: updatedData, error } = await supabase
        .from("member")
        .update(data)
        .eq("id", id) 
        .select();

    if (error) throw new Error(error.message);

    revalidatePath("");

    return JSON.stringify(updatedData);
}

//Update Member Info Advanced
export async function updateMemberAdvanceById(
	permission_id: string,
	user_id: string,
	data: {
		role: "admin" | "user" | "staff";
		status: "active" | "resigned";
	}
) {
	const { data: userSession } = await readUserSession();
	if (userSession.session?.user.user_metadata.role !== "admin") {
		return JSON.stringify({
			error: { message: "You are not allowed to do this!" },
		});
	}

	const supabaseAdmin = await createSupabaseAdmin();

	const updateResult = await supabaseAdmin.auth.admin.updateUserById(
		user_id,
		{ user_metadata: { role: data.role } }
	);
	if (updateResult.error?.message) {
		return JSON.stringify(updateResult);
	} else {
		const supabase = await createSupabaseServerClient();
		const result = await supabase
			.from("permission")
			.update(data)
			.eq("id", permission_id);
		revalidatePath("/dashboard/member");
		return JSON.stringify(result);
	}
}


export async function updateMemberAcccountById(
	user_id: string,
	data: {
		email: string;
		password?: string | undefined;
		confirm?: string | undefined;
	}
) {
	const { data: userSession } = await readUserSession();
	if (userSession.session?.user.user_metadata.role !== "admin") {
		return JSON.stringify({
			error: { message: "You are not allowed to do this!" },
		});
	}

	let updateObject: {
		email: string;
		password?: string | undefined;
	} = { email: data.email };

	if (data.password) {
		updateObject["password"] = data.password;
	}

	const supabaseAdmin = await createSupabaseAdmin();

	const updateResult = await supabaseAdmin.auth.admin.updateUserById(
		user_id,
		updateObject
	);

	if (updateResult.error?.message) {
		return JSON.stringify(updateResult);
	} else {
		const supbase = await createSupabaseServerClient();
		const result = await supbase
			.from("member")
			.update({ email: data.email })
			.eq("id", user_id);
		revalidatePath("/dashboard/member");
		return JSON.stringify(result);
	}
}


//Delete Members
export async function deleteMemberById(user_id: string){
  const { data: userSession } = await readUserSession();
  if(userSession.session?.user.user_metadata.role !== "admin"){
    return JSON.stringify({
      error: { message: "You are not allowed to do this!"},
    });
  }

  const supabaseAdmin = await createSupabaseAdmin();
  const deleteResult = await supabaseAdmin.auth.admin.deleteUser(user_id);

  if(deleteResult.error?.message){
    return JSON.stringify(deleteResult);
  }else{
    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("member").delete().eq("id", user_id);
    revalidatePath("");
    return JSON.stringify(result);
  }
}

export async function readMembers(){
  unstable_noStore();
  const supabase = await createSupabaseServerClient();
  return await supabase.from("permission").select("*, member(*)");
}