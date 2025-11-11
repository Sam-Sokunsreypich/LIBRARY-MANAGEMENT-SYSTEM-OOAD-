"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseAdmin } from "@/lib/supabase";
import { BookRequestType } from "@/types/BookRequestType";
import { getMonitoring } from "@/app/admin/system_monitoring/action/monitoring";

export default function ReturnBookPage() {

  const [records, setRequest] = useState<BookRequestType[]>([]);
  const [loading, setLoading] = useState(true)
  
  useEffect( ()=>{
    async function fetchRequests() {
      try {
        const res = await getMonitoring();
        
        setRequest(res.filter((r)=>r.request_status.status_name === "PENDING"));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, []);

  console.log('records', records)
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Return Management</h1>

      <table className="w-full text-sm bg-white rounded border">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">User</th>
            <th className="p-2">Book</th>
            <th className="p-2">Due</th>
            <th className="p-2">Return</th>
            <th className="p-2">Condition</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((d) => (
            <tr key={d.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{d.id}</td>
              <td className="p-2">{d.user}</td>
              <td className="p-2">{d.book}</td>
              <td className="p-2">{d.due}</td>
              <td className="p-2">{d.returnDate}</td>
              <td className="p-2">{d.condition}</td>
              <td
                className={`p-2 font-semibold ${
                  d.status === "Returned" ? "text-green-600" : "text-red-600"
                }`}
              >
                {d.status}
              </td>
            </tr>
          ))}

          {records.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center p-3 text-gray-400">
                No return records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
