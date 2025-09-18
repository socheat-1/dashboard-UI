"use client";

import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import NavHeader from "@/share/header_route/nav_header";
import { FiPlus } from "react-icons/fi";
import { CreateUser } from "../create/c_user";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/store/userStore";
type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    location: string;
    gender: string;
    image: string;
};

export default function ListingPage() {
    const { t } = useTranslation("translation");
    const { user, fetchUser } = useUserStore();
    const [isOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        fetch("http://localhost:3001/users", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch users");
                return res.json();
            })
            .then((resJson) => {
                setUsers(resJson.data || []);
            })
            .catch((err) => console.error("Error fetching users:", err));
    }, []);

    useEffect(() => {
    }, [fetchUser]);

    const cols = [
        { id: 1, name: "" },
        { id: 2, name: "Image" },
        { id: 3, name: "Name" },
        { id: 4, name: "Usename" },
        { id: 5, name: "Email" },
        { id: 6, name: "Phone" },
        { id: 7, name: "Location" },
        { id: 8, name: "Gender" },
    ];

    return (
        <>
            <div className="flex justify-between items-center">
                <NavHeader
                    title={t('listing_users')}
                    home={t('dashboard')}
                    route={t('user')}
                    label={t('listing_users')}
                    href="/user/listing_user"
                />
                <div onClick={() => setIsOpen(true)} className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full">
                    <FiPlus className="text-white" />
                </div>
            </div>
            <div className="overflow-x-auto bg-white p-4 dark:border-gray-700 dark:gray-700 dark:bg-gray-900 rounded-2xl mt-5 border border-gray-200">
                <Table>
                    <TableHeader>

                        <TableRow >
                            {cols.map((col) => (
                                <TableHead key={col.id}>{col.name}</TableHead>
                            ))}
                        </TableRow>

                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>
                                    <img
                                        src={user.image || 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                </TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.location}</TableCell>
                                <TableCell>{user.gender}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {isOpen && (
                <CreateUser isOpen={isOpen} onClose={() => setIsOpen(false)} />
            )}
        </>
    );
}
