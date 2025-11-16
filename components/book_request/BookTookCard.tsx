"use client";

import React, { useState } from "react";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { BookRequestType } from "@/types/BookRequestType";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { took_book } from "@/app/admin/book_requests/action/tookbook";
dayjs.extend(relativeTime);

interface Props {
  request: BookRequestType;   // renamed for clarity
}

export default function BookTookCard({ request }: Props) {
  if (!request) return null;

  const [loading, setLoading] = useState(false);
  const [isTaken, setIsTaken] = useState(request.took_book ?? false);

 // local UI update

  async function handleTake() {
    try {
      setLoading(true);

      await took_book(request.id, {
        start_date: dayjs().format("YYYY-MM-DD"),
        end_date: dayjs().add(7, "day").format("YYYY-MM-DD"),
      });

      toast.success("Book marked as TAKEN!");
      setIsTaken(true); // update UI instantly
    } catch (error) {
      console.error("Take error:", error);
      toast.error("Failed to update");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full relative p-4 shadow-sm">
      {/* Time badge */}
      <p className="absolute top-3 right-3 px-3 py-1 text-xs text-muted-foreground">
        {dayjs(request.created_at).fromNow()}
      </p>

      <CardHeader>
        <CardDescription className="flex flex-col gap-4 mt-2">
          <div className="flex items-start gap-4">
            {/* Book Image */}
            <Image
              src={request.books.book_image || "/placeholder-book.png"}
              alt={request.books.book_title || "book image"}
              width={75}
              height={100}
              className="rounded-md object-cover"
            />

            {/* Book Info */}
            <div className="flex flex-col flex-1">
              <p className="text-lg font-semibold">{request.books.book_title}</p>
              <p className="text-sm text-muted-foreground">Requested by:</p>
              <strong>{request.member.email}</strong>

              {/* Status + Button */}
              <div className="flex justify-between items-center mt-3">
                {/* Status Badge */}
                <div
                  className={`w-24 h-8 flex justify-center items-center text-xs font-semibold rounded-2xl
                    ${
                      isTaken
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {isTaken ? "Took" : "Approved"}
                </div>

                {/* Take Button */}
                {!isTaken && (
                  <Button onClick={handleTake} disabled={loading}>
                    {loading ? "Processing..." : "Take"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}