"use server";

import { createSupabaseAdmin } from '@/lib/supabase';
import { RuleType } from '@/types/RuleType';


export async function getRule():Promise<RuleType[]> {
  const supabase = await createSupabaseAdmin();

  const {data, error} = await supabase
  .from('rules')
  .select("id,title,description, fine, isDeleted")
  .order("id",{ascending:true})

    if (error) {
    console.error("Error fetching rules:", error.message);
    throw new Error("Failed to fetch rules");
  }

  return data.filter(rule => !rule.isDeleted) || [];
}

export async function createRule(data:{
    title:string;
    description:string;
    fine: number;
}) {

    const supabase = await createSupabaseAdmin();
    
    const {error} = await supabase
    .from("rules")
    .insert([{
        title: data.title,
        description: data.description,
        fine: data.fine,
        isDeleted: "FALSE",
    }])

      if (error) {
    console.error("Error creating rule:", error.message);
    throw new Error("Failed to create rule");
  }
  
  return { message: "Rule created successfully!" };
}

export async function updateRule(id: number,
  data:{
    title: string,
    description: string,
    fine: number
  }
){
  const supabase = await createSupabaseAdmin();

  const {error} = await supabase
  .from("rules")
  .update({
    title: data.title,
    description: data.description,
    fine: data.fine,
  })
  .eq("id",id)

  if(error){
    console.log('Error updating rule:', error.message)
    throw new Error("Failed to update rule");
  }

  return {message: "Rule update successfully!"}
}


export async function deleteFine(id: number){

  const supabase = await createSupabaseAdmin();

   const {error} = await supabase
    .from("rules")
    .update([{
        isDeleted: "true",
    }])
    .eq("id", id);

    if (error) {
    console.error("Error Delete rule:", error.message);
    throw new Error("Failed to delete rule");
    }
}