"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import formFields from "@/public/form.json";
import Title from "@/share/header_route/title";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { t } from "i18next";
interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export function CreateUser({ isOpen, onClose }: CreateUserModalProps) {
  const fields = formFields.createUser;
  const initialState: Record<string, string> = {};
  fields.forEach((form: { name: string; value?: string }) => {
    initialState[form.name] = form.value || "";
  });
  const [formData, setFormData] = useState<Record<string, string>>(initialState);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('User Data:', formData);
  };
  if (!isOpen) return null;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <div>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-[1111] flex items-center justify-center bg-black bg-opacity-50 p-52"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="bg-white w-[700px] p-4 rounded-2xl" >
                <div className="flex justify-between items-center">
                  <Title title="Create User" />
                  <div onClick={onClose} className="bg-gray-100 p-1 rounded-full">
                    <IoClose className="text-[15px]" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {fields.map((form, index) =>
                    form.type === "input" ? (
                      <div key={`${form.name}-${index}`}>
                        <Label htmlFor={form.name}>{form.label}</Label>
                        <Input
                          type="text"
                          id={form.name}
                          placeholder={form.placeholder || form.label}
                          name={form.name}
                          value={t(formData[form.name] ?? "")}
                          required={form.required}
                          disabled={form.disabled}
                          onChange={handleChange}
                        />
                      </div>
                    ) : null)}
                </div>
                <div className="flex justify-end mt-5">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
