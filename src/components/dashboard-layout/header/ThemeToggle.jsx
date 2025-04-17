"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";


export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    return <div className="p-1 rounded-md  border border-gray-200" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? <Sun /> : <Moon />}
    </div>
}