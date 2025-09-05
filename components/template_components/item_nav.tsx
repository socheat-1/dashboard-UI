"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { RiSettings5Fill } from "react-icons/ri";
import { IoMdAnalytics, IoIosArrowDown } from "react-icons/io";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { FaUser } from "react-icons/fa";

interface ItemNavProps {
  sidebarOpen: boolean;
}

export default function ItemNav({ sidebarOpen }: ItemNavProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = [
    { label: "Dashboard", icon: <TbLayoutDashboardFilled />, href: "/dashboard" },
    { label: "Settings", icon: <RiSettings5Fill />, href: "/setting" },
    {
      label: "User",
      icon: <FaUser />,
      href: "/user",
      subItems: [
        { label: "Profile", href: "/user/profile" },
      ],
    },
  ];

  // Keep dropdown open if current route matches any sub-item
  useEffect(() => {
    navItems.forEach((item) => {
      if (item.subItems) {
        const isInSubItems = item.subItems.some(subItem =>
          pathname === subItem.href || pathname.startsWith(subItem.href + "/")
        );
        if (isInSubItems) {
          setOpenDropdown(item.label);
        }
      }
    });
  }, [pathname]);

  const toggleDropdown = (label: string) => {
    if (openDropdown === label) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(label);
    }
  };

  return (
    <div className="h-screen">
      <LazyMotion features={domAnimation}>
        <nav className={`flex flex-col space-y-1 ${sidebarOpen ? "p-2" : "p-2"}`}>
          {navItems.map((item, index) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/") ||
              (item.subItems && item.subItems.some(subItem =>
                pathname === subItem.href || pathname.startsWith(subItem.href + "/")
              ));

            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isDropdownOpen = openDropdown === item.label;

            return (
              <div key={index} className="relative">
                <m.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smoother animation
                  }}
                >
                  {hasSubItems ? (
                    <m.button
                      onClick={() => toggleDropdown(item.label)}
                      className={`flex items-center justify-between w-full rounded-sm
                        ${sidebarOpen ? "py-3 px-4" : "justify-center px-3 py-3"} 
                        ${isActive
                          ? "bg-[#ecf3ff] dark:bg-[#18315c] border-l-4 border-[#465FFF] dark:border-gray-200 font-medium text-[#465FFF] dark:text-white shadow-sm"
                          : "hover:bg-[#ecf3ff] dark:hover:bg-gray-700 text-[#344054] dark:text-white "
                        }`}
                      title={!sidebarOpen ? item.label : undefined}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-3">
                        <m.span 
                          className="text-[20px] flex-shrink-0"
                        >
                          {item.icon}
                        </m.span>
                        <AnimatePresence mode="wait">
                          {sidebarOpen && (
                            <m.span 
                              className="whitespace-nowrap font-medium"
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              {item.label}
                            </m.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <AnimatePresence>
                        {sidebarOpen && (
                          <m.span
                            initial={{ opacity: 0, rotate: 0 }}
                            animate={{ 
                              opacity: 1, 
                              rotate: isDropdownOpen ? 180 : 0 
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ 
                              duration: 0.3,
                              ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            className="text-sm ml-2"
                          >
                            <IoIosArrowDown />
                          </m.span>
                        )}
                      </AnimatePresence>
                    </m.button>
                  ) : (
                    <m.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 transition-all duration-300 ease-in-out rounded-sm
                          ${sidebarOpen ? "py-3 px-4" : "justify-center px-3 py-3"} 
                          ${isActive
                            ? "bg-[#ecf3ff] dark:bg-[#18315c] border-l-4 border-[#465FFF] dark:border-gray-200 font-medium text-[#465FFF] dark:text-white shadow-sm"
                            : "hover:bg-[#ecf3ff] dark:hover:bg-gray-700 text-[#344054] dark:text-white "
                          }`}
                        title={!sidebarOpen ? item.label : undefined}
                      >
                        <m.span 
                          className="text-[20px] flex-shrink-0"
                        >
                          {item.icon}
                        </m.span>
                        <AnimatePresence mode="wait">
                          {sidebarOpen && (
                            <m.span 
                              className="whitespace-nowrap font-medium"
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              {item.label}
                            </m.span>
                          )}
                        </AnimatePresence>
                      </Link>
                    </m.div>
                  )}
                </m.div>

                {/* Dropdown submenu */}
                {hasSubItems && (
                  <AnimatePresence mode="wait">
                    {isDropdownOpen && sidebarOpen && (
                      <m.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ 
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          height: { duration: 0.3 }
                        }}
                        className="overflow-hidden"
                      >
                        <div className="ml-8 pl-4 border-l-2 border-gray-200 dark:border-gray-600 space-y-1 py-2 mt-1">
                          {item.subItems!.map((subItem, subIndex) => {
                            const isSubItemActive =
                              pathname === subItem.href ||
                              pathname.startsWith(subItem.href + "/");

                            return (
                              <m.div
                                key={subIndex}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ 
                                  duration: 0.3, 
                                  delay: subIndex * 0.1,
                                  ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                whileHover={{ x: 5 }}
                              >
                                <Link
                                  href={subItem.href}
                                  className={`block py-2.5 px-4 rounded-md transition-all duration-300 ease-in-out
                                    ${isSubItemActive
                                      ? "bg-[#ecf3ff] dark:bg-[#18315c] border-l-3 border-[#465FFF] text-[#465FFF] dark:text-white font-medium shadow-sm"
                                      : "text-[#344054] dark:text-gray-300 hover:bg-[#ecf3ff] dark:hover:bg-gray-700  hover:text-[#465FFF] dark:hover:text-white"
                                    }`}
                                >
                                  <m.span
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {subItem.label}
                                  </m.span>
                                </Link>
                              </m.div>
                            );
                          })}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>
      </LazyMotion>
    </div>
  );
}