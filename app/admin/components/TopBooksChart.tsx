"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/lib/supabase/index";

interface TopBook {
  title: string;
  count: number;
}

export default function TopBooksChart() {
  const [data, setData] = useState<TopBook[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Step 1: Fetch issued books and group by book_id
      const { data: issued, error } = await supabase
        .from("issued_books")
        .select("book_id");

      if (error) {
        console.error("Error fetching issued books:", error);
        return;
      }

      const bookCounts: Record<number, number> = {};
      issued?.forEach((row) => {
        bookCounts[row.book_id] = (bookCounts[row.book_id] || 0) + 1;
      });

      // Step 2: Sort and take top 5 books
      const topBookIds = Object.entries(bookCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id]) => parseInt(id));

      // Step 3: Get book titles
      const { data: books } = await supabase
        .from("books")
        .select("id, title")
        .in("id", topBookIds);

      // Step 4: Merge titles and counts
      const chartData = books?.map((b) => ({
        title: b.title,
        count: bookCounts[b.id] || 0,
      }));

      setData(chartData || []);
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
