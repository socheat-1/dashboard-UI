"use client";
import { useEffect, useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import ItemNav from "./template_components/item_nav";
import { IconButton } from "@mui/material";
import Profile from "./template_components/profile_drondown/profile";
import { domAnimation, LazyMotion, m } from "framer-motion";
import Footer from "./template_components/footer/footer";
import ThemeToggle from "./template_components/dark/ThemeToggle";
import Translate from "./template_components/Translate/translate";
import { useUserStore } from "@/store/userStore";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, fetchUser } = useUserStore();
    useEffect(() => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        } else {
            setSidebarOpen(true);
        }
        const handleResize = () => {
            if (window.innerWidth < 768) setSidebarOpen(false);
            else setSidebarOpen(true);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

      useEffect(() => {
   
  }, [fetchUser]);
    return (
        <div className="flex bg-white text-black dark:bg-gray-900 dark:text-white">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <div
                className={`fixed inset-y-0 left-0 z-50  border-r border-[#f0f1f3] dark:border-[#313846] bg-white text-black dark:bg-gray-900 dark:text-white
                transition-all duration-300 ease-in-out
                ${sidebarOpen ? "w-[18rem] translate-x-0" : "w-16 -translate-x-full md:translate-x-0 md:w-16"}`}
            >
                <div className={`p-4 font-bold  overflow-hidden
                    ${sidebarOpen ? "text-xl text-left" : "text-lg text-center px-2"}`}>
                    {sidebarOpen ? "LOGO" : "L"}
                </div>
                <ItemNav sidebarOpen={sidebarOpen} />
            </div>
            <div
                className={`fixed inset-y-0 left-0 z-50 border-r border-[#f0f1f3] dark:border-[#313846] 
                bg-white text-black dark:bg-gray-900 dark:text-white
                transition-all duration-300 ease-in-out
                ${sidebarOpen ? "translate-x-0 w-[18rem]" : "-translate-x-full w-[18rem] md:translate-x-0 md:w-16"}`}
            >
                <div
                    className={`p-4 font-bold  overflow-hidden
                    ${sidebarOpen ? "text-xl text-left" : "text-lg border-b dark:border-gray-700 text-center px-2"}`}
                >
                    {sidebarOpen ? "LOGO" : "L"}
                </div>
                <ItemNav sidebarOpen={sidebarOpen} />
            </div>

            <div
                className={`flex-1 flex flex-col transition-all duration-300 
                ${sidebarOpen ? "md:ml-[18rem]" : "md:ml-16"}`}
            >
                <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-[10px] bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-700">
                    <IconButton
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label="Toggle sidebar"
                    >
                        <HiMenuAlt1 className="dark:text-white" size={22} />
                    </IconButton>
                    <div className="flex items-center gap-3">
                        <Translate />
                        <ThemeToggle />
                        <div className="relative">
                            <div className="flex justify-center items-center">
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="focus:outline-none"
                                >
                                    <img
                                        src={user?.image || "https://digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png"}
                                        alt="User avatar"
                                        className="w-10 h-10 p-1 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                                    />
                                </button>
                            </div>
                            {menuOpen && (
                                <LazyMotion features={domAnimation}>
                                    <m.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div
                                            className="absolute top-12 right-0 
                                            bg-white dark:bg-gray-800 
                                            shadow-[0_10px_30px_rgba(0,0,0,0.1)] 
                                            p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                                        >
                                            <Profile />
                                            
                                        </div>
                                    </m.div>
                                </LazyMotion>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 bg-gray-50 dark:bg-gray-800 min-h-screen">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}
