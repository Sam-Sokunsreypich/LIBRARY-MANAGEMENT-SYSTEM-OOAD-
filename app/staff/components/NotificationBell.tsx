"use client";
import { Bell } from "lucide-react";

export default function NotificationBell({ count = 0 }: { count?: number }) {
  return (
    <div className="relative cursor-pointer">
      <Bell className="w-6 h-6 text-gray-700" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}
