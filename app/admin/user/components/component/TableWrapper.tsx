"use client";
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const UserTable = dynamic(() => import('./UserTable'), { ssr: true });
const StaffTable = dynamic(() => import('./StaffTable'), { ssr: true });
const AdminTable = dynamic(() => import('./AdminTable'), { ssr: true });

const TableComponents: { [key: number]: React.ComponentType<any> } = {
  1: UserTable,
  2: StaffTable,
  3: AdminTable,
};

interface TableWrapperProps {
  roleNum: number;
}

export default function TableWrapper({ roleNum }: TableWrapperProps) {
  const CurrentTable = TableComponents[roleNum];

  if (!CurrentTable) {
    return (
      <div className="text-center py-10 text-gray-500">
        Please select a role to view the table.
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="text-center py-10 text-gray-500">
        Loading table...
      </div>
    }>
      <CurrentTable />
    </Suspense>
  );
}