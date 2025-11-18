import { BookRequestType } from "@/types/BookRequestType";
import Image from "next/image";


interface BorrowingTableProps {
  records: BookRequestType[];
  headers: string[];
  type: 'current' | 'history';
}

const BorrowingTable: React.FC<BorrowingTableProps> = ({ records, headers, type }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Borrowing': return 'bg-blue-100 text-blue-800';
      case 'Non-Return': return 'bg-red-100 text-red-800';
      case 'booking': return 'bg-yellow-100 text-yellow-800';
      case 'Returned': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  console.log('records', records)

  // const getActionText = (record: BookRecord) => {
  //   if (type === 'current') {
  //     if (record.status === 'Borrowing' && record.daysLeft !== undefined) {
  //       return record.daysLeft > 0 ? `Due ${record.daysLeft} days left` : 'Due today';
  //     } else if (record.status === 'Non-Return') {
  //       return 'Late';
  //     } else if (record.status === 'booking') {
  //       return 'Non';
  //     }
  //   }
  //   return 'View Details';
  // };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {records.length > 0 ? (
            records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <Image 
                      width={50}
                      height={75}
                      className=" rounded-lg object-cover" src={record.books.book_image} alt={record.books.book_title} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{record.books.book_title}</div>
                      {/* <div className="text-sm text-gray-500">{record.}</div> */}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.start_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {type === 'current' ? record.end_date : record.end_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.request_status.status_name)}`}>
                    {record.request_status.status_name}
                  </span>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-amber-600 hover:text-amber-900">
                    {getActionText(record)}
                  </button>
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="px-6 py-4 text-center text-sm text-gray-500">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowingTable;