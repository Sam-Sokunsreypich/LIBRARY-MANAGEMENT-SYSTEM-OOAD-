import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Main App",
  description: "Root layout for all routes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-amber-300">{children}</body>
    </html>
  );
}
