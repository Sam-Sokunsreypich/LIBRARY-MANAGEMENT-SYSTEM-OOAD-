import Navbar from "@/components/nav/Navbar";
import { Metadata } from "next";
import { Toaster } from "sonner";
// import Navbar from "../../components/nav/Navbar";

export const metadata: Metadata = {
    title: "User",
}

export default function UserLayout({children}: {children: React.ReactNode}){
    return(
        <div className="user-container">
            <Navbar />
            <main>{children}</main>
            <Toaster position="top-right" richColors /> 
        </div>
    )
}
// // app/(user)/layout.tsx
// import Navbar from "../components/nav/Navbar";

// export default function UserLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* The Navbar will be displayed on every page */}
//       <Navbar />
      
//       {/* The page content (like SearchPage) will be rendered here */}
//       <main>{children}</main>
//     </div>
//   );
// }