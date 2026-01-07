"use client";

import { getAboutData, getDailyQuote } from "@/lib/data";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight, FiCode, FiClock, FiEdit3, FiAward } from "react-icons/fi";

export default function HomeSection() {
    const about = getAboutData();
    const quote = getDailyQuote();
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            };
            setTime(now.toLocaleTimeString("en-US", options));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="min-h-screen flex flex-col justify-center pt-0 pb-24 relative">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 space-y-6 text-center md:text-left"
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Hi, I&apos;m <span className="text-primary">Yajush</span>
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
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative w-64 h-64 md:w-80 md:h-80 rounded-full md:rounded-2xl overflow-hidden border-4 border-secondary shadow-2xl mx-auto"
                >
                    {about?.image_url && (
                        <Image
                            src={about.image_url}
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
                    viewport={{ once: false }}
                    className="md:col-span-2 bg-secondary/20 border border-border rounded-2xl p-6 flex flex-col justify-center text-center md:text-left"
                >
                    <blockquote className="text-lg md:text-xl font-medium italic text-muted-foreground/90">
                        &quot;{quote}&quot;
                    </blockquote>
                    <p className="text-xs text-muted-foreground mt-3 uppercase tracking-widest opacity-70">
                        — Quote of the Day —
                    </p>
                </motion.div>

                {/* Clock */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
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

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
            >
                <span className="text-xs uppercase tracking-widest">Scroll Down</span>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <FiArrowRight className="rotate-90" />
                </motion.div>
            </motion.div>
        </section>
    );
}
