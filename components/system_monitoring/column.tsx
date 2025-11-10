"use client"

import { BookRequestType } from "@/types/BookRequestType"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const columns: ColumnDef<BookRequestType>[] = [
  { 
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
   accessorKey: "book_title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Book Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
    const status = row.original.status;

    let color = "";
    switch (status) {
      case "PENDING":
        color = "bg-yellow-500";
        break;
      case "APPROVED":
        color = "bg-green-500";
        break;
      case "REJECTED":
        color = "bg-red-500";
        break;
      case "RETURNED":
        color = "bg-blue-500";
        break;
      default:
        color = "bg-gray-500";
    }
    const flex = "flex items-center gap-2"
    const weight = "w-2 h-2 rounded-full"
    return (
      <span className={`${flex}`} >
        <div className={`${weight} ${color}`}></div>
        <span>{status}</span>
      </span>
    );
  }
  },
  {
    accessorKey: "took_book",
    header: "Took book?",
    cell: ({ row }) => (row.original.took_book ? "Yes" : ""),
  },
   {
    accessorKey: "book_issue",
    header: "Has issue?",
    cell: ({row}) => (row.original.book_issue ? "Yes" : "")
  },
  {
    accessorKey: "fine",
    header: "Fine",
    cell: ({row}) => (row.original.fine === 0 || "null" ? "" :`$${row.original.fine}`)
  },
  {
    accessorKey: "created_at",
    header: "Borrow day",
    cell: ({row}) =>{
      const createdAt = row.original.created_at;
      const timeAgo = dayjs(createdAt).fromNow();

      return timeAgo;
    }
  },
   {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.book_title)}
            >
              Copy Book Title
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.email)}
            >
              Copy Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }, 
]