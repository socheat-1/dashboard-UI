"use client";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import Logout from "../logout/page";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

export default function Profile() {
  const { user, fetchUser } = useUserStore();
  const navItems = [
    { icon: <FaUser className="text-[#5f74fe]" />, label: "Profile", href: "/user/profile" },
  ];

  useEffect(() => {

  }, [fetchUser]);

  return (
    <div>
      <div>
        <div className="flex justify-center items-center">
          <img src={user?.image || "https://digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png"} alt="" className="w-[100px] h-[100px] p-1 bg-gray-200 rounded-full" />
        </div>
        <div className="text-center mt-3">
          <div> {user?.name || "Guest"}</div>
          <div> {user?.email}</div>
        </div>
      </div>
      {navItems.map((item, index) => (
        <div
          key={index}
          className="py-2 w-[250px] hover:bg-gray-100 cursor-pointer mb-1 mt-2">
          <Link href={item.href}
            className="flex items-center space-x-3">
            <div>{item.icon}</div>
            <span className="transition-colors duration-300 text-gray-500">
              {item.label}
            </span>
          </Link>
        </div>
      ))}

      <Logout />
    </div>
  );
}
