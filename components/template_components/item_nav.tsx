"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { RiSettings5Fill } from "react-icons/ri";
import { IoMdAnalytics } from "react-icons/io";

interface ItemNavProps {
  sidebarOpen: boolean;
}

export default function ItemNav({ sidebarOpen }: ItemNavProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", icon: <TbLayoutDashboardFilled />, href: "/dashboard" },
    { label: "Analytics", icon: <IoMdAnalytics />, href: "/analytics" },
    { label: "Settings", icon: <RiSettings5Fill />, href: "/setting" },
  ];

  return (
    <div className="h-screen">
      <LazyMotion features={domAnimation}>
        <nav className={`flex flex-col space-y-2 ${sidebarOpen ? "" : "p-2"}`}>
          {navItems.map((item, index) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <m.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 transition-colors
                    ${sidebarOpen ? "py-3 px-5" : "justify-center px-0 py-3"} 
                    ${isActive
                      ? "bg-[#ecf3ff] dark:bg-[#18315c] border-l-4 border-[#465FFF] dark:border-gray-200 font-normal text-[#465FFF] dark:text-white text-[16px]"
                      : "hover:bg-[#ecf3ff] dark:hover:bg-gray-700 text-[#344054] dark:text-white text-[15px]"
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <span className="text-[20px] flex-shrink-0">{item.icon}</span>
                  {sidebarOpen && <span className="whitespace-nowrap">{item.label}</span>}
                </Link>
              </m.div>
            );
          })}
        </nav>
      </LazyMotion>
    </div>
  );
}
