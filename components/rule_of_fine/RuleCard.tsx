"use client"

import { Pen, Trash } from 'lucide-react'
import { useState } from 'react'
import EditFine from './EditFine'
import { RuleType } from '@/types/RuleType'
import { DeleteFine } from './DeleteFine'
import { deleteFine } from '@/app/admin/rule_of_fine/action/rule'
import { toast } from 'sonner'

interface RuleCardProps {
  ruleData: RuleType
}

export default function RuleCard({ ruleData }: RuleCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  async function onDelete() {
        try{
          if (!ruleData?.id) {
            toast.error("Missing rule ID!");
            return;
          }
          await deleteFine(ruleData.id);
          toast.success("Rule Deleted successfully!");
        }catch (error) {
          console.error(error);
          toast.error("Failed to update rule");
        }
        
    }

  return (
    <div className='relative border border-gray-300 rounded-xl p-4 max-w-96 max-h-80'>
      <div className='flex justify-between'>
        <div>
          <h2 className='font-bold text-gray-800'>{ruleData.title}</h2>
          <p className='mb-10 text-gray-500'>{ruleData.description}</p>

          <div className='text-gray-500'>
            <span>Fine: </span>
            <span>$ {ruleData.fine}</span>
          </div>
        </div>

        <div className="absolute top-4 right-4 flex gap-1">
          <button
            onClick={() => setIsEditModalOpen(true)}
            aria-label="Edit"
          >
            <Pen className='text-yellow-400 w-4 h-4'/>
          </button>
          <button
            aria-label="Delete"
          >
            {/* <Trash className='text-red-500 w-4 h-4'/> */}
            <DeleteFine 
            onDelete={onDelete}
            />
          </button>
        </div>
      </div>

      <EditFine
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        defaultValues={ruleData}
        onSubmitData={(values) => {
          console.log("Updated rule:", values)
          setIsEditModalOpen(false)
        }}
      />
    </div>
  )
}
