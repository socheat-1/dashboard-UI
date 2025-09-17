import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type ConfirmModalProps = {
    message: string;
    title: string;
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmModal({ message, title, isOpen, onConfirm, onCancel }: ConfirmModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-[400px]"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex justify-center items-center">
                            <img className="h-28 w-28" src="https://cdn1.iconfinder.com/data/icons/unigrid-emoji/60/012_023_areyousure_face_wondering_emoji-512.png" alt="" />
                        </div>
                        <h2 className="text-center text-[30px] font-bold text-gray-500">{title}</h2>
                        <p className="text-center mb-4 text-gray-500">{message}</p>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                                onClick={onConfirm}
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
