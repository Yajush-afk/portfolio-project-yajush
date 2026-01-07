"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    // Default to dark to match user preference and avoid light flash
    const [theme, setTheme] = useState("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        // Check localStorage and system preference
        const localTheme = localStorage.getItem("theme");
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        
        // Determine initial theme
        let initialTheme = "light";
        if (localTheme === "dark" || (!localTheme && systemDark)) {
            initialTheme = "dark";
        }

        // Apply theme
        setTheme(initialTheme);
        if (initialTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    // Prevent hydration mismatch by not rendering the icon until mounted
    if (!mounted) {
        return <div className="w-9 h-9" />; // Placeholder
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 360 : 0 }}
                transition={{ duration: 0.5, type: "spring" }}
            >
                {theme === "light" ? <FiSun size={20} /> : <FiMoon size={20} />}
            </motion.div>
        </button>
    );
}
