// // app/borrowing.js

// 'use client';

// import { useState } from 'react';
// import Navbar from '../components/navbar';
// import Tabs from '../components/Tabs';
// import CurrentBorrowing from '../components/CurrentBorrowing';
// import BorrowingHistory from '../components/BorrowingHistory';

// export default function BorrowingCenter() {
//   const [activeTab, setActiveTab] = useState('now');
//   const [nowActiveStatus, setNowActiveStatus] = useState('all');
//   const [historyActiveStatus, setHistoryActiveStatus] = useState('all');

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
      
//       {/* main content */}
//       <div className="max-w-7xl mx-auto mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
//         {/* header */}
//         <header className="px-6 py-4 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-semibold text-gray-800">Borrowing Center</h1>
//             <div className="flex space-x-3">
//               <button className="flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
//                 <span>Borrow New Book</span>
//               </button>
//               <button className="flex items-center space-x-2 border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
//                 <span>Borrowing History</span>
//               </button>
//             </div>
//           </div>
//         </header>

//         <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

//         {/* content area */}
//         <div className="p-6">
//           {activeTab === 'now' && (
//             <CurrentBorrowing 
//               activeStatus={nowActiveStatus}
//               setActiveStatus={setNowActiveStatus}
//             />
//           )}
//           {activeTab === 'history' && (
//             <BorrowingHistory 
//               activeStatus={historyActiveStatus}
//               setActiveStatus={setHistoryActiveStatus}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
