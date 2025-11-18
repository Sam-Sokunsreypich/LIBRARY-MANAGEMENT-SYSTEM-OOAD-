// components/RecentActivityTable.tsx
export default function RecentActivityTable({ rows }: { rows: any[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm divide-y">
        <thead>
          <tr className="text-left">
            <th className="py-2">User</th>
            <th className="py-2">Action</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="py-3">{r.user}</td>
              <td className="py-3 text-gray-700">{r.action}</td>
              <td className="py-3 text-gray-500">{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
