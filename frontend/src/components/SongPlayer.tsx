"use client";

import { useSong } from "@/context/SongContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiSkipBack, FiSkipForward, FiPlay, FiPause, FiVolume2, FiVolumeX } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";

import Image from "next/image";

export default function SongPlayer() {
    const { currentSong, isPlaying, togglePlay, playNext, playPrev, isInitialized, currentTime, duration, isMuted, toggleMute, seek } = useSong();
    const [showRipple, setShowRipple] = useState(false);
    const isFirstMount = useRef(true);

    // Trigger ripple on song change
    useEffect(() => {
        if (!isInitialized) return;

        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }

        setShowRipple(true);
        const timer = setTimeout(() => setShowRipple(false), 800); // Ripple duration
        return () => clearTimeout(timer);
    }, [currentSong.id, isInitialized]);

    if (!isInitialized) return null;

    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <>
            {/* Theme Ripple Animation */}
            <AnimatePresence>
                {showRipple && (
                    <motion.div
                        initial={{ clipPath: "circle(0% at 50px 50px)" }}
                        animate={{ clipPath: "circle(150% at 50px 50px)" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-30 pointer-events-none bg-primary/20 backdrop-blur-[2px]"
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="fixed top-24 left-4 z-40 w-72 rounded-xl overflow-hidden border border-white/10 shadow-lg backdrop-blur-md bg-black/20"
            >
                {/* Dynamic Gradient Background based on theme */}
                <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-primary/40 to-accent/40 pointer-events-none" />

                <div className="relative p-4 flex gap-4 items-center">
                    {/* Album Art */}
                    <div className="relative w-14 h-14 rounded-md overflow-hidden shadow-md shrink-0">
                        <Image
                            src={currentSong.image}
                            alt={currentSong.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Song Info & Controls */}
                    <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex flex-col mb-1">
                            <AnimatePresence mode="wait">
                                <motion.h3
                                    key={currentSong.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-sm font-bold text-foreground truncate"
                                >
                                    {currentSong.title}
                                </motion.h3>
                            </AnimatePresence>
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={currentSong.artist}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="text-xs text-muted-foreground truncate"
                                >
                                    {currentSong.artist}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between mt-2">
                            <button
                                onClick={playPrev}
                                className="p-2 rounded-full hover:bg-white/10 text-foreground transition-colors"
                                aria-label="Previous Song"
                            >
                                <FiSkipBack size={18} />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="p-3 rounded-full bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-transform shadow-md"
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} className="ml-0.5" />}
                            </button>

                            <button
                                onClick={playNext}
                                className="p-2 rounded-full hover:bg-white/10 text-foreground transition-colors"
                                aria-label="Next Song"
                            >
                                <FiSkipForward size={18} />
                            </button>

                            {/* Mute Button */}
                            <button
                                onClick={toggleMute}
                                className="p-2 rounded-full hover:bg-white/10 text-foreground transition-colors ml-1"
                                aria-label={isMuted ? "Unmute" : "Mute"}
                            >
                                {isMuted ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Real Progress Bar */}
                <div className="relative h-1 bg-white/10 w-full">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-primary"
                        style={{ width: `${progress}%` }}
                        layoutId="progress"
                    />
                </div>
            </motion.div>
        </>
    );
}
