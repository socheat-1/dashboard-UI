import Link from 'next/link';
import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";

export default function NavHeaderVII({ title = "", home = "", label = "", href = "" }) {
    const items = [
        { home: home, label: label, href: href }
    ];

    return (
        <div className="">
            <h1 className="text-[20px] font-[500] rounded-[3px] text-indigo-600 dark:text-gray-200 mb-2">
                <span>{title}</span>
            </h1>
            <div className="flex items-center">
                {items.map((item, index) => (
                    <div key={index} className="flex justify-center text-indigo-500 dark:text-gray-200 items-center space-x-2 text-[15px] font-light">
                        <h1>{item.home}</h1>
                        <p><MdKeyboardArrowRight /></p>
                        <Link href={item.href} className="hover:underline">
                            {item.label}
                        </Link>

                    </div>
                ))}
            </div>
        </div>
    );
}
