"use client";

import { IconButton } from "@mui/material";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CiDark } from "react-icons/ci";
import { AiOutlineSun } from "react-icons/ai";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme(); // use resolvedTheme for SSR-safe check
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isLight = resolvedTheme === "light";

  return (
    <IconButton
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white"
    >
      {isLight ? <CiDark size={22} /> : <AiOutlineSun size={22} />}
    </IconButton>
  );
}
