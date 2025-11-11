// // components/Bookrecords.js

// export default function BookRecord({ records }) {
//     const getStatusClass = (status) => {
//       switch (status) {
//         case 'borrowing':
//           return 'bg-green-50 text-green-800';
//         case 'non-return':
//           return 'bg-red-50 text-red-800';
//         case 'booking':
//           return 'bg-blue-50 text-blue-800';
//         case 'returned':
//           return 'bg-purple-50 text-purple-800';
//         default:
//           return 'bg-gray-50 text-gray-800';
//       }
//     };
  
//     const getDueInfoClass = (daysLeft) => {
//       if (daysLeft === 'Late') return 'text-red-700';
//       if (daysLeft === 'None' || daysLeft === 'Completed') return 'text-gray-600';
//       return 'text-orange-500';
//     };
  
//     const displayStatus = record.status === 'non-return' ? 'Non-Return' : 
//       record.status.charAt(0).toUpperCase() + record.status.slice(1);
  
//     return (
//       <div className="grid grid-cols-5 px-5 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors">
//         <div className="flex items-center space-x-4">
//           <img 
//             src={record.cover} 
//             alt={record.title}
//             className="w-12 h-16 rounded object-cover shadow-md hover:scale-105 transition-transform"
//           />
//           <div>
//             <div className="font-semibold text-gray-800">{record.title}</div>
//             <div className="text-sm text-gray-600">{record.author}</div>
//           </div>
//         </div>
//         <div className="flex items-center">{record.borrowDate}</div>
//         <div className="flex items-center">{record.dueDate}</div>
//         <div className="flex items-center">
//           <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(record.status)}`}>
//             {displayStatus}
//           </span>
//         </div>
//         <div className="flex items-center">
//           <span className={`text-sm font-medium ${getDueInfoClass(record.daysLeft)}`}>
//             {record.daysLeft}
//           </span>
//         </div>
//       </div>
//     );
//   }
  