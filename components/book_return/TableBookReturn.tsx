
import { columns } from "./column"
import { DataTable } from "./data_table"
import { BookRequestType } from "@/types/BookRequestType"

interface Props {
  requests: BookRequestType[]
}

export default function TableBookReturn({ requests }: Props) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={requests} />
    </div>
  )
}
