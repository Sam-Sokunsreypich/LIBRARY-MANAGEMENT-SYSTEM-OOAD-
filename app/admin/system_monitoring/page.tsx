import TableMonitoring from "@/components/system_monitoring/table_monitoring";
import SideNav from "../components/SideNav";

export default function page() {
  return (
    <div className='flex min-h-screen'>
          <SideNav />
        <div className='ml-64 mb-20 mr-10'>
          <h2 className='text-gray-800 font-bold text-3xl '>System Monitoring</h2> 
          <TableMonitoring/>
        </div>
    </div>
  )
}
