
"use client";
import { FaUser } from "react-icons/fa";
import Logout from "../logout/page";

export default function Profile() {
    return (
        <div>
            <div className="py-1 flex items-center space-x-3">
                <FaUser className="text-blue-500" />
                <span>Profile</span>
            </div>

            <Logout />
        </div>
    );
}