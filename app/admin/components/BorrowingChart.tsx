"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/lib/supabase/index";

interface BorrowData {
  month: string;
  borrowed: number;
}

export default function BorrowingChart() {
  const [data, setData] = useState<BorrowData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: books, error } = await supabase
        .from("issued_books")
        .select("issued_date");

      if (error) {
        console.error("Error fetching issued books:", error);
        return;
      }

      // Group by month
      const monthCounts: Record<string, number> = {};
      books?.forEach((book) => {
        const date = new Date(book.issued_date);
        const month = date.toLocaleString("default", { month: "short" });
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      });

      const chartData = Object.entries(monthCounts).map(([month, count]) => ({
        month,
        borrowed: count,
      }));

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="borrowed"
          stroke="#2563eb"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
