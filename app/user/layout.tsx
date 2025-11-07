import { Metadata } from "next";

export const metadata: Metadata = {
    title: "User",
}

export default function UserLayout({children}: {children: React.ReactNode}){
    return(
        <div className="user-container">
            {children}
        </div>
    )
}