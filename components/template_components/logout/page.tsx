"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("auth");
    router.push("/login");
  };

  return (
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-600 text-white rounded-lg"
      >
        Logout
      </button>
  );
}
