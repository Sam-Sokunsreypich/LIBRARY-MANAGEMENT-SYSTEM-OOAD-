"use client";

import { getUserLoggedInInfo } from "@/app/auth/actions";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function ProfileIcon(){
    const [profile, setProfile] = useState<any>(null);
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async()=> {
            const user = await getUserLoggedInInfo();
            setProfile(user);
            isLoading(false);
        }
        fetchProfile();
    },[]);

    if(loading) return <p>Loading...</p>
    if(!profile) return <p>Please Loggin to see your profile...</p>

    return(
        <div className="w-100 flex gap-2 items-center border shadow-md rounded-xl p-2 mb-5">
            <Image
            src={profile.profile_image}
            alt={profile.name}
            height={50}
            width={50}
            className="rounded-full"/>
            <h1 className="font-bold">Welcome back {profile.name}!</h1>
        </div>
    )
}