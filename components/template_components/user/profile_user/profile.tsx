"use client";

import NavHeader from '@/share/header_route/nav_header';
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import formFields from "@/public/form.json";
import Cookies from "js-cookie";
import { useUserStore } from '@/store/userStore';
import { useTranslation } from 'react-i18next';

export default function ProfileUser() {
    const { t } = useTranslation("translation");
    const { user, fetchUser } = useUserStore();
    const fields = formFields.profile;
    const initialState: Record<string, string> = {};
    fields.forEach((form: { name: string; value?: string }) => {
        initialState[form.name] = form.value || "";
    });
    const [userId, setUserId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Record<string, string>>(initialState);
    useEffect(() => {
        const token = Cookies.get("auth");
        if (!token) return;
        const decoded = jwtDecode(token);
        if (decoded) {
            const id = decoded.id || decoded.sub || decoded.userId;
            if (id) setUserId(id.toString());
        }
    }, []);
    
    useEffect(() => {
        if (userId) {
            fetchUser(userId);
        }
    }, [userId, fetchUser]);

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                ...user,
            }));
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    function jwtDecode(token: string) {
        try {
            if (!token) return null;
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            return JSON.parse(atob(base64));
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) return;

        try {
            const res = await fetch(`http://localhost:3001/users/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to update profile");

            await res.json();
            alert("Profile updated successfully!");
            fetchUser(userId);
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("Failed to update profile.");
        }
    };

    return (
        <div>
            <NavHeader title={t('profile')} home={t('dashboard')} route={t('user')} label={t('profile')} href="/user/profile" />
            <div className="mt-4">
                <div className="md:flex gap-4 lg:space-y-0 space-y-2">
                    {/* Profile Image Section */}
                    <div className="md:w-1/3 bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col items-center text-center">
                            <div className="relative">
                                <img
                                    src={formData.image || "https://digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png"}
                                    alt="Profile"
                                    className="w-32 h-32 p-1 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600"
                                />
                            </div>
                            <div className='mt-5'>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-300 mb-2">{user?.name}</h2>
                                <h2 className="text-lg font-normal text-gray-700 dark:text-gray-300 mb-2">{user?.location}</h2>
                                <p className="text-gray-600 dark:text-gray-300">Update your information</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="md:w-2/3 p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <form onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-4">
                                {fields.map((form, index) =>
                                    form.type === "input" ? (
                                        <div key={`${form.name}-${index}`}>
                                            <Label htmlFor={form.name}>{t(form.label)}</Label>
                                            <Input
                                                type="text"
                                                id={form.name}
                                                placeholder={t(form.placeholder || form.label)}
                                                name={form.name}
                                                value={formData[form.name] ?? ""}
                                                required={form.required}
                                                disabled={form.disabled}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    ) : null
                                )}
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
                    </div>
                </div>
            </div>
        </div>
    );
}
