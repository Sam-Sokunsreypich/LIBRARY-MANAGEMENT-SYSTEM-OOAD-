
import FilterDropdown from './FilterDropdown';
import BorrowingTable from './BorrowingTable';

import { StatusType } from '@/types/common';
import { BookRequestType } from '@/types/BookRequestType';


interface BorrowingHistoryProps {
  activeStatus?: StatusType;
  setActiveStatus?: (status: StatusType) => void;
  records: BookRequestType[]
}

const BorrowingHistory: React.FC<BorrowingHistoryProps> = ({ activeStatus, setActiveStatus, records }) => {
  // const filterOptions = [
  //   { value: 'all' as StatusType, label: 'All Status' },
  //   { value: 'returned' as StatusType, label: 'Returned' },
  // ];

  const headers = ['Book Information', 'Borrow Date', 'Return Date', 'State', 'Operate'];

  // const filteredRecords = historyRecords.filter(record => 
  //   activeStatus === 'all' || record.status.toLowerCase() === activeStatus
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
        type="history"
      />
    </div>
  );
};

export default BorrowingHistory;