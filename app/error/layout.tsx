export const metadata = {
  title: "Error Page",
  description: "Root layout for all routes",
};

export default function ErrorLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-amber-300 min-h-screen">{children}</div>;
}
