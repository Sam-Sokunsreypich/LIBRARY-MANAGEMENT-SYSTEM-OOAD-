'use client';

import { useEffect, useState, useMemo } from 'react';
import BorrowingHistory from '@/components/books/BorrowingHistory';
import { getBorrowById } from '../books/action/book';
import { BookRequestType } from '@/types/BookRequestType';
import { TabType, StatusType } from '@/types/common';
import CurrentBorrowing from '@/components/books/CurrentBorowing';

const BorrowingCenter = () => {
  const [allBookBorrow, setAllBookBorrow] = useState<BookRequestType[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('now');
  const [nowActiveStatus, setNowActiveStatus] = useState<StatusType>('all');
  const [historyActiveStatus, setHistoryActiveStatus] = useState<StatusType>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const books = await getBorrowById(); // server function
        setAllBookBorrow(books);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Log all borrow data
  console.log('allBookBorrow', allBookBorrow);

  // Separate current and history records
  const currentRecords = useMemo(
    () =>
      allBookBorrow.filter(
        (b) =>
          b.request_status.status_name !== 'REJECTED' &&
          b.request_status.status_name !== 'RETURNED'
      ),
    [allBookBorrow]
  );

  const historyRecords = useMemo(
    () =>
      allBookBorrow.filter(
        (b) => b.request_status.status_name === 'RETURNED'
      ),
    [allBookBorrow]
  );

  console.log('currentRecords', currentRecords);
  console.log('historyRecords', historyRecords);

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <header className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-800">
                Borrowing Center
              </h1>
            </div>
          </header>

          {/* Tabs */}
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
                records={currentRecords}
              />
            )}

            {activeTab === 'history' && (
              <BorrowingHistory
                activeStatus={historyActiveStatus}
                setActiveStatus={setHistoryActiveStatus}
                records={historyRecords}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BorrowingCenter;
