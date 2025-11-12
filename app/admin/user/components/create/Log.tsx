"use client"; // This is required for hooks

import { useQuery } from "@tanstack/react-query";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { Member } from "@/lib/types";

export default function Log() {
  const supabase = createClientComponentClient();

  // ✅ Place your useQuery here
  const { data, isLoading, error } = useQuery({
    queryKey: ["current-member"],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) throw new Error("User is not logged in");

      const { data: memberData, error: memberError } = await supabase
        .from("members")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (memberError) throw new Error(memberError.message);
      return memberData as Member;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;
  if (!data) return <p>No member info found.</p>;

  const member = data;

  return (
    <div className="flex flex-col items-center space-y-2">
      <Image
        src={member.profile_image || "/assets/default.jpg"}
        alt={member.name || "Profile"}
        width={128}
        height={128}
        className="rounded-full object-cover"
      />
      <h1>Name: {member.name}</h1>
      <h1>Email: {member.email}</h1>
      <h1>ID: {member.identity}</h1>
    </div>
  );
}
