"use server";
import { createSupabaseAdmin, createSupabaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";
import { readUserSession } from "@/lib/actions";

//Create Member
export async function createMember(data: {
  email: string;
  password: string;
  name: string;
  role: "user" | "admin" | "staff";
  status: "active" | "resigned";
  confirm: string;
}) {
  
  const { data: userSession } = await readUserSession();
  if(userSession.session?.user.user_metadata.role !== "admin"){
    return JSON.stringify({
      error: { message: "You are not allowed to do this!"}
    });
  }


  const supabase = await createSupabaseAdmin();

  const createResult = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      role: data.role,
    },
  });

  if (!createResult.data.user?.id) {
    console.error("User ID is undefined. createUser failed:", createResult.error);
    return JSON.stringify(createResult);
  }

  const userId = createResult.data.user.id;

  const memberResult = await supabase.from("member").insert({
    id: userId,
    name: data.name,
    email: data.email,
    password: data.password,
  });

  revalidatePath("/admin/user");

  if (memberResult.error) {
    console.error("Failed to insert member:", memberResult.error);
    return JSON.stringify(memberResult);
  }

  const permissionResult = await supabase.from("permission").insert({
    member_id: userId,
    role: data.role,
    status: data.status,
  });
  
  revalidatePath("/admin/user");

  if (permissionResult.error) {
    console.error("Failed to insert permission:", permissionResult.error);
    return JSON.stringify(permissionResult);
  }

  console.log("User, member, and permission created successfully!");
  return JSON.stringify(permissionResult);
}

//Fetch members data
export async function fetchMembersWithPermissions() {
    const supabase = await createSupabaseAdmin();

    // Fetch members
    const { data: members, error: memberError } = await supabase
        .from("members")
        .select("*");

    if (memberError) throw new Error(memberError.message);

    // Fetch permissions
    const { data: permissions, error: permissionError } = await supabase
        .from("permissions")
        .select("*");

    if (permissionError) throw new Error(permissionError.message);

    return { members, permissions };
}

//Update Member Basic ID
export async function updateMemberBasicById(
  memberId: string,
  data: {
    name: string;
  }
){
  const supabase = await createSupabaseAdmin();

  const { error } = await supabase
  .from("member")
  .update({name: data.name})
  .eq("id", memberId);

  if(error){
    console.error("Error updating member:", error.message);
    return JSON.stringify({error});
  }

  revalidatePath("/admin/user");

  return JSON.stringify({ success: true });
}

//Update Member Info Advanced
export async function updateMemberAdvanceById(
  member_id: string,
  data: {
    role: "user" | "staff" | "admin";
    status: "active" | "resigned";
  }
){
  const { data: userSession } = await readUserSession();
  if(userSession.session?.user.user_metadata.role !== "admin"){
    return JSON.stringify({
      error: { message: "You are not allowed to do this! "},
    });
  }

  const supabaseAdmin = await createSupabaseAdmin();

  const updateResult = await supabaseAdmin.auth.admin.updateUserById(
    member_id,
    {user_metadata: {role: data.role}}
  );
  if(updateResult.error?.message){
    return JSON.stringify(updateResult);
  }else{
    const supabase = await createSupabaseServerClient();
    const result = await supabase
    .from("permission")
    .update(data)
    .eq("member_id", member_id);

    revalidatePath("/admin/user");

    return JSON.stringify(result);
  }
}

//
export async function updateMemberAccountById(
  member_id: string,
  data: {
    email: string;
    password?: string;
    confirm?: string;
  }
){
  const { data:userSession } = await readUserSession();
  if(userSession.session?.user.user_metadata.role !== "admin"){
    return JSON.stringify({
      error: { message: "You are not allowed to do this!"},
    });
  }

  let updateObject: {
    email: string;
    password?: string;
  } = { email: data.email };

  if( data.password ){
    updateObject.password = data.password;
  }

  const supabaseAdmin = await createSupabaseAdmin();

  const updateResult = await supabaseAdmin.auth.admin.updateUserById(
    member_id,
    updateObject
  );

  if(updateResult.error?.message){
    return JSON.stringify(updateResult);
  }else{
    const supabase = await createSupabaseServerClient();
    const result = await supabase
    .from("member")
    .update({email: data.email})
    .eq("id", member_id);
    revalidatePath("");
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