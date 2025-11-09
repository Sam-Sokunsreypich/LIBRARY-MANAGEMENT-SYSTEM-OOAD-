import { columns } from "./column";
import { DataTable } from "./data-table";


const bookRequests = [
  {
    id: 1,
    created_at: "2025-11-09T09:30:00Z",
    email: "sokun.sreypich@example.com",
    book_title: "Introduction to Algorithms",
    status: "PENDING",
    took_book: false,
    book_issue: false,
    fine: 0,
  },
  {
    id: 2,
    created_at: "2025-11-08T14:15:00Z",
    email: "ratha.kim@example.com",
    book_title: "Clean Code",
    status: "APPROVED",
    took_book: true,
    book_issue: false,
    fine: 0,
  },
  {
    id: 3,
    created_at: "2025-11-07T10:05:00Z",
    email: "vannak.chan@example.com",
    book_title: "Database System Concepts",
    status: "REJECTED",
    took_book: false,
    book_issue: false,
    fine: 0,
  },
  {
    id: 4,
    created_at: "2025-11-06T11:45:00Z",
    email: "sreyna.phorn@example.com",
    book_title: "JavaScript: The Good Parts",
    status: "RETURNED",
    took_book: true,
    book_issue: false,
    fine: 0,
  },
  {
    id: 5,
    created_at: "2025-11-05T16:25:00Z",
    email: "maly.tep@example.com",
    book_title: "Operating System Principles",
    status: "RETURNED",
    took_book: true,
    book_issue: true,
    fine: 10,
  },
  {
    id: 6,
    created_at: "2025-11-04T13:00:00Z",
    email: "vichea.sorn@example.com",
    book_title: "Computer Networks",
    status: "APPROVED",
    took_book: true,
    book_issue: false,
    fine: 0,
  },
  {
    id: 7,
    created_at: "2025-11-03T09:50:00Z",
    email: "dara.lim@example.com",
    book_title: "Python Crash Course",
    status: "PENDING",
    took_book: false,
    book_issue: false,
    fine: 0,
  },
  {
    id: 8,
    created_at: "2025-11-02T17:10:00Z",
    email: "sokha.pov@example.com",
    book_title: "Artificial Intelligence: A Modern Approach",
    status: "RETURNED",
    took_book: true,
    book_issue: true,
    fine: 25,
  },
    {
    id: 9,
    created_at: "2025-11-09T09:30:00Z",
    email: "sokun.sreypich@example.com",
    book_title: "Introduction to Algorithms",
    status: "PENDING",
    took_book: false,
    book_issue: false,
    fine: 0,
  },
  {
    id: 10,
    created_at: "2025-11-08T14:15:00Z",
    email: "ratha.kim@example.com",
    book_title: "Clean Code",
    status: "APPROVED",
    took_book: true,
    book_issue: false,
    fine: 0,
  },
  {
    id: 11,
    created_at: "2025-11-07T10:05:00Z",
    email: "vannak.chan@example.com",
    book_title: "Database System Concepts",
    status: "REJECTED",
    took_book: false,
    book_issue: false,
    fine: 0,
  },
  {
    id: 12,
    created_at: "2025-11-06T11:45:00Z",
    email: "sreyna.phorn@example.com",
    book_title: "JavaScript: The Good Parts",
    status: "RETURNED",
    took_book: true,
    book_issue: false,
    fine: 0,
  },
  {
    id: 13,
    created_at: "2025-11-05T16:25:00Z",
    email: "maly.tep@example.com",
    book_title: "Operating System Principles",
    status: "RETURNED",
    took_book: true,
    book_issue: true,
    fine: 10,
  },
  {
    id: 14,
    created_at: "2025-11-04T13:00:00Z",
    email: "vichea.sorn@example.com",
    book_title: "Computer Networks",
    status: "APPROVED",
    took_book: true,
    book_issue: false,
    fine: 0,
  },
  {
    id: 15,
    created_at: "2025-11-03T09:50:00Z",
    email: "dara.lim@example.com",
    book_title: "Python Crash Course",
    status: "PENDING",
    took_book: false,
    book_issue: false,
    fine: 0,
  },
  {
    id: 16,
    created_at: "2025-11-02T17:10:00Z",
    email: "sokha.pov@example.com",
    book_title: "Artificial Intelligence: A Modern Approach",
    status: "RETURNED",
    took_book: true,
    book_issue: true,
    fine: 25,
  }
];


export default function TableMonitoring() {
  return (
      <>
      <div className="container mx-auto py-10">
      <DataTable columns={columns} data={bookRequests} />
    </div>
    
      </>
  )
}
