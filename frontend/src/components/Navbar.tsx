"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", path: "/#home" },
    { name: "About", path: "/#about" },
    { name: "Achievements", path: "/#achievements" },
    { name: "Projects", path: "/#projects" },
    { name: "Socials", path: "/#socials" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map((item) => item.path.replace("/#", ""));

            // Find the current section
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the top of the section is within the viewport (with some offset for navbar)
                    // or if we've scrolled past it but are still inside it
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(section);
                        break; // Found the top-most visible section
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Trigger once on mount to set initial state
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        if (pathname !== "/") return;
        e.preventDefault();
        if (id === 'home') {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-2xl font-bold tracking-tighter hover:text-primary transition-colors"
                    onClick={(e) => scrollToSection(e, 'home')}
                >
                    YS
                </Link>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex gap-1">
                        {navItems.map((item) => {
                            const sectionId = item.path.replace("/#", "");
                            const isActive = activeSection === sectionId;

                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={(e) => scrollToSection(e, sectionId)}
                                    className={cn(
                                        "relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                                        isActive ? "text-primary" : "text-muted-foreground"
                                    )}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.span
                                            layoutId="activeSection"
                                            className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
