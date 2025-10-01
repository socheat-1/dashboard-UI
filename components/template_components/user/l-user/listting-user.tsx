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
import { FiPlus } from "react-icons/fi";
import { CreateUser } from "../c-user/create-user";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/store/userStore";
import NavHeaderVII from "@/share/header_route/nav_headerVII";
import { CiEdit } from "react-icons/ci";
import { TbTrashX } from "react-icons/tb";
import { Toaster } from "react-hot-toast";
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
        { id: 2, name: "image" },
        { id: 3, name: "name" },
        { id: 4, name: "username" },
        { id: 5, name: "email" },
        { id: 6, name: "phone" },
        { id: 7, name: "location" },
        { id: 8, name: "gender" },
        { id: 9, name: "action" },
    ];

    return (
        <>
          <Toaster
        position="bottom-left"
        reverseOrder={false}
      />
            <div className="flex justify-between items-center">
                <NavHeaderVII
                    title='listing_users'
                    home='user'
                    label='listing_users'
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
                                <TableHead key={col.id}>{t(col.name)}</TableHead>
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
                                <TableCell className="py-3 px-4 dark:border-gray-700 flex gap-2 justify-center">
                                    <button
                                        //   onClick={() => handleEdit(income)}
                                        className="bg-transparent dark:border-gray-700 dark:text-white border text-black hover:text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        <CiEdit />
                                    </button>
                                    <button
                                        //   onClick={() => handleDeleteClick(income.id)}
                                        className="bg-transparent dark:border-gray-700 dark:text-white border text-black hover:text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        <TbTrashX />
                                    </button>
                                </TableCell>
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
