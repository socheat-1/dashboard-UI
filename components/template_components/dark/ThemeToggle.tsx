"use client";

import { IconButton } from "@mui/material";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CiDark } from "react-icons/ci";
import { AiOutlineSun } from "react-icons/ai";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <IconButton
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white"
    >
      {theme === "light" ? <CiDark  size={22} /> : <AiOutlineSun  size={22} />}
    </IconButton>
  );
}
