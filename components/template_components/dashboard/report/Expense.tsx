"use client";
import NavHeaderVII from "@/share/header_route/nav_headerVII";
import Title from "@/share/header_route/title";
import { useExpenseStore } from "@/store/expenseStore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";


export default function Expense() {
    const { expenseData, fetchExpense } = useExpenseStore();
    const { t } = useTranslation("translation");

    useEffect(() => {
        fetchExpense();
    }, [fetchExpense]);

    const cols = [
        { id: 1, name: "Id" },
        { id: 2, name: "Amount" },
        { id: 3, name: "Description" },
        { id: 4, name: "In month" },
        { id: 5, name: "In day" },
        { id: 6, name: "Created at" },
    ];

//     const cols = [
//     { id: 1, name: "" },
//     { id: 2, name: t('amount') },
//     { id: 3, name: t('description') },
//     { id: 4, name: t('in_day')},
//     { id: 5, name: t('in_month') },
//     { id: 6, name: t('in_year') },
//     { id: 7, name: t('action') },
//   ];

    return (
        <div className="">
           <div className="flex justify-between items-center mb-3">
                   <NavHeaderVII
                     title='expense_table'
                     home='overview'
                     label='expense'
                     href="/overview/expense"
                   />
                   {/* <div onClick={() => setIsCreateOpen(true)} className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full">
                     <FiPlus className="text-white" />
                   </div> */}
                 </div>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700">
                <table className="w-full bg-white dark:bg-gray-900">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                            {cols.map((col) => (
                                <th className="py-3 px-4 border-b text-gray-500 font-[500] dark:text-gray-200 dark:border-gray-700" key={col.id}>
                                    {col.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {expenseData.map((expense) => (
                            <tr key={expense.id} className="text-center">
                                <td className="py-3 px-4 border-b dark:border-gray-700">{expense.id}</td>
                                <td className="py-3 px-4 border-b dark:border-gray-700">{expense.amount}</td>
                                <td className="py-3 px-4 border-b dark:border-gray-700">{expense.description}</td>
                                <td className="py-3 px-4 border-b dark:border-gray-700">{expense.in_month}</td>
                                <td className="py-3 px-4 border-b dark:border-gray-700">{expense.in_day}</td>
                                <td className="py-3 px-4 border-b dark:border-gray-700">
                                    {expense.createdAt
                                        ? new Date(expense.createdAt).toLocaleString()
                                        : "N/A"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
