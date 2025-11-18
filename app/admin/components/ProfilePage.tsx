"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { getUserLoggedInInfo } from "@/app/auth/actions";
import Image from "next/image";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const[loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProfile = async() => {
      const res = await getUserLoggedInInfo();
      setProfile(res);
      setLoading(false);
      return res;
    }
    fetchProfile();
  }, []);

  return (
    <div className="max-w-lg bg-transparent p-6">
      <h1 className="text-2xl font-bold mb-4">Staff Profile</h1>
      {profile ? (
        <>
        <Image
        src={profile.profile_image}
        alt={profile.name}
        height={100}
        width={100}
        className="rounded-full"
        />
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
