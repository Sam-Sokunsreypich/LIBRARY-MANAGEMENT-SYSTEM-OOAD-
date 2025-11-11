import SearchBar from "../user/components/component/SearchBar";
import BookCatalog from "./components/BookCatalog";
import CreateBook from "./components/CreateBook";


export default function BookPage(){
    return (
        <>
            <div className="ml-64 w-auto min-h-screen"> 
                <div className="sticky top-0 z-10">
                    <SearchBar/>
                    <div className="border-b border-gray-300"></div>
                </div>
                <div className="flex justify-end mr-5"><CreateBook/></div>
                <div className="mt-5">
                    <div className="flex justify-between gap-5 items-start">
                        <BookCatalog/> 
                    </div>
                </div>
            </div>
        </>
    )
}