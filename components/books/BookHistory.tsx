// // components/BorrowingHistory.js   

// // import FilterDropdown from './FilterDropdown';
// // import BorrowingTable from './BorrowingTable';
// import { historyRecords } from '../data/Bookdata';

// export default function BorrowingHistory({ activeStatus, setActiveStatus }) {
//   const filterOptions = [
//     { value: 'all', label: 'All Status' },
//     { value: 'borrowing', label: 'Borrowing' },
//     { value: 'non-return', label: 'Non-Return' },
//     { value: 'booking', label: 'Booking' },
//     { value: 'returned', label: 'Returned' }
//   ];

//   const headers = ['Book Information', 'Borrow Date', 'Due Date', 'Status', 'Action'];

//   const filteredRecords = historyRecords.filter(record => 
//     activeStatus === 'all' || record.status === activeStatus
//   );

//   return (
//     <div className="animate-fade-in">
//       <FilterDropdown 
//         activeStatus={activeStatus}
//         setActiveStatus={setActiveStatus}
//         options={filterOptions}
//         label="Filter Criteria:"
//       />
//       <BorrowingTable 
//         records={filteredRecords}
//         headers={headers}
//       />
//     </div>
//   );
// }
