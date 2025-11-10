"use client";

import { useState } from "react";
import NavLinks from "./NavLinks";
import { cn } from "@/lib/utils";
import SignOut from "./SignOut";
import ToggleSidebar from "./ToggleSidebar";

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(true); // sidebar initially open

  return (
    <>
      {/* Sidebar */}
      <SideBar
        className={cn(
          "h-screen border-r bg-background transition-all duration-0 fixed top-0 left-0 z-20",
          isOpen ? "w-64" : "w-0 overflow-hidden"
        )}
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
      />

    </>
  );
}

interface SideBarProps {
  className?: string;
  isOpen?: boolean;
  toggle?: () => void;
}

export const SideBar = ({ className, toggle }: SideBarProps) => {
  return (
    <div className={className}>
      <div className={cn("h-full space-y-5 flex flex-col")}>
        <div className="flex-1 space-y-5">
          <div className="flex items-center gap-2 flex-1 justify-center p-3 bg-yellow-600">
            <h1 className="text-2xl font-bold ">Admin Dashboard</h1>
          </div>
          <NavLinks />
        </div>
        <div className="p-3">
          <SignOut />
        </div>
      </div>
    </div>
  );
};
