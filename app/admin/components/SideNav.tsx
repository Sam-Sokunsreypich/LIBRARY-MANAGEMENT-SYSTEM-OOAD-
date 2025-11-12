"use client";
import { FaGear } from "react-icons/fa6";
import { useState } from "react";
import NavLinks from "./NavLinks";
import { cn } from "@/lib/utils";
import SignOut from "./SignOut";
import ToggleSidebar from "./ToggleSidebar";
import { Button } from "@/components/ui/button";
import LogForm from "../user/components/create/LogFrom";
import { Member } from "@/lib/types";

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(true);
  
  
  return (
    <>
      {/* Sidebar */}
      <SideBar
        className={cn(
          "h-screen border-r bg-background transition-all duration-0 fixed top-0 left-0 z-20")} member={{
            id: "",
            identity: "",
            profile_image: "",
            name: "",
            email: "",
            password: "",
            faculty_id: "",
            department_id: "",
            description: ""
          }}      />

    </>
  );
}

interface SideBarProps {
  member: Member;
  className?: string;
  isOpen?: boolean;
  toggle?: () => void;
}

export const SideBar = ({ member, className, toggle }: SideBarProps) => {
  return (
    <div className={className}>
      <div className={cn("h-full space-y-5 flex flex-col")}>
        <div className="flex-1 space-y-5">
          <div className="flex items-center gap-2 flex-1 justify-center p-3 bg-yellow-600">
            <h1 className="text-2xl font-bold ">Admin Dashboard</h1>
          </div>
          <NavLinks />
        </div>
        <div className="flex justify-end">
          <SignOut/>
          <LogForm member={member}/>
        </div>
      </div>
    </div>
  );
};
