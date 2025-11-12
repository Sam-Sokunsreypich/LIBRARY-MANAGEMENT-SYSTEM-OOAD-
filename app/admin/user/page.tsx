"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SideNav from "../components/SideNav";
import SearchBar from "./components/component/SearchBar";
import { getMembers } from "./actions/fetchMembersClient";
import CreateMember from "./components/create/CreateMember";
import EditDialogForm from "./components/edit/EditDialog";
import type { Member, Permission } from "@/lib/types";
import DeleteMember from "./components/component/DeleteMember";
import EditForm from "./components/edit/EditorForm";
import BasicForm from "./components/edit/BasicForm";
import BasicEdit from "./components/create/BasicEdit";
import EditMember from "./components/create/EditMember";
export default function UserManagement({member}: {member: Member}) {
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
            className="border-2 px-10 ml-5 rounded-xl h-10 border-amber-700 text-amber-700 bg-yellow-300 appearance-none"
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
                    <td className="px-4 py-2 border-t">
                      <span className={`px-2 py-1 border rounded-xl ${
                        m.role === "admin"
                        ? "bg-yellow-200 border-amber-600 text-amber-600"
                        : m.role === "user"
                        ? "bg-purple-200 border-indigo-600 text-indigo-600"
                        : m.role === 'staff'
                        ? "bg-pink-200 border-pink-700 text-pink-700"
                        : "bg-gray-500"
                      }`}>
                        {m.role}
                        </span>
                      </td>
                    <td className="px-4 py-2 border-t">
                      <span className={`p-1 rounded-2xl ${
                        m.status === "active"
                        ? "bg-green-200 text-green-700 border-green-700 border"
                        : m.status === "resigned"
                        ? "bg-red-200 text-red-700 border-red-700 border"
                        : "bg-gray-400"
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-t">{m.created_at}</td>
                    <td className="flex px-4 py-2 gap-2 border-t">
                      <EditMember member={m}/>
                      <DeleteMember user_id={m.id}/>
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
