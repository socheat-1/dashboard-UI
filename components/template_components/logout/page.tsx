"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { BiLogOut } from "react-icons/bi";

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("auth");
    router.push("/login");
  };

  return (
    <div className="border-t border-gray-100  flex justify-start items-center">
       <button
        onClick={handleLogout}
        className="py-2  text-sm text-red-500 flex justify-center items-center gap-3"
      >
        <BiLogOut />Logout
      </button>
    </div>
  );
}
