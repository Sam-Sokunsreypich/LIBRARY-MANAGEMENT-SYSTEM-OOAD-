"use client"
import RuleCard from '@/components/rule_of_fine/RuleCard'
import { useEffect, useState } from 'react'
import SideNav from '../components/SideNav'
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import CreateFine from '@/components/rule_of_fine/CreateFine'
import { RuleType } from '@/types/RuleType'
import { getRule } from './action/rule'

// const initialRuleData: RuleType[] = [
//   {
//     id: 1,
//     title: "Late Return",
//     description: "Books must be returned by the due date. Late returns will incur a fine per day.",
//     fine: 0.5
//   },
//   {
//     id: 2,
//     title: "Lost or Damaged Book",
//     description: "If a book is lost or returned with significant damage, the borrower must pay the replacement cost.",
//     fine: 10
//   },
//   {
//     id: 3,
//     title: "Unauthorized Lending",
//     description: "Borrowers must not lend library books to others without permission.",
//     fine: 5
//   },
//   {
//     id: 4,
//     title: "Writing or Marking on Books",
//     description: "Writing, highlighting, or marking inside books is strictly prohibited.",
//     fine: 3
//   },
//   {
//     id: 5,
//     title: "Failure to Renew on Time",
//     description: "Books must be renewed before the due date to avoid late fees.",
//     fine: 0.25
//   },
//   {
//     id: 6,
//     title: "Borrowing Without Valid ID",
//     description: "Only registered members with a valid library ID can borrow books.",
//     fine: 2
//   },
//   {
//     id: 7,
//     title: "Tampering with Book Barcode or Label",
//     description: "Removing or altering book barcodes or library labels is prohibited.",
//     fine: 10
//   }
// ];


export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [rules, setRules] = useState<RuleType[]>([]);

  useEffect(() => {
  async function fetchRules() {
    try {
      const res = await getRule();
      setRules(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  fetchRules();
}, []);

  return (
    <div className='flex min-h-screen'>
      <SideNav />
    <div className='ml-72 mt-8 flex flex-col flex-1 bg-gray-50'>
        <div className='mb-20 flex justify-between mr-10'>
          <h2 className='text-gray-800 font-bold text-3xl '>Rule Management</h2> 
          <Button onClick={()=>setIsModalOpen(true)} type='button' className='bg-orange-500 hover:bg-orange-600'>Create Rule <CirclePlus /></Button>
        <CreateFine
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmitData={(values) => {
          console.log("Updated rule:", values)
          setIsModalOpen(false)
        }}
        />
        </div>
      <div className='ml-8 mr-12 grid grid-cols-3 gap-5'>
        {rules.map((rule) => (
        <RuleCard
          key={rule.id}
          ruleData={rule}
        />
      ))}
      </div>
    </div>
    </div>
  )
}