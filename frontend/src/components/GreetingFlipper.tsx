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
        <div className="inline-flex items-center justify-start min-w-[120px]">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: 20, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -20, opacity: 0, rotateX: 90 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="origin-center text-primary whitespace-nowrap"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {greetings[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}
