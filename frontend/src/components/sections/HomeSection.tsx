"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCode, FiClock, FiEdit3, FiAward } from "react-icons/fi";

interface HomeSectionProps {
    about: any;
    quote: string;
    time: string;
}

export default function HomeSection({ about, quote, time }: HomeSectionProps) {
    return (
        <section id="home" className="min-h-screen flex flex-col justify-center py-0">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 space-y-6 text-center md:text-left"
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Hi, I'm <span className="text-primary">Yajush</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Backend Engineer and AI/ML Engineer (learning)
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                        <Link
                            href="#about"
                            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                        >
                            About Me <FiEdit3 />
                        </Link>
                        <Link
                            href="#achievements"
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                            Achievements <FiAward />
                        </Link>
                        <Link
                            href="#projects"
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                            View Projects <FiCode />
                        </Link>
                        <Link
                            href="#socials"
                            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                        >
                            Connect <FiArrowRight />
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative w-64 h-64 md:w-80 md:h-80 rounded-full md:rounded-2xl overflow-hidden border-4 border-secondary shadow-2xl mx-auto"
                >
                    {about?.image_url && (
                        <Image
                            src={`http://localhost:8000${about.image_url}`}
                            alt="Profile"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                            unoptimized
                        />
                    )}
                </motion.div>
            </div>

            {/* Quote & Clock Row */}
            <div className="grid md:grid-cols-3 gap-8 mt-12">
                {/* Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 bg-secondary/20 border border-border rounded-2xl p-6 flex flex-col justify-center text-center md:text-left"
                >
                    <blockquote className="text-lg md:text-xl font-medium italic text-muted-foreground/90">
                        "{quote}"
                    </blockquote>
                    <p className="text-xs text-muted-foreground mt-3 uppercase tracking-widest opacity-70">
                        — Quote of the Day —
                    </p>
                </motion.div>

                {/* Clock */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-2 shadow-sm"
                >
                    <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium uppercase tracking-wider">
                        <FiClock /> IST (India)
                    </div>
                    <div className="text-4xl font-mono font-bold text-primary tracking-widest">
                        {time}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
