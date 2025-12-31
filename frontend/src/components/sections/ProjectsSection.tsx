"use client";

import { motion } from "framer-motion";
import { FiCode, FiGithub, FiExternalLink } from "react-icons/fi";
import Image from "next/image";

interface Project {
    id: string;
    title: string;
    description: string;
    tech_stack: string[];
    github_link?: string;
    demo_link?: string;
    image_url?: string;
}

interface ProjectsSectionProps {
    projects: Project[];
    excuse: string;
}

export default function ProjectsSection({ projects, excuse }: ProjectsSectionProps) {
    return (
        <section id="projects" className="min-h-screen flex flex-col justify-center py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4 mb-10"
            >
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    Projects
                </h2>
                <p className="text-muted-foreground">
                    A showcase of my technical journey and what I'm building.
                </p>
            </motion.div>

            {/* Projects Grid */}
            {projects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300 flex flex-col"
                        >
                            <div className="relative h-48 w-full bg-secondary/50 overflow-hidden">
                                {project.image_url ? (
                                    <Image
                                        src={`http://localhost:8000${project.image_url}`}
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
                            </div>
                            <div className="p-6 space-y-4 flex-1 flex flex-col">
                                <div className="space-y-2 flex-1">
                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                                    <p className="text-muted-foreground text-sm line-clamp-3">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tech_stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md font-mono"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4 pt-4 border-t border-border/50">
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
            )}

            {/* Coming Soon / Excuses */}
            <div className="text-center space-y-8 py-10 bg-secondary/10 rounded-3xl border border-dashed border-border">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                >
                    <h2 className="text-2xl font-bold">More Projects Coming Soon...</h2>
                    <div className="max-w-md mx-auto p-6 bg-card rounded-xl border border-primary/20 shadow-sm relative">
                        <div className="absolute -top-3 -left-3 text-4xl">🤔</div>
                        <p className="text-lg font-medium italic text-muted-foreground">
                            "{excuse}"
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
