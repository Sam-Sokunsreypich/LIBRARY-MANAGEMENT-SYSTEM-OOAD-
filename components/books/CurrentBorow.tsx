// components/CurrentBorrowing.js

import FilterDropdown from './FilterDropdown';
import BorrowingRecord from './BorrowingRecord';
import { currentRecords } from '../data/Bookdata';
import { RowPinning } from '@tanstack/react-table';

export default function CurrentBorrowing({ activeStatus, setActiveStatus }) {
  const filterOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'borrowing', label: 'Borrowing' },
    { value: 'booking', label: 'Booking' },
    { value: 'late', label: 'Late' }
  ];

  const headers = ['Book Info', 'Borrowing Date', 'Due Date', 'Status', 'Actions'];

  const filteredRecords = currentRecords.filter(record => 
    activeStatus === 'all' || record.status === activeStatus
  );

  return (
    <div className="animate-fade-in">
      <FilterDropdown 
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        options={filterOptions}
        label="Filter By:"
      />
      <BorrowingTable 
        records={filteredRecords}
        headers={headers}
      />
    </div>
  );
}
