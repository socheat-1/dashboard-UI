"use client";

import { useEffect, useState } from "react";
import { AiOutlineDollarCircle, AiOutlineExclamationCircle, AiOutlineArrowLeft } from "react-icons/ai";
// Removed recharts import
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDatetimeStore } from "@/store/datetimeStore";
import NavHeaderVII from "@/share/header_route/nav_headerVII";
import { useTranslation } from "react-i18next";

interface DrillDownState {
    view: "day" | "week" | "month" | "year";
    year: string;
    month?: string;
    week?: string;
}

export default function RevenueChart() {
    const [currentDrillDown, setCurrentDrillDown] = useState<DrillDownState>({
        view: "month",
        year: ""
    });
    const { t } = useTranslation("translation");
    const [drillDownHistory, setDrillDownHistory] = useState<DrillDownState[]>([]);
    const [currency, setCurrency] = useState<"USD" | "KHR">("USD");
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const { days, months, years, fetchDatetime } = useDatetimeStore();

    // Fetch income summary
    const fetchIncome = async (drillDown: DrillDownState) => {
        try {
            setLoading(true);
            // For now, use basic API without year filtering since your current API doesn't support it
            const url = `http://localhost:3001/finance/summary?view=${drillDown.view}`;
            
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch data");

            const data = await res.json();

            // Filter out empty data
            const filteredData = data.filter(
                (item: any) =>
                    (item.totalIncome && item.totalIncome > 0) ||
                    (item.totalExpenses && item.totalExpenses > 0)
            );

            // Format period labels based on view
            const mapped = filteredData.map((item: any) => {
                let formattedLabel = item.period;
                
                // Format the period label based on view type
                if (drillDown.view === 'month') {
                    const monthNames = [
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                    ];
                    const monthIndex = parseInt(item.period) - 1;
                    formattedLabel = monthNames[monthIndex] || item.period;
                } else if (drillDown.view === 'week') {
                    formattedLabel = `Week ${item.period}`;
                } else if (drillDown.view === 'year') {
                    formattedLabel = `20${item.period}`;
                }

                return {
                    label: formattedLabel,
                    revenue: item.totalIncome || 0,
                    cost: item.totalExpenses || 0,
                    balance: item.balance || 0,
                    originalPeriod: item.period // Keep original for click handling
                };
            });

            setChartData(mapped);
        } catch (err) {
            console.error("Error fetching revenue data:", err);
            setChartData([]);
        } finally {
            setLoading(false);
        }
    };

    // Handle bar click for drill down
    const handleBarClick = (data: any) => {
        if (!data || !data.activePayload || !data.activePayload[0]) return;
        
        const clickedData = data.activePayload[0].payload;
        const currentState = { ...currentDrillDown };
        
        // Save current state to history
        setDrillDownHistory(prev => [...prev, currentState]);
        
        let newDrillDown: DrillDownState = { ...currentState };
        
        // For now, just change the view since API doesn't support filtering
        // This is a UI-only drill down - you'll need to enhance the API for real filtering
        switch (currentDrillDown.view) {
            case "year":
                // Clicked on a year, drill down to months
                newDrillDown = {
                    view: "month",
                    year: clickedData.originalPeriod || clickedData.label,
                };
                break;
                
            case "month":
                // Clicked on a month, drill down to weeks
                newDrillDown = {
                    view: "week",
                    year: currentDrillDown.year || new Date().getFullYear().toString(),
                    month: clickedData.originalPeriod || clickedData.label,
                };
                break;
                
            case "week":
                // Clicked on a week, drill down to days
                newDrillDown = {
                    view: "day",
                    year: currentDrillDown.year || new Date().getFullYear().toString(),
                    month: currentDrillDown.month,
                    week: clickedData.originalPeriod || clickedData.label,
                };
                break;
                
            default:
                // Already at day level, no further drill down
                return;
        }
        
        setCurrentDrillDown(newDrillDown);
    };

    // Handle back navigation
    const handleBack = () => {
        if (drillDownHistory.length === 0) return;
        
        const previousState = drillDownHistory[drillDownHistory.length - 1];
        setDrillDownHistory(prev => prev.slice(0, -1));
        setCurrentDrillDown(previousState);
    };

    // Handle view selector change (reset drill down)
    const handleViewChange = (newView: "day" | "week" | "month" | "year") => {
        setDrillDownHistory([]);
        setCurrentDrillDown({
            view: newView,
            year: currentDrillDown.year
        });
    };

    // Handle year selector change
    const handleYearChange = (newYear: string) => {
        setDrillDownHistory([]);
        setCurrentDrillDown({
            view: currentDrillDown.view,
            year: newYear
        });
    };

    // Fetch datetime options on mount
    useEffect(() => {
        const init = async () => {
            await fetchDatetime();
        };
        init();
    }, []);

    // Set default year when years are loaded
    useEffect(() => {
        if (!currentDrillDown.year && years.length > 0) {
            setCurrentDrillDown(prev => ({
                ...prev,
                year: years[0].value
            }));
        }
    }, [years]);

    // Fetch income whenever drill down state changes
    useEffect(() => {
        fetchIncome(currentDrillDown);
    }, [currentDrillDown]);

    const formatTooltipValue = (value: number) => {
        return currency === "KHR"
            ? `៛${(value * 4000).toLocaleString()}`
            : `$${value.toLocaleString()}`;
    };

    const CustomTooltip = ({ data, x, y, visible }: { data: any; x: number; y: number; visible: boolean }) => {
        if (!visible || !data) return null;
        
        return (
            <div 
                className="bg-white p-2 rounded-lg border border-gray-200 shadow-lg absolute z-10 pointer-events-none"
                style={{ 
                    left: x + 10, 
                    top: y - 10,
                    transform: 'translate(0, -100%)'
                }}
            >
                <p className="font-medium text-gray-800 mb-1">{data.label}</p>
                <p className="text-sm" style={{ color: '#3b82f6' }}>
                    Revenue: {formatTooltipValue(data.revenue)}
                </p>
                <p className="text-sm" style={{ color: '#ef4444' }}>
                    Cost: {formatTooltipValue(data.cost)}
                </p>
                {currentDrillDown.view !== "day" && (
                    <p className="text-xs text-gray-500 mt-1">Click to drill down</p>
                )}
            </div>
        );
    };

    const totalIncome = chartData.reduce((sum, item) => sum + (item.revenue || 0), 0);
    const totalExpenses = chartData.reduce((sum, item) => sum + (item.cost || 0), 0);

    const getViewLabel = (view: string) => {
        switch (view) {
            case "day": return "Daily";
            case "week": return "Weekly";
            case "month": return "Monthly";
            case "year": return "Yearly";
            default: return "Monthly";
        }
    };

    const getBreadcrumb = () => {
        let breadcrumb = `${getViewLabel(currentDrillDown.view)} - ${currentDrillDown.year}`;
        if (currentDrillDown.month) {
            breadcrumb += ` - ${currentDrillDown.month}`;
        }
        if (currentDrillDown.week) {
            breadcrumb += ` - Week ${currentDrillDown.week}`;
        }
        return breadcrumb;
    };

    // Custom Bar Chart Component
    const CustomBarChart = ({ 
        data, 
        currency, 
        onBarClick, 
        isClickable, 
        view 
    }: {
        data: any[];
        currency: "USD" | "KHR";
        onBarClick: (data: any) => void;
        isClickable: boolean;
        view: string;
    }) => {
        const [tooltip, setTooltip] = useState<{ data: any; x: number; y: number; visible: boolean }>({
            data: null,
            x: 0,
            y: 0,
            visible: false
        });

        if (data.length === 0) return null;

        // Calculate chart dimensions and scales
        const chartWidth = 1120;
        const chartHeight = 400;
        const margin = { top: 20, right: 30, bottom: view === "day" ? 80 : 60, left: 80 };
        const innerWidth = chartWidth - margin.left - margin.right;
        const innerHeight = chartHeight - margin.top - margin.bottom;

        // Find max value for scaling
        const maxValue = Math.max(
            ...data.map(d => Math.max(d.revenue || 0, d.cost || 0))
        );
        const yScale = innerHeight / (maxValue * 1.1); // 10% padding at top

        // Bar dimensions
        const barWidth = Math.min(60, innerWidth / data.length * 0.8);
        const barSpacing = innerWidth / data.length;

        const formatYTickValue = (value: number) => {
            return currency === "KHR"
                ? `៛${((value * 4000) / 1000).toLocaleString()}k`
                : `${(value / 1000).toLocaleString()}k`;
        };

        // Generate Y-axis ticks
        const yTicks = [];
        const tickCount = 5;
        for (let i = 0; i <= tickCount; i++) {
            yTicks.push((maxValue * i) / tickCount);
        }

        const handleBarClick = (item: any, event: React.MouseEvent) => {
            if (isClickable) {
                onBarClick({ activePayload: [{ payload: item }] });
            }
        };

        const handleMouseMove = (item: any, event: React.MouseEvent) => {
            const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
            setTooltip({
                data: item,
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
                visible: true
            });
        };

        const handleMouseLeave = () => {
            setTooltip(prev => ({ ...prev, visible: false }));
        };

        return (
            <>
            
            <div className="relative w-full h-[500px] overflow-x-auto">
                <div className="relative" style={{ width: chartWidth, height: chartHeight }}>
                    <svg width={chartWidth} height={chartHeight} className="border rounded">
                        {/* Chart background */}
                        <rect
                            x={margin.left}
                            y={margin.top}
                            width={innerWidth}
                            height={innerHeight}
                            fill="transparent"
                            stroke="#e5e7eb"
                            strokeWidth={1}
                        />

                        {/* Grid lines */}
                        {yTicks.map((tick, index) => (
                            <line
                                key={index}
                                x1={margin.left}
                                y1={margin.top + innerHeight - (tick * yScale)}
                                x2={margin.left + innerWidth}
                                y2={margin.top + innerHeight - (tick * yScale)}
                                stroke="#f3f4f6"
                                strokeWidth={1}
                            />
                        ))}

                        {/* Y-axis */}
                        <line
                            x1={margin.left}
                            y1={margin.top}
                            x2={margin.left}
                            y2={margin.top + innerHeight}
                            stroke="#6b7280"
                            strokeWidth={1}
                        />

                        {/* X-axis */}
                        <line
                            x1={margin.left}
                            y1={margin.top + innerHeight}
                            x2={margin.left + innerWidth}
                            y2={margin.top + innerHeight}
                            stroke="#6b7280"
                            strokeWidth={1}
                        />

                        {/* Y-axis ticks and labels */}
                        {yTicks.map((tick, index) => (
                            <g key={index}>
                                <line
                                    x1={margin.left - 5}
                                    y1={margin.top + innerHeight - (tick * yScale)}
                                    x2={margin.left}
                                    y2={margin.top + innerHeight - (tick * yScale)}
                                    stroke="#6b7280"
                                    strokeWidth={1}
                                />
                                <text
                                    x={margin.left - 10}
                                    y={margin.top + innerHeight - (tick * yScale) + 4}
                                    textAnchor="end"
                                    fontSize="12"
                                    fill="#6b7280"
                                >
                                    {formatYTickValue(tick)}
                                </text>
                            </g>
                        ))}

                        {/* Bars */}
                        {data.map((item, index) => {
                            const x = margin.left + (index * barSpacing) + (barSpacing - barWidth) / 2;
                            const revenueHeight = (item.revenue || 0) * yScale;
                            const costHeight = (item.cost || 0) * yScale;
                            const revenueY = margin.top + innerHeight - revenueHeight;
                            const costY = margin.top + innerHeight - costHeight;

                            return (
                                <g key={index}>
                                    {/* Revenue bar */}
                                    <rect
                                        x={x}
                                        y={revenueY}
                                        width={barWidth / 2 - 2}
                                        height={revenueHeight}
                                        fill="#3b82f6"
                                        rx={4}
                                        style={{ 
                                            cursor: isClickable ? "pointer" : "default",
                                            opacity: 0.8
                                        }}
                                        onClick={(e) => handleBarClick(item, e)}
                                        onMouseMove={(e) => handleMouseMove(item, e)}
                                        onMouseLeave={handleMouseLeave}
                                        className="hover:opacity-100 transition-opacity"
                                    />
                                    
                                    {/* Cost bar */}
                                    <rect
                                        x={x + barWidth / 2}
                                        y={costY}
                                        width={barWidth / 2 - 2}
                                        height={costHeight}
                                        fill="#ef4444"
                                        rx={4}
                                        style={{ 
                                            cursor: isClickable ? "pointer" : "default",
                                            opacity: 0.8
                                        }}
                                        onClick={(e) => handleBarClick(item, e)}
                                        onMouseMove={(e) => handleMouseMove(item, e)}
                                        onMouseLeave={handleMouseLeave}
                                        className="hover:opacity-100 transition-opacity"
                                    />
                                </g>
                            );
                        })}

                        {/* X-axis labels */}
                        {data.map((item, index) => {
                            const x = margin.left + (index * barSpacing) + barSpacing / 2;
                            const y = margin.top + innerHeight + 20;
                            
                            return (
                                <text
                                    key={index}
                                    x={x}
                                    y={y}
                                    textAnchor={view === "day" ? "end" : "middle"}
                                    fontSize="12"
                                    fill="#6b7280"
                                    transform={view === "day" ? `rotate(-45, ${x}, ${y})` : undefined}
                                >
                                    {item.label}
                                </text>
                            );
                        })}
                    </svg>

                    {/* Legend */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                            <span className="text-sm text-gray-600">Revenue</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-red-500 rounded"></div>
                            <span className="text-sm text-gray-600">Cost</span>
                        </div>
                    </div>

                    {/* Custom Tooltip */}
                    <CustomTooltip 
                        data={tooltip.data} 
                        x={tooltip.x} 
                        y={tooltip.y} 
                        visible={tooltip.visible} 
                    />
                </div>
            </div>
             </>
        );
    };

    return (
        <>
         <NavHeaderVII
                    title={t('dashboard')}
                    home={t('overview')}
                    label={t('dashboard')}
                    href="/setting/fontSetting"
                  />
          
        <main className="bg-white p-4 rounded-2xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700 mt-5">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        {drillDownHistory.length > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleBack}
                                className="flex items-center gap-2"
                            >
                                <AiOutlineArrowLeft className="w-4 h-4" />
                                Back
                            </Button>
                        )}
                        <h1 className="text-lg font-semibold">Revenue and Cost</h1>
                    </div>
                    <p className="text-sm text-gray-500">
                        {getBreadcrumb()} ({chartData.length} periods)
                        {currentDrillDown.view !== "day" && (
                            <span className="ml-2 text-blue-600">• Click bars to drill down</span>
                        )}
                    </p>
                </div>

                {/* Controls - Remove year selector for now since API doesn't support year filtering */}
                <div className="flex gap-4 flex-wrap items-center">
                    {/* View selector */}
                    <Select
                        value={currentDrillDown.view}
                        onValueChange={handleViewChange}
                    >
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

                    {/* Currency selector */}
                    <Select
                        value={currency}
                        onValueChange={(value) => setCurrency(value as "USD" | "KHR")}
                    >
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

            {/* Summary */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 p-4 rounded-2xl text-center flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                        <AiOutlineDollarCircle className="text-blue-600 text-2xl" />
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                            Total Income ({getViewLabel(currentDrillDown.view)})
                        </h3>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">
                        {currency === "KHR"
                            ? `៛${(totalIncome * 4000).toLocaleString()}`
                            : `$${totalIncome.toLocaleString()}`}
                    </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 p-4 rounded-2xl text-center flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                        <AiOutlineExclamationCircle className="text-red-600 text-2xl" />
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                            Total Expenses ({getViewLabel(currentDrillDown.view)})
                        </h3>
                    </div>
                    <p className="text-2xl font-bold text-red-600">
                        {currency === "KHR"
                            ? `៛${(totalExpenses * 4000).toLocaleString()}`
                            : `$${totalExpenses.toLocaleString()}`}
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="w-full bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl mt-5 p-4">
                {loading ? (
                    <div className="p-10 text-center text-gray-500 animate-pulse">
                        Loading {getViewLabel(currentDrillDown.view).toLowerCase()} data...
                    </div>
                ) : chartData.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">
                        No data available for {getViewLabel(currentDrillDown.view).toLowerCase()} view
                    </div>
                ) : (
                    <CustomBarChart 
                        data={chartData}
                        currency={currency}
                        onBarClick={handleBarClick}
                        isClickable={currentDrillDown.view !== "day"}
                        view={currentDrillDown.view}
                    />
                )}
            </div>
        </main>
         </>
    );
}