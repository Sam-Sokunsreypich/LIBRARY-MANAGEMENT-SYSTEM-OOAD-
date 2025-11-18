"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from("member")
      .select("name, email, created_at")
      .eq("id", user.id)
      .single();
    setProfile(data);
  };

  return (
    <div className="max-w-lg bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Staff Profile</h1>
      {profile ? (
        <>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
