"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const greetings = [
    "Hello",      // English
    "नमस्ते",     // Hindi
    "Hallo",      // German
    "Hola",       // Spanish
    "Bonjour",    // French
    "こんにちは",  // Japanese
    "Привет",     // Russian
];

export default function GreetingFlipper() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % greetings.length);
        }, 2500); // Change every 2.5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-[1.2em] w-32 md:w-48 overflow-hidden inline-flex items-center justify-start">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: 40, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -40, opacity: 0, rotateX: 90 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute left-0 origin-center text-primary"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {greetings[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}
