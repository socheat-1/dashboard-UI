"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Title from "@/share/header_route/title";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import formFields from "@/public/form.json";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDatetimeStore } from "@/store/datetimeStore";
import toast from "react-hot-toast";
import { useIncomeStore } from "@/store/incomeStore";
import GlobalLoader from "@/app/loading";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface CreateIncomeProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateIncome({ isOpen, onClose }: CreateIncomeProps) {
    const { t } = useTranslation("translation");
    const fields = formFields.createIncome;
    const initialState: Record<string, string> = {};
    fields.forEach((form: { name: string; value?: string }) => {
        initialState[form.name] = form.value || "";
    });

    const { days, months, years, fetchDatetime } = useDatetimeStore();
    const { cIncome } = useIncomeStore();
    const [formData, setFormData] = useState<Record<string, string>>(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, pattern?: string
    ) => {
        const { name, value } = e.target;
        if (pattern) {
            const regex = new RegExp(pattern);
            if (!regex.test(value)) return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await cIncome({
                amount: formData.amount,
                description: formData.description,
                in_day: formData.in_day,
                in_month: formData.in_month,
                in_year: formData.in_year
            });

            toast.success("Income created successfully!");
            onClose();
        } catch (err) {
            toast.error("Failed to create income");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDatetime();
    }, [fetchDatetime]);

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
        <>
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
                        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 w-[700px] p-4 rounded-2xl"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <Title title="create_income" />
                                <div onClick={onClose} className="bg-gray-100 p-1 rounded-full cursor-pointer">
                                    <IoClose className="text-[15px]" />
                                </div>
                            </div>
                            {isLoading && <GlobalLoader />}
                            <div className="grid md:grid-cols-2 gap-4">
                                {fields.map((form, index) =>
                                    form.type === "input" ? (
                                        <div key={`${form.name}-${index}`}>
                                            <Label htmlFor={form.name}>{t(form.label)}</Label>
                                            <Input
                                                className="mt-2"
                                                type="text"
                                                id={form.name}
                                                placeholder={t(form.placeholder || form.label)}
                                                name={form.name}
                                                value={formData[form.name] ?? ""}
                                                required={form.required}
                                                disabled={form.disabled}
                                                onChange={(e) => handleChange(e, form.pattern)}
                                            />
                                        </div>
                                    ) : form.type === "days" ? (
                                        <div key={`${form.name}-${index}`}>
                                            <Label htmlFor={form.name}>{t(form.label)}</Label>
                                            <Select

                                                value={formData[form.name] ?? ""}
                                                onValueChange={(value) => handleSelectChange(form.name, value)}

                                            >
                                                <SelectTrigger className="w-full mt-2">
                                                    <SelectValue placeholder={t(form.placeholder)} />
                                                </SelectTrigger>
                                                <SelectContent className="z-[1200] ">
                                                    <SelectGroup>
                                                        <SelectLabel>{t('day')}</SelectLabel>
                                                        {days.map((day) => (
                                                            <SelectItem key={day.value} value={day.value}>
                                                                {day.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    ) : form.type === "months" ? (
                                        <div key={`${form.name}-${index}`}>
                                            <Label htmlFor={form.name}>{t(form.label)}</Label>
                                            <Select
                                                value={formData[form.name] ?? ""}
                                                onValueChange={(value) => handleSelectChange(form.name, value)}
                                            >
                                                <SelectTrigger className="w-full mt-2">
                                                    <SelectValue placeholder={t(form.placeholder)} />
                                                </SelectTrigger>
                                                <SelectContent className="z-[1200]">
                                                    <SelectGroup>
                                                        <SelectLabel>{t('month')}</SelectLabel>
                                                        {months.map((month) => (
                                                            <SelectItem key={month.value} value={month.value}>
                                                                {month.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    ) : form.type === "years" ? (
                                        <div key={`${form.name}-${index}`}>
                                            <Label htmlFor={form.name}>{t(form.label)}</Label>
                                            <Select
                                                value={formData[form.name] ?? ""}
                                                onValueChange={(value) => handleSelectChange(form.name, value)}
                                            >
                                                <SelectTrigger className="w-full mt-2">
                                                    <SelectValue placeholder={t(form.placeholder)} />
                                                </SelectTrigger>
                                                <SelectContent className="z-[1200]">
                                                    <SelectGroup>
                                                        <SelectLabel>{t('year')}</SelectLabel>
                                                        {years.map((year) => (
                                                            <SelectItem key={year.value} value={year.value}>
                                                                {year.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    ) : null
                                )}
                            </div>
                            <div className="flex justify-end mt-5">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    {t('save')}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            </AnimatePresence >
        </>
    );
}