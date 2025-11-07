"use client"
import EditFine from '@/components/rule_of_fine/EditFine'
import RuleCard from '@/components/rule_of_fine/RuleCard'
import { useState } from 'react'
import SideNav from '../components/SideNav'

const initialRuleData: RuleType[] = [{
  id: 1,
  title: "aaa",
  description: "hellooo",
  fine: 4.3
},
{
  id: 2,
  title: "jjj",
  description: "hellooo",
  fine: 4.3
},{
  
  id: 3,
  title: "ccc",
  description: "hellooo",
  fine: 4.3

}]

export default function Page() {
   const [rules, setRules] = useState<RuleType[]>(initialRuleData)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEdit = (updatedRule: RuleType) => {
    setRules(prevRules => 
      prevRules.map(rule => 
        rule.id === updatedRule.id ? updatedRule : rule
      )
    )
    setIsModalOpen(false)
  }

  const handleDelete = (id: number) => {
    setRules(prevRules => prevRules.filter(rule => rule.id !== id))
  }

  console.log(rules);

  return (
    <div className='flex min-h-screen'>
      <SideNav />
    <div className='ml-64 flex flex-col flex-1 bg-gray-50'>
        <h2 className='text-gray-800 font-bold text-xl mb-20'>Rule Management</h2> 

      <div className='grid grid-cols-3'>
        {initialRuleData.map((rule) => (
        <RuleCard
          key={rule.id}
          ruleData={rule}
          onEdit={handleEdit}
          onDelete={() => handleDelete(rule.id)}
        />
      ))}
      </div>
    </div>
    </div>
  )
}