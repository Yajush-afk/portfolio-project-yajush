"use client";

import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import Image from "next/image";

interface Achievement {
    id: string;
    type: string;
    title: string;
    issuer: string;
    date: string;
    image_url?: string;
    credential_link?: string;
}

interface AchievementsSectionProps {
    achievements: Achievement[];
}

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
    return (
        <section id="achievements" className="min-h-screen flex flex-col justify-center py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4 mb-10"
            >
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    Achievements
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((ach, index) => (
                    <motion.div
                        key={ach.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300"
                    >
                        <div className="relative h-48 w-full bg-secondary/50">
                            {ach.image_url ? (
                                <Image
                                    src={`http://localhost:8000${ach.image_url}`}
                                    alt={ach.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    unoptimized
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    <FiAward size={40} />
                                </div>
                            )}
                        </div>
                        <div className="p-5 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium uppercase tracking-wider text-primary">
                                    {ach.type}
                                </span>
                                <span className="text-xs text-muted-foreground">{ach.date}</span>
                            </div>
                            <h3 className="font-semibold line-clamp-2" title={ach.title}>
                                {ach.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{ach.issuer}</p>
                            {ach.credential_link && (
                                <a
                                    href={ach.credential_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-sm text-primary hover:underline pt-2"
                                >
                                    View Credential
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
