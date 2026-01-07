"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { SiKaggle } from "react-icons/si";

const socials = [
    {
        name: "GitHub",
        handle: "@Yajush-afk",
        link: "https://github.com/Yajush-afk",
        icon: FiGithub,
        color: "hover:text-foreground",
        desc: "Code Repository",
        status: "Systems Normal"
    },
    {
        name: "LinkedIn",
        handle: "Yajush Srivastava",
        link: "https://www.linkedin.com/in/yajush-sri/",
        icon: FiLinkedin,
        color: "hover:text-blue-600",
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
    },
    {
        name: "Kaggle",
        handle: "@yajushsrivastava",
        link: "https://www.kaggle.com/yajushsrivastava",
        icon: SiKaggle,
        color: "hover:text-blue-500",
        desc: "Data Science Experiments",
        status: "Training Models"
    }
];

export default function SocialSection() {
    return (
        <section id="socials" className="min-h-[80vh] flex flex-col justify-center py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.3 }}
                className="space-y-4 mb-12 text-center"
            >
                <h2 className="text-3xl font-bold inline-flex items-center gap-3">
                    Mission Control
                </h2>
                <p className="text-muted-foreground">
                    Connect with me across the digital universe.
                </p>
            </motion.div>

            <div className="grid gap-6 max-w-3xl mx-auto w-full">
                {socials.map((social, index) => (
                    <motion.a
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border p-6 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-6">
                                <div className={`p-4 rounded-xl bg-secondary/50 group-hover:bg-primary/10 transition-colors ${social.color}`}>
                                    <social.icon size={32} />
                                </div>
                                <div className="space-y-1 text-left">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h2 className="text-xl font-bold">{social.name}</h2>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border/50 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            {social.status}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground font-mono text-sm">{social.desc} {" // "} {social.handle}</p>
                                </div>
                            </div>
                            <FiArrowUpRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" size={24} />
                        </div>
                    </motion.a>
                ))}
            </div>

            {/* Contact Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-12 p-8 bg-secondary/20 border border-border rounded-2xl text-center space-y-6 max-w-2xl mx-auto w-full"
            >
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Ready to Collaborate?</h3>
                    <p className="text-muted-foreground">
                        I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                    </p>
                </div>
                
                <a
                    href="mailto:yajush24606@gmail.com"
                    className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg shadow-primary/20 max-w-full overflow-hidden"
                >
                    <FiMail className="shrink-0" />
                    <span className="truncate text-sm md:text-lg">yajush24606@gmail.com</span>
                </a>
            </motion.div>
        </section>
    );
}
