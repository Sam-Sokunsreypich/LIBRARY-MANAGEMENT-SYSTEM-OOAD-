'use client';

import { useEffect, useState, useMemo } from 'react';
import BorrowingHistory from '@/components/books/BorrowingHistory';
import CurrentBorrowing from '@/components/books/CurrentBorowing';
import { getMemberId } from '../books/action/getMemberId';
import { getMonitoring } from '@/app/admin/system_monitoring/action/monitoring';
import { BookRequestType } from '@/types/BookRequestType';
import { TabType, StatusType } from '@/types/common';

const BorrowingCenter = () => {
  const [memberId, setMemberId] = useState<string | null>(null);
  const [allBookBorrow, setAllBookBorrow] = useState<BookRequestType[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('now');
  const [nowActiveStatus, setNowActiveStatus] = useState<StatusType>('all');
  const [historyActiveStatus, setHistoryActiveStatus] = useState<StatusType>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await getMemberId();
        setMemberId(id);

        const books = await getMonitoring();
        setAllBookBorrow(books);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter only books belonging to this member
  const myBookBorrow = useMemo(
    () => allBookBorrow.filter((b) => b.member.id === memberId),
    [allBookBorrow, memberId]
  );

  // Separate current and history records
  const currentRecords = useMemo(
    () => myBookBorrow.filter(
      (b) =>
        b.request_status.status_name !== 'REJECTED' &&
        b.request_status.status_name !== 'RETURN'
    ),
    [myBookBorrow]
  );

  const historyRecords = useMemo(
    () => myBookBorrow.filter(
      (b) => b.request_status.status_name === 'RETURN'
    ),
    [myBookBorrow]
  );

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
                // activeStatus={nowActiveStatus}
                // setActiveStatus={setNowActiveStatus}
                records={currentRecords}
              />
            )}

            {activeTab === 'history' && (
              <BorrowingHistory
                // activeStatus={historyActiveStatus}
                // setActiveStatus={setHistoryActiveStatus}
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
