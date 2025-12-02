"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchAPI } from "@/lib/api";
import { FiLinkedin, FiMail, FiTwitter, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

interface SocialPost {
    content: string;
    link: string;
    date: string;
}

interface SocialData {
    x_post?: SocialPost;
    linkedin_post?: SocialPost;
}

export default function SocialPage() {
    const [posts, setPosts] = useState<SocialData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchAPI("/social/posts");
                setPosts(data);
            } catch (error) {
                console.error("Failed to load social posts", error);
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
        <div className="max-w-4xl mx-auto space-y-16 pt-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <h1 className="text-4xl font-bold">Socials</h1>
                <p className="text-muted-foreground">
                    Connect with me on social media or drop me an email.
                </p>
                <div className="flex justify-center gap-6 pt-4">
                    <a
                        href="https://x.com/Yajush_who"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-secondary rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                        <FiTwitter size={24} />
                    </a>
                    <a
                        href="https://linkedin.com/in/yajush-srivastava-98b212335"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-secondary rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                        <FiLinkedin size={24} />
                    </a>
                </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* X/Twitter Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300 flex flex-col"
                >
                    <div className="flex items-center gap-3 mb-4 text-primary">
                        <FiTwitter size={24} />
                        <h2 className="font-semibold">Latest on X</h2>
                    </div>
                    {posts?.x_post ? (
                        <div className="flex-1 flex flex-col justify-between space-y-4">
                            <p className="text-lg italic">"{posts.x_post.content}"</p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                                <span>{posts.x_post.date}</span>
                                <a
                                    href={posts.x_post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    View Post
                                </a>
                            </div>
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No recent posts found.</p>
                    )}
                </motion.div>

                {/* LinkedIn Card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/50 transition-all duration-300 flex flex-col"
                >
                    <div className="flex items-center gap-3 mb-4 text-blue-600">
                        <FiLinkedin size={24} />
                        <h2 className="font-semibold">Latest on LinkedIn</h2>
                    </div>
                    {posts?.linkedin_post ? (
                        <div className="flex-1 flex flex-col justify-between space-y-4">
                            <p className="text-lg italic">"{posts.linkedin_post.content}"</p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                                <span>{posts.linkedin_post.date}</span>
                                <a
                                    href={posts.linkedin_post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    View Post
                                </a>
                            </div>
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No recent posts found.</p>
                    )}
                </motion.div>
            </div>

            {/* Contact Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-secondary/30 rounded-2xl p-8 text-center space-y-6"
            >
                <div className="inline-block p-4 bg-background rounded-full shadow-sm text-primary">
                    <FiMail size={32} />
                </div>
                <h2 className="text-2xl font-bold">Get in Touch</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Feel free to reach out for collaborations, opportunities, or just a friendly chat about tech!
                </p>
                <a
                    href="mailto:yajush24606@gmail.com"
                    className="inline-block text-xl font-medium hover:text-primary transition-colors"
                >
                    yajush24606@gmail.com
                </a>
            </motion.div>

            <div className="flex justify-center gap-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                    Back to Home
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                    View Projects <FiArrowRight />
                </Link>
            </div>
        </div>
    );
}
