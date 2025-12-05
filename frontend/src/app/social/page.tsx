"use client";

import { motion } from "framer-motion";
import { FiLinkedin, FiMail, FiGithub, FiArrowUpRight, FiCpu, FiGlobe, FiRadio } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const socials = [
    {
        name: "GitHub",
        handle: "@Yajush-afk",
        link: "https://github.com/Yajush-afk",
        icon: FiGithub,
        color: "hover:text-white",
        desc: "Code Repository",
        status: "Systems Normal"
    },
    {
        name: "LinkedIn",
        handle: "Yajush Srivastava",
        link: "https://www.linkedin.com/in/yajush-srivastava-98b212335/",
        icon: FiLinkedin,
        color: "hover:text-blue-400",
        desc: "Professional Network",
        status: "Open for Connections"
    },
    {
        name: "X (Twitter)",
        handle: "@Yajush_who",
        link: "https://x.com/Yajush_who",
        icon: FaXTwitter,
        color: "hover:text-sky-400",
        desc: "Transmission Stream",
        status: "Broadcasting"
    }
];

export default function SocialPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-16 pt-10 pb-20">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4 relative"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Comms <span className="text-primary">Hub</span>
                </h1>
                <p className="text-muted-foreground max-w-lg mx-auto text-lg">
                    Establish a connection via the following secure channels.
                </p>
            </motion.div>

            {/* Social Modules */}
            <div className="grid gap-6">
                {socials.map((social, index) => (
                    <motion.a
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border p-6 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-6">
                                <div className={`p-4 rounded-xl bg-secondary/50 group-hover:bg-primary/10 transition-colors ${social.color}`}>
                                    <social.icon size={32} />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-xl font-bold">{social.name}</h2>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border/50 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            {social.status}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground font-mono text-sm">{social.desc} // {social.handle}</p>
                                </div>
                            </div>
                            <FiArrowUpRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={24} />
                        </div>
                    </motion.a>
                ))}
            </div>

            {/* Direct Line / Email */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative mt-12"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 rounded-3xl -z-10" />
                <div className="border border-dashed border-border rounded-3xl p-8 md:p-12 text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
                        <FiMail size={32} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Direct Uplink</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        For inquiries, collaborations, or technical discussions, initialize a direct transmission.
                    </p>
                    <a
                        href="mailto:yajush24606@gmail.com"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
                    >
                        <FiRadio className="animate-pulse" />
                        yajush24606@gmail.com
                    </a>
                </div>
            </motion.div>

            {/* Footer Nav */}
            <div className="flex justify-center gap-6 text-sm text-muted-foreground pt-8">
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">
                    <FiGlobe /> Return to Base
                </Link>
                <span>|</span>
                <Link href="/projects" className="hover:text-primary transition-colors flex items-center gap-2">
                    <FiCpu /> View Projects
                </Link>
            </div>
        </div>
    );
}
