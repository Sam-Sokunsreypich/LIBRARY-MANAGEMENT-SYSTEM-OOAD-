
'use client';

import { useState } from 'react';
import BorrowingHistory from '@/components/books/BorrowingHistory';
import { TabType, StatusType } from '@/types/common';
import CurrentBorrowing from '@/components/books/CurrentBorowing';

export interface BookRecord {
  id: number;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  borrowDate: string;
  dueDate?: string; 
  returnDate?: string; 
  status: 'Borrowing' | 'Non-Return' | 'booking' | 'Returned';
  daysLeft?: number; 
}

export const currentRecords: BookRecord[] = [
  {
    id: 1,
    bookTitle: "The Great Gatsby",
    bookAuthor: "F. Scott Fitzgerald",
    bookCover: "https://picsum.photos/seed/book1/100/150.jpg",
    borrowDate: "2025/10/31",
    dueDate: "2025/11/12",
    status: "Borrowing",
    daysLeft: 5
  },
  {
    id: 2,
    bookTitle: "To Kill a Mockingbird",
    bookAuthor: "Harper Lee",
    bookCover: "https://picsum.photos/seed/book2/100/150.jpg",
    borrowDate: "2025/10/15",
    dueDate: "2025/10/30",
    status: "Non-Return",
    daysLeft: -5
  },
  {
    id: 3,
    bookTitle: "1984",
    bookAuthor: "George Orwell",
    bookCover: "https://picsum.photos/seed/book3/100/150.jpg",
    borrowDate: "2025/11/05",
    dueDate: "2025/11/20",
    status: "booking",
    daysLeft: 10
  }
];

export const historyRecords: BookRecord[] = [
  {
    id: 4,
    bookTitle: "Pride and Prejudice",
    bookAuthor: "Jane Austen",
    bookCover: "https://picsum.photos/seed/book4/100/150.jpg",
    borrowDate: "2025/09/01",
    returnDate: "2025/09/15",
    status: "Returned"
  },
  {
    id: 5,
    bookTitle: "The Catcher in the Rye",
    bookAuthor: "J.D. Salinger",
    bookCover: "https://picsum.photos/seed/book5/100/150.jpg",
    borrowDate: "2025/08/10",
    returnDate: "2025/08/25",
    status: "Returned"
  },
  {
    id: 6,
    bookTitle: "Animal Farm",
    bookAuthor: "George Orwell",
    bookCover: "https://picsum.photos/seed/book6/100/150.jpg",
    borrowDate: "2025/07/05",
    returnDate: "2025/07/20",
    status: "Returned"
  }
];

const BorrowingCenter = () => {
  const [activeTab, setActiveTab] = useState<TabType>('now');
  const [nowActiveStatus, setNowActiveStatus] = useState<StatusType>('all');
  const [historyActiveStatus, setHistoryActiveStatus] = useState<StatusType>('all');

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <header className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-800">Borrowing Center</h1>
            </div>
          </header>

          {/* Tab buttons */}
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'now'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('now')}
            >
              Now
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'history'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'now' && (
              <CurrentBorrowing 
                activeStatus={nowActiveStatus}
                setActiveStatus={setNowActiveStatus}
              />
            )}
            
            {activeTab === 'history' && (
              <BorrowingHistory 
                activeStatus={historyActiveStatus}
                setActiveStatus={setHistoryActiveStatus}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BorrowingCenter;