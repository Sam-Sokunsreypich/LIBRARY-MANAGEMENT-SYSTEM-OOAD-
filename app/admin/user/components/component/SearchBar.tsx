import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
export default function SearchBar(){
    return(
        <>
        <div className="flex justify-end">
            <div className=" flex justify-between items-center h-12 w-75 border border-gray-500 text-gray-500 rounded-xl p-2 mb-5">
            <h1>Search</h1>
            <MagnifyingGlassIcon className="w-7 h-7"/>
        </div>
        </div>
        </>
    )
}