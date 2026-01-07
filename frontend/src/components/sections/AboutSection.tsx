"use client";

import { getAboutData, getCurrentlyLearningData } from "@/lib/data";
import { motion } from "framer-motion";
import { FiCode, FiTerminal, FiSearch, FiLock, FiDownload, FiBriefcase } from "react-icons/fi";
import { useEffect, useState } from "react";
import {
    SiHtml5, SiCss3, SiPython, SiCplusplus, SiFastapi, SiDjango, SiFlask,
    SiMysql, SiPostgresql, SiScikitlearn, SiTensorflow, SiPytorch,
    SiKaggle, SiGooglecolab, SiUbuntu, SiBrave, SiSpotify, SiGithub
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const techStack = [
    {
        category: "Frontend", items: [
            { name: "HTML5", icon: SiHtml5, url: "https://developer.mozilla.org/en-US/docs/Web/HTML", color: "hover:text-orange-500" },
            { name: "CSS3", icon: SiCss3, url: "https://developer.mozilla.org/en-US/docs/Web/CSS", color: "hover:text-blue-500" }
        ]
    },
    {
        category: "Backend", items: [
            { name: "Python", icon: SiPython, url: "https://www.python.org/", color: "hover:text-yellow-400" },
            { name: "C++", icon: SiCplusplus, url: "https://isocpp.org/", color: "hover:text-blue-600" }
        ]
    },
    {
        category: "Frameworks", items: [
            { name: "FastAPI", icon: SiFastapi, url: "https://fastapi.tiangolo.com/", color: "hover:text-teal-400" },
            { name: "Django", icon: SiDjango, url: "https://www.djangoproject.com/", color: "hover:text-green-600" },
            { name: "Flask", icon: SiFlask, url: "https://flask.palletsprojects.com/", color: "hover:text-gray-400" }
        ]
    },
    {
        category: "Database", items: [
            { name: "MySQL", icon: SiMysql, url: "https://www.mysql.com/", color: "hover:text-blue-400" },
            { name: "PostgreSQL", icon: SiPostgresql, url: "https://www.postgresql.org/", color: "hover:text-blue-300" }
        ]
    },
    {
        category: "Data Science", items: [
            { name: "Scikit-learn", icon: SiScikitlearn, url: "https://scikit-learn.org/", color: "hover:text-orange-400" },
            { name: "TensorFlow", icon: SiTensorflow, url: "https://www.tensorflow.org/", color: "hover:text-orange-500" },
            { name: "PyTorch", icon: SiPytorch, url: "https://pytorch.org/", color: "hover:text-red-500" }
        ]
    },
    {
        category: "Platforms", items: [
            { name: "VS Code", icon: VscVscode, url: "https://code.visualstudio.com/", color: "hover:text-blue-500" },
            { name: "Kaggle", icon: SiKaggle, url: "https://www.kaggle.com/", color: "hover:text-blue-400" },
            { name: "Colab", icon: SiGooglecolab, url: "https://colab.research.google.com/", color: "hover:text-orange-400" }
        ]
    }
];

const toolkit = [
    { name: "VS Code", icon: VscVscode, url: "https://code.visualstudio.com/", color: "text-blue-500" },
    { name: "Terminal", icon: SiUbuntu, url: "https://ubuntu.com/", color: "text-orange-500" },
    { name: "Brave", icon: SiBrave, url: "https://brave.com/", color: "text-orange-600" },
    { name: "Spotify", icon: SiSpotify, url: "https://open.spotify.com/", color: "text-green-500" },
    { name: "Perplexity", icon: FiSearch, url: "https://www.perplexity.ai/", color: "text-teal-400" },
    { name: "GitHub", icon: SiGithub, url: "https://github.com/", color: "text-foreground" }
];

export default function AboutSection() {
    const about = getAboutData();
    const learning = getCurrentlyLearningData();
    const [theme, setTheme] = useState("dark"); // Default to dark, will update on mount

    useEffect(() => {
        const updateTheme = () => {
            if (document.documentElement.classList.contains("dark")) {
                setTheme("dark");
            } else {
                setTheme("light");
            }
        };

        // Initial check
        updateTheme();

        // Observer for class changes on html element
        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" className="min-h-screen flex flex-col justify-center py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.3 }}
                className="space-y-10"
            >
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    About Me
                </h2>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column: Bio & Terminal */}
                    <div className="lg:w-3/5 space-y-8">
                        <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
                            <p>{about?.bio || "Loading bio..."}</p>
                        </div>

                        {/* Terminal Component (Visual Balance) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                            className="bg-card border border-border rounded-xl overflow-hidden shadow-lg font-mono text-sm"
                        >
                            <div className="bg-secondary/50 px-4 py-2 border-b border-border flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="ml-2 text-xs text-muted-foreground">yajush@portfolio:~$</span>
                            </div>
                            <div className="p-4 space-y-2 text-muted-foreground">
                                <div>
                                    <span className="text-green-500">➜</span> <span className="text-blue-500">~</span> <span className="text-primary">neofetch</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-4 pt-2">
                                    <div className="text-primary flex items-center justify-center text-4xl">
                                        <FiTerminal />
                                    </div>
                                    <div className="space-y-1 text-xs">
                                        <p><span className="font-bold text-primary">OS</span>: Linux x86_64</p>
                                        <p><span className="font-bold text-primary">Host</span>: Yajush&apos;s Portfolio</p>
                                        <p><span className="font-bold text-primary">Uptime</span>: Till the coffee runs out</p>
                                        <p><span className="font-bold text-primary">Shell</span>: zsh 5.9</p>
                                        <p><span className="font-bold text-primary">Theme</span>: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
                                    </div>
                                </div>
                                <div className="pt-2 animate-pulse">
                                    <span className="text-green-500">➜</span> <span className="text-blue-500">~</span> <span className="inline-block w-2 h-4 bg-primary align-middle ml-1" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Open to Work Section - Redesigned */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                            className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-3">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                        </span>
                                        <h3 className="font-bold text-xl flex items-center gap-2">
                                            Hire Me As:
                                        </h3>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2">
                                        {["Backend Engineer", "ML Intern", "Researcher"].map((role) => (
                                            <span 
                                                key={role} 
                                                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium border border-border/50"
                                            >
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <a
                                    href="https://drive.google.com/file/d/1ZZq_9GMh2_VlDqM2Og5r5A9rfA37AHs9/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20 whitespace-nowrap"
                                >
                                    <FiDownload /> Download Resume
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Tech Stack & Toolkit */}
                    <div className="lg:w-2/5 space-y-10">
                        {/* Tech Stack */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <FiCode className="text-primary" /> Tech Stack
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {techStack.map((stack, idx) => (
                                    <motion.div
                                        key={stack.category}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: false }}
                                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                                        className="bg-card/50 border border-border rounded-lg p-3 hover:border-primary/30 transition-colors"
                                    >
                                        <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">{stack.category}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {stack.items.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`text-lg transition-transform hover:scale-110 ${item.color}`}
                                                    title={item.name}
                                                >
                                                    <item.icon />
                                                </a>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Toolkit */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <FiTerminal className="text-primary" /> Toolkit
                            </h3>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                                className="bg-secondary/30 border border-border rounded-xl p-4 flex items-center justify-center"
                            >
                                <div className="flex gap-3 flex-wrap justify-center">
                                    {toolkit.map((tool, idx) => (
                                        <motion.a
                                            key={tool.name}
                                            href={tool.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: false }}
                                            transition={{ delay: 0.2 + (idx * 0.05), duration: 0.3 }}
                                            className="group relative flex flex-col items-center gap-1"
                                        >
                                            <div className={`text-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 ${tool.color}`}>
                                                <tool.icon />
                                            </div>
                                            <span className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-medium bg-foreground text-background px-2 py-0.5 rounded whitespace-nowrap pointer-events-none z-10">
                                                {tool.name}
                                            </span>
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Currently Locked On */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
                                <FiLock /> Currently Locked On
                            </h3>
                            <div className="space-y-2">
                                {learning?.items.map((item: string, index: number) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
                                        className="bg-card border border-border px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
                                    >
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
