import { Metadata } from "next";
import Navbar from "../../components/nav/Navbar";

export const metadata: Metadata = {
    title: "User",
}

export default function UserLayout({children}: {children: React.ReactNode}){
    return(
        <div className="user-container">
            <Navbar />
            {children}
        </div>
    )
}