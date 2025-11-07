"use client";
import { useState } from "react";
import SideNav from "./components/SideNav";
import EditForm from "./user/components/edit/EditorForm";
import { IPermission } from "@/lib/types";

export default function AdminPage({ permission }: { permission: IPermission }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <SideNav />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 justify-end items-start p-6 bg-gray-50">
        <div className="w-full max-w-md">
    
        </div>
      </div>
    </div>
  );
}
