// app/(user)/layout.tsx
import Navbar from "../components/nav/Navbar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* The Navbar will be displayed on every page */}
      <Navbar />
      
      {/* The page content (like SearchPage) will be rendered here */}
      <main>{children}</main>
    </div>
  );
}