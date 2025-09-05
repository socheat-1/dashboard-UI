"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { AiOutlineDollarCircle, AiOutlineExclamationCircle } from "react-icons/ai";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// Sample data structure
const rawData = {
    day: [
        { label: "Mon", revenue: 1200, cost: 800 },
        { label: "Tue", revenue: 1500, cost: 900 },
        { label: "Wed", revenue: 1800, cost: 1100 },
        { label: "Thu", revenue: 1400, cost: 950 },
        { label: "Fri", revenue: 2200, cost: 1300 },
        { label: "Sat", revenue: 2800, cost: 1600 },
        { label: "Sun", revenue: 2100, cost: 1200 }
    ],
    week: [
        { label: "Week 1", revenue: 8500, cost: 5200 },
        { label: "Week 2", revenue: 9200, cost: 5800 },
        { label: "Week 3", revenue: 8800, cost: 5400 },
        { label: "Week 4", revenue: 10500, cost: 6300 }
    ],
    month: [
        { label: "Jan", revenue: 35000, cost: 22000 },
        { label: "Feb", revenue: 42000, cost: 26000 },
        { label: "Mar", revenue: 38000, cost: 24000 },
        { label: "Apr", revenue: 45000, cost: 28000 },
        { label: "May", revenue: 48000, cost: 30000 },
        { label: "Jun", revenue: 52000, cost: 32000 }
    ],
    year: [
        { label: "2021", revenue: 480000, cost: 320000 },
        { label: "2022", revenue: 520000, cost: 340000 },
        { label: "2023", revenue: 580000, cost: 380000 },
        { label: "2024", revenue: 620000, cost: 400000 }
    ]
};

export default function RevenueChart() {
    const [view, setView] = useState<"day" | "week" | "month" | "year">("month");
    const [currency, setCurrency] = useState<"USD" | "KHR">("USD");

    const chartData = rawData[view];

    const getChartTitle = () => {
        const titles = {
            day: "📅 Daily Revenue vs Cost",
            week: "📊 Weekly Revenue vs Cost",
            month: "📈 Monthly Revenue vs Cost",
            year: "🗓️ Annual Revenue vs Cost"
        };
        return titles[view];
    };

    const formatTooltipValue = (value: number) => {
        if (currency === "KHR") {
            return `៛${(value * 4000).toLocaleString()}`;
        } else {
            return `$${value.toLocaleString()}`;
        }
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white rounded-lg border border-gray-200 ">
                    <p className="font-medium text-gray-800 mb-1">{`${label}`}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{ color: entry.color }} className="text-sm">
                            {`${entry.name}: ${formatTooltipValue(entry.value)}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <main className="bg-white p-4 rounded-2xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex justify-between items-center">
                <h1 className="text-lg">
                    Revenue  and Cost
                </h1>
                <div className="flex  gap-4 flex-wrap items-center">
                    <Select value={view} onValueChange={(value) => setView(value as "day" | "week" | "month" | "year")}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Time Period</SelectLabel>
                                <SelectItem value="day">Daily</SelectItem>
                                <SelectItem value="week">Weekly</SelectItem>
                                <SelectItem value="month">Monthly</SelectItem>
                                <SelectItem value="year">Yearly</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select value={currency} onValueChange={(value) => setCurrency(value as "USD" | "KHR")}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Currency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Currency</SelectLabel>
                                <SelectItem value="USD">USD ($)</SelectItem>
                                <SelectItem value="KHR">KHR (៛)</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl text-center flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                        <AiOutlineDollarCircle className="text-blue-600 text-2xl" />
                        <h3 className="text-lg font-semibold text-gray-700">Total Income</h3>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">
                        {currency === "KHR"
                            ? `៛${(chartData.reduce((sum: number, item: { revenue: number }) => sum + item.revenue, 0) * 4000).toLocaleString()}`
                            : `$${chartData.reduce((sum: number, item: { revenue: number }) => sum + item.revenue, 0).toLocaleString()}`
                        }
                    </p>
                </div>

                <div className="bg-gray-50  p-4 rounded-2xl text-center flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                        <AiOutlineExclamationCircle className="text-red-600 text-2xl" />
                        <h3 className="text-lg font-semibold text-gray-700">Total Expenses</h3>
                    </div>
                    <p className="text-2xl font-bold text-red-600">
                        {currency === "KHR"
                            ? `៛${(chartData.reduce((sum: number, item: { cost: number }) => sum + item.cost, 0) * 4000).toLocaleString()}`
                            : `$${chartData.reduce((sum: number, item: { cost: number }) => sum + item.cost, 0).toLocaleString()}`
                        }
                    </p>
                </div>
            </div>


            {/* Chart */}
            <div className="w-full bg-white rounded-xl  mt-5">
                <ResponsiveContainer width="100%" height={500}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis
                            dataKey="label"
                            tick={{ fontSize: 12 }}
                            angle={view === "day" ? -45 : 0}
                            textAnchor={view === "day" ? "end" : "middle"}
                            height={view === "day" ? 80 : 60}
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => {
                                if (currency === "KHR") return `៛${(value * 4000 / 1000).toLocaleString()}k`;
                                return `$${(value / 1000).toLocaleString()}k`;
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar
                            dataKey="revenue"
                            fill="#3b82f6"
                            name="Revenue"
                            radius={[2, 2, 0, 0]}
                        />
                        <Bar
                            dataKey="cost"
                            fill="#ef4444"
                            name="Cost"
                            radius={[2, 2, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>


        </main>
    );
}