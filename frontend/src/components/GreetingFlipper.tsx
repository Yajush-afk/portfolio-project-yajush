"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const greetings = [
    { text: "Hello", lang: "en" },
    { text: "नमस्ते", lang: "hi" },
    { text: "Hallo", lang: "de" },
    { text: "Hola", lang: "es" },
    { text: "Bonjour", lang: "fr" },
    { text: "こんにちは", lang: "ja" },
    { text: "Привет", lang: "ru" },
];

export default function GreetingFlipper() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % greetings.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const currentGreeting = greetings[index];

    return (
        <span className="inline-block min-w-[120px]">
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentGreeting.text}
                    initial={{ y: 20, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -20, opacity: 0, rotateX: 90 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="inline-block origin-center text-primary whitespace-nowrap"
                    style={{ backfaceVisibility: "hidden" }}
                    lang={currentGreeting.lang}
                >
                    {currentGreeting.text}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}
