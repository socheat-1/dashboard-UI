"use client";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import Logout from "../logout/page";

export default function Profile() {
  const navItems = [
    { icon: <FaUser className="text-[#5f74fe]" />, label: "Profile", href: "/profile" },
  ];
  const persons = [
    {
      name: "socheat"
    }
  ]

  return (
    <div>
      {persons.map((persons, index) => (
        <div key={index}>
          <div>{persons.name}</div>
        </div>
      ))}

      {navItems.map((item, index) => (
        <div
          key={index}
          className="py-2 w-[200px]
                     border-l-0 border-[#5f74fe]
                     hover:border-l-4
                     hover:bg-gray-100
                     transition-all duration-300 ease-in-out
                     cursor-pointer mb-1"
        >
          <Link href={item.href}
            className="flex items-center space-x-3
                       transform transition-transform duration-300
                       hover:translate-x-1"
          >
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
