import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Staff",
};

export default function StaffLayout({children}: {children: React.ReactNode}){
return(
<div className="staff-container">
      <main>{children}</main> 
</div>);
}