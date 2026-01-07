"use client";

import { motion } from "framer-motion";
import { FiGithub, FiInstagram, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi";
import { SiKaggle, SiLeetcode } from "react-icons/si";

const socials = [
    {
        name: "LinkedIn",
        icon: FiLinkedin,
        url: "https://www.linkedin.com/in/yajush-srivastava-200355255/",
        color: "hover:text-blue-600",
        desc: "Professional updates & networking"
    },
    {
        name: "GitHub",
        icon: FiGithub,
        url: "https://github.com/yajush-afk",
        color: "hover:text-foreground",
        desc: "Code, projects & contributions"
    },
    {
        name: "Twitter / X",
        icon: FiTwitter,
        url: "https://x.com/yajush_afk",
        color: "hover:text-blue-400",
        desc: "Tech thoughts & random musings"
    },
    {
        name: "Instagram",
        icon: FiInstagram,
        url: "https://www.instagram.com/yajush_srivastava/",
        color: "hover:text-pink-600",
        desc: "Life behind the screens"
    },
    {
        name: "Kaggle",
        icon: SiKaggle,
        url: "https://www.kaggle.com/yajushsrivastava",
        color: "hover:text-blue-500",
        desc: "Data science experiments"
    },
    {
        name: "LeetCode",
        icon: SiLeetcode,
        url: "https://leetcode.com/u/yajush_afk/",
        color: "hover:text-yellow-500",
        desc: "Problem solving & algorithms"
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {socials.map((social, index) => (
                    <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="group bg-card border border-border p-6 rounded-xl hover:border-primary/50 hover:shadow-lg transition-all flex items-center gap-4"
                    >
                        <div className={`text-3xl transition-colors ${social.color}`}>
                            <social.icon />
                        </div>
                        <div>
                            <h3 className="font-bold group-hover:text-primary transition-colors">{social.name}</h3>
                            <p className="text-xs text-muted-foreground">{social.desc}</p>
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
                className="mt-12 p-8 bg-secondary/20 border border-border rounded-2xl text-center space-y-6 max-w-2xl mx-auto"
            >
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Ready to Collaborate?</h3>
                    <p className="text-muted-foreground">
                        I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                    </p>
                </div>
                
                <a
                    href="mailto:yajushsrivastava@gmail.com"
                    className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg shadow-primary/20 max-w-full overflow-hidden"
                >
                    <FiMail className="shrink-0" />
                    <span className="truncate text-sm md:text-lg">yajushsrivastava@gmail.com</span>
                </a>
            </motion.div>
        </section>
    );
}
