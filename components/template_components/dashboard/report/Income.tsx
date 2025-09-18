"use client";
import Title from "@/share/header_route/title";
import { useEffect, useState } from "react";
import { useIncomeStore } from "@/store/incomeStore";
import { MdOutlineKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { TbTrashX } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";
import ConfirmModal from "@/share/alert/confirmDelete";
import { FiPlus } from "react-icons/fi";
import CreateIncome from "./c-income.tsx/create-Income";
import UpdateIncome from "./up-income.tsx/update-icnome";
import { useTranslation } from "react-i18next";
import NavHeaderVII from "@/share/header_route/nav_headerVII";

export default function Income() {
  const { t } = useTranslation("translation");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { incomeData, fetchIncome, removeIncome } = useIncomeStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectedIncome, setSelectedIncome] = useState<any>(null);

  const rowsPerPage = 13;

  useEffect(() => {
    fetchIncome();
  }, [fetchIncome]);

  const cols = [
    { id: 1, name: "" },
    { id: 2, name: t('amount') },
    { id: 3, name: t('description') },
    { id: 4, name: t('in_day') },
    { id: 5, name: t('in_month') },
    { id: 6, name: t('in_year') },
    { id: 7, name: t('action') },
  ];

  const totalPages = Math.ceil(incomeData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = incomeData.slice(startIndex, startIndex + rowsPerPage);

  const handleEdit = (income: any) => {
    setSelectedIncome(income); // store the income to edit
    setIsUpdateModalOpen(true); // open the update modal
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId === null) return;
    try {
      const res = await fetch(`http://localhost:3001/finance/income/${deleteId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to delete income");
      removeIncome(deleteId);
      toast.success("Income deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete income");
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleCloseUpdate = () => {
    setIsUpdateModalOpen(false);
    setSelectedIncome(null);
  };

  
  return (
    <div>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
      />


      <div className="flex justify-between items-center mb-3">
        <NavHeaderVII
          title={t('income_table')}
          home={t('overview')}
          label={t('income')}
          href="/overview/income"
        />
        <div onClick={() => setIsCreateOpen(true)} className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full">
          <FiPlus className="text-white" />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700">
        <table className="w-full bg-white dark:bg-gray-900">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              {cols.map((col) => (
                <th key={col.id} className="py-3 px-4 text-gray-500 font-[500] dark:text-gray-200 border-b dark:border-gray-700">
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((income, index) => (
                <tr key={income.id} className="text-center hover:bg-gray-100 dark:hover:bg-gray-800">
                  {/* Render sequential number */}
                  <td className="py-3 px-4 border-b dark:border-gray-700">{startIndex + index + 1}</td>
                  <td className="py-3 px-4 border-b dark:border-gray-700">{income.amount}</td>
                  <td className="py-3 px-4 border-b dark:border-gray-700">{income.description}</td>
                  <td className="py-3 px-4 border-b dark:border-gray-700">{income.in_day}</td>
                  <td className="py-3 px-4 border-b dark:border-gray-700">{income.in_month}</td>
                  <td className="py-3 px-4 border-b dark:border-gray-700">{income.in_year}</td>
                  <td className="py-3 px-4 border-b dark:border-gray-700 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(income)}
                      className="bg-transparent dark:border-gray-700 dark:text-white border text-black hover:text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      <CiEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(income.id)}
                      className="bg-transparent dark:border-gray-700 dark:text-white border text-black hover:text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      <TbTrashX />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={cols.length} className="py-4 px-4 text-center text-gray-500">
                  No income records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-4 space-x-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="h-8 w-8 flex justify-center items-center bg-gray-200 rounded-lg disabled:opacity-50  dark:bg-gray-700"
          >
            <MdKeyboardArrowLeft />
          </button>
          <span className="text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="h-8 w-8 flex justify-center items-center bg-gray-200 rounded-lg disabled:opacity-50 dark:bg-gray-700"
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        message="Are you sure you want to delete this income?"
        title={"Are you sure ?"}
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)} />

      {/* Create Income Modal */}
      {isCreateOpen && (
        <CreateIncome isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      )}

      {/* Update Income Modal */}
      {isUpdateModalOpen && selectedIncome && (
        <UpdateIncome
          isModalOpen={isUpdateModalOpen}
          onClose={handleCloseUpdate}
          income={selectedIncome}
        />
      )}
    </div>
  );
}