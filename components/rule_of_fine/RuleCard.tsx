"use client"
import { Pen, Trash } from 'lucide-react'
import { useState } from 'react'
import EditFine from './EditFine'

interface RuleCardProps{
    ruleData: RuleType,
   onEdit?: (updatedRule: RuleType) => void
    onDelete?: ()=> void 
}

export default function RuleCard({ruleData, onEdit, onDelete}:RuleCardProps) {
const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    
  return (
    <div className='relative border border-gray-300 rounded-xl p-4 max-w-80 max-h-80'>
     <div className='flex justify-between'>
        <div>
        <h2 className='font-bold text-gray-800'>{ruleData.title}</h2>
      <p className='mb-10 text-gray-500'>{ruleData.description}</p>

      <div className='text-gray-500'>
        <span>Fine: </span>
      <span>$ {ruleData.fine}</span>
      </div>
      </div>
        <div  className="absolute top-4 right-4 flex gap-1">
        <button
              onClick={() => setIsEditModalOpen(true)}
              aria-label="Edit"
            >
                <Pen className='text-yellow-400 w-4 h-4'/>
            </button>
            <button
              onClick={onDelete} aria-label="Delete"
            >
                <Trash className='text-red-500 w-4 h-4'/>
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
