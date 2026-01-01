"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        if (pathname !== "/") return; // Allow normal navigation if not on home page (though we are single page now)
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tighter hover:text-primary transition-colors" onClick={(e) => scrollToSection(e, 'home')}>
                    YS
                </Link>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={(e) => scrollToSection(e, item.path.replace('/#', ''))}
                                className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
