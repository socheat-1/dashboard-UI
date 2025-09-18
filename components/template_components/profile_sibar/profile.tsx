"use client";

import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Logout from "../logout/page";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user, fetchUser } = useUserStore();

  const navItems = [
    {
      icon: <IoHome className="text-gray-500 text-xl" />,
      label: "Profile",
      href: "/overview/dashboard",
    },
    {
      icon: <FaUser className="text-gray-500 text-xl" />,
      label: "Profile",
      href: "/user/profile",
    },
    
  ];

  useEffect(() => {
  }, [fetchUser]);

  return (
    <>
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isOpen && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 flex justify-end z-50"
              onClick={onClose}
            >
              {/* Sidebar Card */}
              <m.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="w-full lg:max-w-[350px] max-w-[250px] h-screen bg-white dark:bg-gray-800 shadow-xl p-6 relative border-l border-gray-200 dark:border-gray-700 flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-black dark:hover:text-white"
                >
                  ✕
                </button>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                  {/* Profile Section */}
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        user?.image ||
                        "https://digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png"
                      }
                      alt=""
                      className="w-[100px] h-[100px] p-1 bg-gray-200 rounded-full"
                    />
                    <div className="text-center mt-3">
                      <div className="font-medium text-lg">
                        {user?.name || "Guest"}
                      </div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="mt-6 border-t border-dashed">
                    {navItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="flex items-center space-x-3 py-3 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 mb-1"
                      >
                        {item.icon}
                        <span className="transition-colors duration-300 text-gray-600 dark:text-gray-300">
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Footer / Logout */}
                <div className="pt-4 border-gray-200 dark:border-gray-700">
                  <Logout />
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </>
  );
}
