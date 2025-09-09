"use client";

import NavHeader from '@/share/header_route/nav_header';
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import formFields from "@/public/form.json";
import { Textarea } from '@/components/ui/textarea';

export default function ProfileUser() {
    const fields = formFields.profile;
    // Dynamically build initial state from form.json
    const initialState: Record<string, string> = {};
    fields.forEach((form: { name: string; value?: string }) => {
        initialState[form.name] = form.value || "";
    });
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const [formData, setFormData] = useState<Record<string, string>>({
        name: 'John Doe',
        username: 'Mrr John007',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        bio: 'Software developer with 5+ years of experience in React and Node.js.',
        location: 'New York, USA',
        gender: 'Male',
    });

    const handleSubmit = () => {
        console.log('Profile updated:', formData);
    };

    return (
        <div className="">
            <NavHeader title="Profile" home="Dashboard" route="User" label="Profile" href="/user/profile" />
            <div className="mt-4">
                <div className="md:flex gap-4 lg:space-y-0 space-y-2">
                    {/* Profile Image Section */}
                    <div className="md:w-1/3 bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col items-center text-center">
                            <div className="relative">
                                <img
                                    src="https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                                    alt="Profile"
                                    className="w-32 h-32 p-1 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600"
                                />
                                <label className="relative inline-block cursor-pointer">
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="absolute bottom-5 left-7 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                </label>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-300 mb-2">User Profile</h2>
                            <h2 className="text-lg font-normal text-gray-700 dark:text-gray-300 mb-2">Name Kin Socheat</h2>
                            <p className="text-gray-600 dark:text-gray-300">Update your information</p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="md:w-2/3 p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <div className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-4">
                                {fields.map((form, index) =>
                                    form.type === "input" ? (
                                        <div key={`${form.name}-${index}`} className="">
                                            <Label htmlFor={form.name}>{form.label}</Label>
                                            <Input
                                                type="text"
                                                id={form.name}
                                                placeholder={form.placeholder || form.label}
                                                name={form.name}
                                                value={formData[form.name] ?? ""}
                                                required={form.required}
                                                disabled={form.disabled}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    ) : null)}
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

