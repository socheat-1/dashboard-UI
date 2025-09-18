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
    <div className="bg-red-100 rounded-xl flex justify-center items-center">
       <button
        onClick={handleLogout}
        className="py-3 text-red-500 font-bold text-[16px]"
      >
       Logout
      </button>
    </div>
  );
}
