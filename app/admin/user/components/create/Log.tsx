"use client";

import { getUserLoggedInInfo } from "@/app/auth/actions";
import { useEffect, useState } from "react";
import Image from "next/image";
import SignOut from "@/app/admin/components/SignOut";

export default function ProfileForm(){
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchProfile = async() => {
            const user = await getUserLoggedInInfo();
            setProfile(user);
            setLoading(false);
        };

        fetchProfile();
    }, []);

    if(loading) return <p>Loading...</p>;
    if(!profile) return <p>Please login to see your profile.</p>
    document.getElementById("profile-setting")?.click();

    return(
        <div>
            <div>
                <Image
                src={profile.profile_image}
                alt={profile.name}
                className="rounded-full"
                height={100}
                width={100}/>
                      <p className="text-gray-500">
        Name: {profile.name || "N/A"}
      </p>
      <p>
        Email: {profile.email || "N/A"}
      </p>
      </div>

      <div className="mt-6 border-t border-b max-w-full p-5">
        <h1>Change Password</h1>
      </div>
      <div className="flex justify-end mt-3">
        <SignOut/>
            </div>
        </div>
    )
}