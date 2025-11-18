// "use client";
// import { useEffect, useState } from "react";
// import { ChartAreaDefault } from "./ChartAreaDefault"; // Your chart component

// export default function BorrowChart() {
//   const [chartData, setChartData] = useState<{ month: string; desktop: number }[]>([]);

//   useEffect(() => {
//     async function loadData() {
//       try {
//         const res = await fetch("/api/borrow-requests");
//         const data = await res.json();
//         const transformed = transformBorrowRequests(data);
//         setChartData(transformed);
//       } catch (err) {
//         console.error("Failed to load borrow requests", err);
//       }
//     }

//     loadData();
//   }, []);

//   return <ChartAreaDefault chartData={chartData} />;
// }

// // Move transform function inside or import it
// function transformBorrowRequests(data: { start_date: string }[]) {
//   const counts: Record<string, number> = {};

//   data.forEach((item) => {
//     if (!item.start_date) return;
//     const date = new Date(item.start_date);
//     const month = date.toLocaleString("default", { month: "short" });
//     counts[month] = (counts[month] || 0) + 1;
//   });

//   return Object.entries(counts)
//     .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
//     .map(([month, desktop]) => ({ month, desktop }));
// }
