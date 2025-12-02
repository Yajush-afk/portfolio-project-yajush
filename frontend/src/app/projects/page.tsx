"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchAPI } from "@/lib/api";
import { FiGithub, FiExternalLink, FiLock, FiCode } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

interface Project {
    id: string;
    title: string;
    description: string;
    tech_stack: string[];
    github_link?: string;
    demo_link?: string;
    image_url?: string;
}

interface CurrentlyLearning {
    items: string[];
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [learning, setLearning] = useState<CurrentlyLearning | null>(null);
    const [excuse, setExcuse] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [projData, learnData, excuseData] = await Promise.all([
                    fetchAPI("/projects"),
                    fetchAPI("/currently-learning"),
                    fetchAPI("/projects/excuses"),
                ]);
                setProjects(projData.projects || []);
                setLearning(learnData);
                setExcuse(excuseData.excuse);
            } catch (error) {
                console.error("Failed to load project data", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-20 pb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <h1 className="text-4xl font-bold">Projects</h1>
                <p className="text-muted-foreground">
                    A showcase of my technical journey and what I'm building.
                </p>
            </motion.div>

            {/* Currently Locked On */}
            <section className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-2xl font-bold text-primary"
                >
                    <FiLock />
                    <h2>Currently Locked On</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {learning?.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-card border border-border p-6 rounded-xl text-center font-medium shadow-sm hover:border-primary transition-colors"
                        >
                            {item}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Projects List */}
            {projects.length > 0 && (
                <section className="space-y-8">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <FiCode className="text-primary" /> Built Projects
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300"
                            >
                                <div className="relative h-48 w-full bg-secondary/50">
                                    {project.image_url ? (
                                        <Image
                                            src={`http://localhost:8000${project.image_url}`}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-muted-foreground">
                                            <FiCode size={40} />
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 space-y-4">
                                    <h3 className="text-xl font-bold">{project.title}</h3>
                                    <p className="text-muted-foreground text-sm line-clamp-3">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tech_stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 pt-2">
                                        {project.github_link && (
                                            <a
                                                href={project.github_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                                            >
                                                <FiGithub /> Code
                                            </a>
                                        )}
                                        {project.demo_link && (
                                            <a
                                                href={project.demo_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                                            >
                                                <FiExternalLink /> Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Coming Soon / Excuses */}
            <section className="text-center space-y-8 py-10 bg-secondary/10 rounded-3xl border border-dashed border-border">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                >
                    <h2 className="text-3xl font-bold">More Projects Coming Soon...</h2>
                    <div className="max-w-md mx-auto p-6 bg-card rounded-xl border border-primary/20 shadow-sm relative">
                        <div className="absolute -top-3 -left-3 text-4xl">🤔</div>
                        <p className="text-lg font-medium italic text-muted-foreground">
                            "{excuse}"
                        </p>
                    </div>
                </motion.div>
            </section>

            <div className="flex justify-center gap-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                    Back to Home
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                    href="/social"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                    Connect on Socials
                </Link>
            </div>
        </div>
    );
}
