

import FilterDropdown from './FilterDropdown';
import BorrowingTable from './BorrowingTable';

import { StatusType } from '@/types/common';
import { BookRequestType } from '@/types/BookRequestType';


interface CurrentBorrowingProps {
  activeStatus: StatusType;
  setActiveStatus: (status: StatusType) => void;
  records: BookRequestType[]
}

const CurrentBorrowing: React.FC<CurrentBorrowingProps> = ({ activeStatus, setActiveStatus ,records }) => {
  // const filterOptions = [
  //   { value: 'all' as StatusType, label: 'All Status' },
  //   { value: 'borrowing' as StatusType, label: 'Borrowing' },
  //   { value: 'non-return' as StatusType, label: 'Non-Return' },
  //   { value: 'booking' as StatusType, label: 'Booking' },
  // ];

  const headers = ['Book Information', 'Borrow Date', 'Due Date', 'State', 'Operate'];

  // const filteredRecords = currentRecords.filter(record => 
  //   activeStatus === 'all' || record.status.toLowerCase().replace('-', '') === activeStatus
  // );

  return (
    <div>
      {/* <FilterDropdown 
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        options={filterOptions}
        label="Filter Criteria:"
      /> */}
      <BorrowingTable 
        records={records}
        headers={headers}
        type="current"
      />
    </div>
  );
};

export default CurrentBorrowing;