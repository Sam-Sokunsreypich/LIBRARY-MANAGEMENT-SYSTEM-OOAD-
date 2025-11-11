import { deleteFine } from "@/app/admin/rule_of_fine/action/rule"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash } from "lucide-react"
import { Button } from "../ui/button"
interface props{
    onApprove?: () => void 
}
export function ApproveRequest({onApprove}:props) {

    
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <Button
                className='bg-green-600 hover:bg-green-700'
                size="sm">Approve</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure to Approve Request?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will be approve user to borrow book and wait for user to take at Library.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onApprove} className="bg-green-600 hover:bg-green-700">Approve</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
