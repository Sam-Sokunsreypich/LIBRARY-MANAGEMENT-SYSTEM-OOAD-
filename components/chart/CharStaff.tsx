// "use client"

// import { TrendingUp } from "lucide-react"
// import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"

// export const description = "A simple area chart"

// const chartData = [
//   { day: "Monday", borrowing: 186 },
//   { day: "Tuesday", borrowing: 305 },
//   { day: "Wednesday", borrowing: 237 },
//   { day: "Thirsday", borrowing: 73 },
//   { day: "Friday", borrowing: 209 },
//   { day: "S", borrowing: 214 },
// ]

// const chartConfig = {
//   borrowing: {
//     label: "Desktop",
//     color: "var(--chart-1)",
//   },
// } satisfies ChartConfig

// export function ChartAreaDefault({
//     chartData,
//   }: {
//     chartData: { day: string; borrowing: number }[]
//   }) {
//     // ... use the chartData instead of static
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Borrowing</CardTitle>
//           <CardDescription>Showing total Borrowing for the last 6 months</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ChartContainer config={{ borrowing: { label: "Desktop", color: "var(--chart-1)" } }}>
//             <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
//               <CartesianGrid vertical={false} />
//               <XAxis
//                 dataKey="day"
//                 tickLine={false}
//                 axisLine={false}
//                 tickMargin={8}
//               />
//               <Area
//                 dataKey="borrowing"
//                 type="natural"
//                 fill="var(--color-borrowing)"
//                 fillOpacity={0.4}
//                 stroke="var(--color-borrowing)"
//               />
//             </AreaChart>
//           </ChartContainer>
//         </CardContent>
//       </Card>
//     );
//   }
  
