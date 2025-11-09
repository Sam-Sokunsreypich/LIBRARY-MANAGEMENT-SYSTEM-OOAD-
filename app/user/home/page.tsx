import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      {/* Navbar */}
      <div className="flex items-center bg-orange-500 h-10 px-6 space-x-10 text-white">
        <h1 className="font-bold text-lg">LibraryMS</h1>
        <ul className="list-none flex space-x-10">
          <li>
            <a href="#" className="hover:underline">
              Home page
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Borrowing Center
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Favorites
            </a>
          </li>
        </ul>
        <div className="ml-auto border-2 border-white rounded-md flex items-center h-8 px-2">
          <input
            type="text"
            placeholder="Search"
            name="search"
            className="bg-transparent outline-none text-white placeholder-white"
          />
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-10 space-y-4">
        <div className="flex space-x-6 justify-center">
          <div className="border-2 w-72 h-20 bg-gray-300 text-2xl p-4 rounded-md text-center">
            <h1>Currently Reading</h1>
          </div>
          <div className="border-2 w-72 h-20 bg-gray-300 text-2xl p-4 rounded-md text-center">
            <h1>Overdue Books</h1>
          </div>
        </div>

        <div className="flex space-x-6 justify-center">
          <div className="border-2 w-72 h-20 bg-gray-300 text-2xl p-4 rounded-md text-center">
            <h1>Borrowed Books</h1>
          </div>
          <div className="border-2 w-72 h-20 bg-gray-300 text-2xl p-4 rounded-md text-center">
            <h1>Returned Books</h1>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="mt-10 px-6 ml-30 mr-30">
        <h1 className="text-2xl font-semibold mb-4">Recommended for you</h1>

        {/* Books Grid */}
        <div className="grid grid-cols-4 gap-6">
          {[...Array(12)].map((index) => (
            <div
              key={index}
              className="border-2 rounded-md p-4 flex flex-col items-center"
            >
              <img
                className="w-32 h-44 object-cover mb-2"
                src="https://covers.openlibrary.org/b/id/7969738-M.jpg"
                alt="Book cover"
              />
              <h4 className="font-medium mb-2 text-center">Holt Handbook</h4>
              <button className="w-32 h-10 bg-amber-500 rounded-md text-white font-semibold hover:bg-amber-600 transition">
                Borrow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

// export default function Home() {
//   return (
//     <div>
//       <div className="flex bg-orange-500 h-10 space-x-10">
//         <h1>LibraryMS</h1>
//         <div className="list-none flex space-x-10">
//           <li>
//             <a href="#">Home page</a>
//           </li>
//           <li>
//             <a href="#">Borrowing Center</a>
//           </li>
//           <li>
//             <a href="#">Favorites</a>
//           </li>
//         </div>
//         <div className="border-2 h-8">
//           <input type="text" placeholder="Search" name="search" />
//         </div>
//       </div>
//       <div className="mt-10">
//         <div className="flex">
//           <div className="border-2 w-70 h-20 bg-gray-300 text-2xl p-4 rounded-md">
//             <h1>Currently Reading</h1>
//           </div>
//           <div className="border-2 w-70 h-20 bg-gray-300 text-2xl p-4 rounded-md">
//             <h1>Overdue books</h1>
//           </div>
//         </div>
//         <div className="flex">
//           <div className="border-2 w-70 h-20 bg-gray-300 text-2xl p-4 rounded-md">
//             <h1>Currently Reading</h1>
//           </div>
//           <div className="border-2 w-70 h-20 bg-gray-300 text-2xl p-4 rounded-md">
//             <h1>Overdue books</h1>
//           </div>
//         </div>
//       </div>
//       <div>
//         <h1 className="text-2xl font-semibold">Recommended for you</h1>
//         <div className="flex">
//           <div className="border-2 w-46">
//             <img
//               className="w-auto"
//               src="https://covers.openlibrary.org/b/id/7969738-M.jpg"
//             />
//             <h4>Holt Handbook</h4>
//             <button className="w-30 h-10 bg-amber-500 rounded-md ">
//               Borrow
//             </button>
//           </div>
//           <div className="border-2 w-46">
//             <img
//               className="w-auto"
//               src="https://covers.openlibrary.org/b/id/7969738-M.jpg"
//             />
//             <h4>Holt Handbook</h4>
//             <button className="w-30 h-10 bg-amber-500 rounded-md ">
//               Borrow
//             </button>
//           </div>
//           <div className="border-2 w-46">
//             <img
//               className="w-auto"
//               src="https://covers.openlibrary.org/b/id/7969738-M.jpg"
//             />
//             <h4>Holt Handbook</h4>
//             <button className="w-30 h-10 bg-amber-500 rounded-md ">
//               Borrow
//             </button>
//           </div>
//           <div className="border-2 w-46">
//             <img
//               className="w-auto"
//               src="https://covers.openlibrary.org/b/id/7969738-M.jpg"
//             />
//             <h4>Holt Handbook</h4>
//             <button className="w-30 h-10 bg-amber-500 rounded-md ">
//               Borrow
//             </button>
//           </div>
//         </div>
//         <div className="flex">
//           <div className="border-2 w-46">
//             <img
//               className="w-auto"
//               src="https://covers.openlibrary.org/b/id/7969738-M.jpg"
//             />
//             <h4>Holt Handbook</h4>
//             <button className="w-30 h-10 bg-amber-500 rounded-md ">
//               Borrow
//             </button>
//           </div>
//           <div className="border-2 w-46">
//             <img
//               className="w-auto"
//               src="https://covers.openlibrary.org/b/id/7969738-M.jpg"
//             />
//             <h4>Holt Handbook</h4>
//             <button className="w-30 h-10 bg-amber-500 rounded-md ">
//               Borrow
//             </button>
//           </div>
//           <div className="border-2 w-46">
//             <img
//               className="w-auto"
//               src="https://covers.openlibrary.org/b/id/7969738-M.jpg"
//             />
//             <h4>Holt Handbook</h4>
//             <button className="w-30 h-10 bg-amber-500 rounded-md ">
//               Borrow
//             </button>
//           </div>
//           <div className="border-2 w-46">
//             <img
//               className="w-auto"
//               src="https://covers.openlibrary.org/b/id/7969738-M.jpg"
//             />
//             <h4>Holt Handbook</h4>
//             <button className="w-30 h-10 bg-amber-500 rounded-md ">
//               Borrow
//             </button>
//           </div>
//         </div>
//         <div className="flex">
//           <div className="border-2 w-46">
//             <img
//               className="w-auto"
//               src="https://covers.openlibrary.org/b/id/7969738-M.jpg"
//             />
//             <h4>Holt Handbook</h4>
//             <button className="w-30 h-10 bg-amber-500 rounded-md ">
//               Borrow
//             </button>
//           </div>
//           <div className="border-2 w-46">
//             <img
//               className="w-auto"
//               src="https://covers.openlibrary.org/b/id/7969738-M.jpg"
//             />
//             <h4>Holt Handbook</h4>
//             <button className="w-30 h-10 bg-amber-500 rounded-md ">
//               Borrow
//             </button>
//           </div>
//           <div className="border-2 w-46">
//             <img
//               className="w-auto"
//               src="https://covers.openlibrary.org/b/id/7969738-M.jpg"
//             />
//             <h4>Holt Handbook</h4>
//             <button className="w-30 h-10 bg-amber-500 rounded-md ">
//               Borrow
//             </button>
//           </div>
//           <div className="border-2 w-46">
//             <img
//               className="w-auto"
//               src="https://covers.openlibrary.org/b/id/7969738-M.jpg"
//             />
//             <h4>Holt Handbook</h4>
//             <button className="w-30 h-10 bg-amber-500 rounded-md ">
//               Borrow
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
