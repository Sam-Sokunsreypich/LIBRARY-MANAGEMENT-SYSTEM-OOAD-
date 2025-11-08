"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SideNav from "../components/SideNav";
import SearchBar from "./components/component/SearchBar";
import { getMembers } from "./actions/fetchMembersClient";
import CreateMember from "./components/create/CreateMember";
import Link from "next/link";
import EditForm from "./components/edit/EditorForm";
import { IPermission } from "@/lib/types";

export default function UserManagement({ permission }: { permission: IPermission }) {
  const [role, setRole] = useState("user");

  const { data, isLoading, error } = useQuery({
    queryKey: ["members", role],
    queryFn: () => getMembers(role),
  });

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="ml-60 flex flex-col flex-1 bg-gray-50">
        <SearchBar />
        
        {/* Line */}
        <div className="border-b border-gray-300"></div>

        
        {/* Dropdown */}
        <div className="mt-4 flex justify-between">
          <select
            className="border px-10 rounded-xl h-12 p-2 border-gray-500 text-gray-500 appearance-none"
            onChange={(e) => setRole(e.target.value)}
            defaultValue="user"
          >
            <option value="user">Users</option>
            <option value="staff">Staff</option>
            <option value="admin">Admins</option>
          </select>

          <CreateMember/>
        </div>

        {/* Table */}
        <div className="mt-6">
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {data && data.length > 0 ? (
            <table className="min-w-full border border-gray-200 bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">No</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((m: any, i: number) => (
                  <tr key={m.id}>
                    <td className="px-4 py-2 border-t">{i + 1}</td>
                    <td className="px-4 py-2 border-t">{m.name}</td>
                    <td className="px-4 py-2 border-t">{m.email}</td>
                    <td className="px-4 py-2 border-t">{m.role}</td>
                    <td className="px-4 py-2 border-t">{m.status}</td>
                    <td className="px-4 py-2 border-t">{m.created_at}</td>
                    <td className="px-4 py-2 border-t">
                      <Link href="">
                      view
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !isLoading && role && <p>No data found for {role}.</p>
          )}
        </div>
      </div>
    </div>
  );
}
