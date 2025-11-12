"use client";
import { useEffect, useState } from "react";

export default function MemberList() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMembers() {
      try {
        const res = await fetch("/api/getMembers");
        const data = await res.json();
        setMembers(data);
      } catch (err) {
        console.error("Failed to fetch members:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMembers();
  }, []);

  if (loading) return <p>Loading members...</p>;

  return (
    <div className="p-4 ml-100">
      <h1 className="font-bold text-lg mb-3">Members</h1>
      {members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        members.map((member) => (
          <div key={member.id} className="border-b py-2">
            <p><strong>Name:</strong> {member.name}</p>
            <p><strong>Email:</strong> {member.email}</p>
            {member.profile_image && (
              <img
                src={member.profile_image}
                alt={member.name}
                className="w-20 h-20 object-cover rounded-full mt-2"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}
