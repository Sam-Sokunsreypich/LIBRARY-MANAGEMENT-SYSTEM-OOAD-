import SideNav from "../components/SideNav";

export default function page() {
  return (
    <div className='flex min-h-screen'>
          <SideNav />
        <div className='mb-20 flex justify-between mr-10'>
          <h2 className='text-gray-800 font-bold text-3xl '>Management Book Request</h2> 
        </div>
    </div>
  )
}
