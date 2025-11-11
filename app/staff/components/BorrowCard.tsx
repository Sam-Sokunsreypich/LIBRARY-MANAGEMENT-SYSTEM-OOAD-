"use client";
import React from "react";

type BorrowRequest = {
  id: number;
  bookTitle: string;
  requestBy: string;
  requestDate: string;
  status: "Pending" | "Approved" | "Rejected" | "Waiting for pick up" | "Borrowed";
};

interface BorrowCardProps {
  request: BorrowRequest;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

const BorrowCard: React.FC<BorrowCardProps> = ({ request, onApprove, onReject }) => {
  // color for status text
  const statusColor =
    request.status === "Pending"
      ? "text-red-600"
      : request.status === "Rejected"
      ? "text-red-500"
      : "text-green-600";

  return (
    <div className="bg-white border rounded-lg p-4 flex justify-between items-center mb-4 shadow-sm">
      {/* LEFT side - Book info */}
      <div className="flex items-center gap-4">
        {/* Book Image Placeholder */}
        <div className="w-16 h-20 bg-gray-200 flex items-center justify-center rounded-md text-gray-500 text-sm">
          📘
        </div>

        {/* Book Details */}
        <div>
          <p className="text-gray-400 text-xs">ID: {request.id.toString().padStart(6, "0")}</p>
          <h2 className="font-semibold text-gray-800">{request.bookTitle}</h2>
          <p className="text-xs text-gray-500 mt-1">
            Request By <span className="font-semibold text-gray-700">{request.requestBy}</span>
          </p>
          <p className="text-xs text-gray-500">
            Requested on <span className="font-medium">{request.requestDate}</span>
          </p>
        </div>
      </div>

      {/* RIGHT side - Actions */}
      <div className="flex flex-col items-end gap-2">
        <p className={`text-sm font-medium ${statusColor}`}>{request.status}</p>

        {request.status === "Pending" ? (
          <div className="flex gap-2">
            <button
              onClick={() => onApprove?.(request.id)}
              className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1 rounded"
            >
              Approve
            </button>
            <button
              onClick={() => onReject?.(request.id)}
              className="border border-red-400 text-red-500 hover:bg-red-50 text-sm px-4 py-1 rounded"
            >
              Reject
            </button>
          </div>
        ) : (
          <button
            className="border border-gray-300 text-gray-600 text-sm px-4 py-1 rounded bg-gray-50 cursor-default"
            disabled
          >
            Details
          </button>
        )}
      </div>
    </div>
  );
};

export default BorrowCard;
