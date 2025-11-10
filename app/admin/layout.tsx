import SideNav from "./components/SideNav";
import ReactQueryProvider from "./providers/ReactQueryProvider";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <div className="flex min-h-screen">
        <SideNav />
        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>
    </ReactQueryProvider>
  );
}
