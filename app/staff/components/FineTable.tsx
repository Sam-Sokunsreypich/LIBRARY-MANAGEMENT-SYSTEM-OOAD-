"use client";
import React from "react";

type Fine = {
  id: number;
  user: string;
  bookTitle: string;
  issue: string;
  amount: number;
  isPaid: boolean;
};

interface FineTableProps {
  fines: Fine[];
  onPay?: (id: number) => void;
}

const FineTable: React.FC<FineTableProps> = ({ fines, onPay }) => {
  return (
    <div className="bg-white border rounded-md p-4 shadow-sm">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700 border-b">
            <th className="py-2 px-3">ID</th>
            <th className="py-2 px-3">User</th>
            <th className="py-2 px-3">Book Title</th>
            <th className="py-2 px-3">Issue</th>
            <th className="py-2 px-3">Amount</th>
            <th className="py-2 px-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {fines.map((fine) => (
            <tr key={fine.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-3">{fine.id}</td>
              <td className="py-2 px-3">{fine.user}</td>
              <td className="py-2 px-3">{fine.bookTitle}</td>
              <td className="py-2 px-3">{fine.issue}</td>
              <td className="py-2 px-3 text-red-600 font-medium">
                ${fine.amount.toFixed(2)}
              </td>
              <td className="py-2 px-3">
                {fine.isPaid ? (
                  <button
                    className="border border-gray-300 bg-gray-100 text-gray-500 px-3 py-1 rounded cursor-not-allowed"
                    disabled
                  >
                    Paid
                  </button>
                ) : (
                  <button
                    onClick={() => onPay?.(fine.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Payment
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {fines.length === 0 && (
        <p className="text-center text-gray-400 text-sm mt-3">
          No fine records available.
        </p>
      )}
    </div>
  );
};

export default FineTable;
