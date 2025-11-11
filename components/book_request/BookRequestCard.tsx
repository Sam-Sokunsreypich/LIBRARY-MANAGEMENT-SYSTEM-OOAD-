import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { BookRequestType } from '@/types/BookRequestType'

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from '../ui/button';
import RejectRequest from './RejectRequest';
import { ApproveRequest } from './ApproveRequest';
import { toast } from 'sonner';
import { approveRequest } from '@/app/admin/book_requests/action/acceptBorrow';

dayjs.extend(relativeTime);

interface Props {
  borrowRequest: BookRequestType
}

export default function BookRequestCard({ borrowRequest }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  async function onApprove() {
    try{
      if (!borrowRequest?.id) {
        toast.error("Missing request ID!");
        return;
      }
      await approveRequest(borrowRequest.id);
      toast.success("Rule Approved successfully!");
    }catch (error) {
      console.error(error);
      toast.error("Failed to Approved");
    }
    
}

  return (
    <Card className="w-full relative p-4 ">
      {/* Status badge (top-right) */}
      
      <p className="absolute top-3 right-3 px-3 py-1 text-xs text-muted-foreground mt-1">
                {dayjs(borrowRequest.created_at).fromNow()}
              </p>

      <CardHeader>
        <CardTitle>{borrowRequest.books.book_title}</CardTitle>

        <CardDescription className="flex flex-col gap-2 mt-2">
          <div className="flex items-start gap-4">
            <Image
              src={borrowRequest.books.book_image || "/placeholder-book.png"}
              alt={borrowRequest.books.book_title || "book image"}
              width={75}
              height={100}
              className="rounded-md object-cover"
            />

            <div className="flex flex-col gap-1 flex-1">
              <p className="text-sm text-muted-foreground">
                Requested by:
              </p>
              <strong>{borrowRequest.member.email}</strong>

              

              <div
        className={`w-20 flex justify-center px-2 py-1 text-xs font-semibold rounded-full 
        ${
          borrowRequest.request_status.status_name === "Approved"
            ? "bg-green-100 text-green-700"
            : borrowRequest.request_status.status_name === "Rejected"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {borrowRequest.request_status.status_name}
      </div>

              <div className="flex gap-2 mt-2 justify-end">
                <ApproveRequest
                onApprove={onApprove}
                />
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  Reject
                </Button>
              </div>
            </div>
          </div>

          <RejectRequest
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            defaultValues={borrowRequest}
            onSubmitData={(values) => {
              console.log("reject:", values);
              setIsEditModalOpen(false);
            }}
          />
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
