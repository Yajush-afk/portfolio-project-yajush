"use client";

import { getProjectsData, getRandomExcuse, Project } from "@/lib/data";
import { motion } from "framer-motion";
import { FiCode, FiGithub, FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { techStackIcons, techStackUrls } from "@/lib/icons";

const statusColors = {
    deployed: "bg-green-500 shadow-[0_0_10px_#22c55e]",
    built: "bg-yellow-500 shadow-[0_0_10px_#eab308]",
    building: "bg-red-500 shadow-[0_0_10px_#ef4444]"
};

const statusLabels = {
    deployed: "Deployed",
    built: "Built (Not Deployed)",
    building: "Building"
};

export default function ProjectsSection() {
    const projectsData = getProjectsData();
    const projects = projectsData.projects as Project[];
    const [excuse, setExcuse] = useState("");

    useEffect(() => {
        setExcuse(getRandomExcuse());
    }, []);

    return (
        <section id="projects" className="min-h-screen flex flex-col justify-center py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                className="space-y-4 mb-10"
            >
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    Projects
                </h2>
                <p className="text-muted-foreground">
                    A showcase of my technical journey and what I&apos;m building.
                </p>
            </motion.div>

            {/* Projects Grid */}
            {projects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300 flex flex-col"
                        >
                            <div className="relative h-56 w-full bg-secondary/50 overflow-hidden">
                                {project.image_url ? (
                                    <Image
                                        src={project.image_url}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-muted-foreground">
                                        <FiCode size={40} />
                                    </div>
                                )}

                                {/* Status Indicator */}
                                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full animate-pulse ${statusColors[project.status].split(" ")[0]}`} />
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-white/90">
                                        {statusLabels[project.status]}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 space-y-4 flex-1 flex flex-col">
                                <div className="space-y-2 flex-1">
                                    <div className="flex justify-between items-start gap-2 min-h-[3.5rem]">
                                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                                            {project.title}
                                        </h3>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tech_stack.map((tech) => {
                                            const Icon = techStackIcons[tech] || FiCode;
                                            const url = techStackUrls[tech];

                                            const content = (
                                                <div
                                                    className="p-1.5 bg-secondary text-secondary-foreground rounded-md hover:text-primary transition-colors cursor-pointer"
                                                    title={tech}
                                                >
                                                    <Icon size={16} />
                                                </div>
                                            );

                                            if (url) {
                                                return (
                                                    <a
                                                        key={tech}
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {content}
                                                    </a>
                                                );
                                            }

                                            return <div key={tech}>{content}</div>;
                                        })}
                                    </div>

                                    <p className="text-muted-foreground text-sm pt-2">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex gap-4 pt-4 border-t border-border/50">
                                    {project.github_link ? (
                                        <a
                                            href={project.github_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                                        >
                                            <FiGithub /> Code
                                        </a>
                                    ) : (
                                        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-not-allowed opacity-50">
                                            <FiGithub /> Code
                                        </span>
                                    )}

                                    {project.demo_link ? (
                                        <a
                                            href={project.demo_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                                        >
                                            <FiExternalLink /> Live Demo
                                        </a>
                                    ) : (
                                        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-not-allowed opacity-50">
                                            <FiExternalLink /> Live Demo
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Coming Soon / Excuses */}
            <div className="text-center space-y-8 py-10 bg-secondary/10 rounded-3xl border border-dashed border-border">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    className="space-y-4"
                >
                    <h2 className="text-2xl font-bold">More Projects Coming Soon...</h2>
                    <div className="max-w-md mx-auto p-6 bg-card rounded-xl border border-primary/20 shadow-sm relative">
                        <div className="absolute -top-3 -left-3 text-4xl">🤔</div>
                        <p className="text-lg font-medium italic text-muted-foreground">
                            &quot;{excuse}&quot;
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
