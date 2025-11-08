import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
