"use client";

import { Search } from "lucide-react";

// Define the props for our component
interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ placeholder = "Search...", value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xs">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value} // Controlled component
        onChange={(e) => onChange(e.target.value)} // Call the onChange prop with the new value
        className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
}