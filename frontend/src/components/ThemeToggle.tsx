"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        // Check if dark mode is already applied by the script
        if (document.documentElement.classList.contains("dark")) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
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
