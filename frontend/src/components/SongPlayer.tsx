"use client";

import { useSong } from "@/context/SongContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiSkipBack, FiSkipForward, FiPlay, FiPause, FiVolume2, FiVolumeX, FiInfo } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";

import Image from "next/image";

export default function SongPlayer() {
    const { currentSong, isPlaying, togglePlay, playNext, playPrev, isInitialized, currentTime, duration, isMuted, toggleMute, seek } = useSong();
    const [showRipple, setShowRipple] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
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

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const newTime = (x / width) * duration;
        seek(newTime);
    };

    return (
        <>
            {/* Theme Ripple Animation */}
            <AnimatePresence>
                {showRipple && (
                    <motion.div
                        key={currentSong.id}
                        initial={{ clipPath: "circle(0% at 50px 50px)" }}
                        animate={{ clipPath: "circle(150% at 50px 50px)" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-30 pointer-events-none bg-primary/20 backdrop-blur-[2px]"
                    />
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {!isExpanded ? (
                    /* Mini Player */
                    <motion.div
                        layoutId="player-container"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onClick={() => setIsExpanded(true)}
                        className="fixed bottom-0 left-0 right-0 z-50 w-full md:w-72 md:top-24 md:left-4 md:bottom-auto md:right-auto rounded-t-xl md:rounded-xl overflow-hidden border-t md:border border-white/10 shadow-2xl backdrop-blur-md bg-black/40 cursor-pointer"
                    >
                        {/* Dynamic Gradient Background */}
                        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-primary/40 to-accent/40 pointer-events-none" />

                        <div className="relative p-3 flex gap-3 items-center">
                            {/* Album Art */}
                            <motion.div layoutId="album-art" className="relative w-12 h-12 rounded-md overflow-hidden shadow-md shrink-0">
                                <Image
                                    src={currentSong.image}
                                    alt={currentSong.title}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>

                            {/* Song Info & Controls */}
                            <div className="flex flex-col flex-1 min-w-0">
                                <motion.div layoutId="song-info" className="flex flex-col mb-1">
                                    <h3 className="text-sm font-bold text-foreground truncate">{currentSong.title}</h3>
                                    <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
                                </motion.div>

                                {/* Controls */}
                                <div className="flex items-center justify-between mt-1" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={playPrev} className="p-1.5 hover:bg-white/10 rounded-full transition-colors"><FiSkipBack size={16} /></button>
                                    <button onClick={togglePlay} className="p-2 bg-primary text-primary-foreground rounded-full shadow-md hover:scale-105 transition-transform">
                                        {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} className="ml-0.5" />}
                                    </button>
                                    <button onClick={playNext} className="p-1.5 hover:bg-white/10 rounded-full transition-colors"><FiSkipForward size={16} /></button>
                                    <button onClick={toggleMute} className={`p-1.5 rounded-full transition-colors ${isMuted ? 'text-red-400 bg-red-400/10' : 'text-muted-foreground hover:text-foreground'}`}>
                                        {isMuted ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="relative h-1 bg-white/10 w-full">
                            <motion.div className="absolute top-0 left-0 h-full bg-primary" style={{ width: `${progress}%` }} layoutId="progress-bar" />
                        </div>
                    </motion.div>
                ) : (
                    /* Full Player Overlay */
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
                        onClick={() => setIsExpanded(false)}
                    >
                        <motion.div
                            layoutId="player-container"
                            className="relative w-full max-w-md bg-card border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Background Blur of Album Art */}
                            <div className="absolute inset-0 z-0">
                                <Image src={currentSong.image} alt="bg" fill className="object-cover opacity-20 blur-xl" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            </div>

                            <div className="relative z-10 p-8 flex flex-col items-center text-center h-full justify-center space-y-8">
                                {/* Header */}
                                <div className="w-full flex justify-between items-center text-xs font-bold tracking-widest uppercase text-white">
                                    <span>Now Playing</span>
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                                        aria-label="Collapse Player"
                                    >
                                        <FiSkipBack className="rotate-[-90deg]" size={24} />
                                    </button>
                                </div>

                                {/* Large Album Art */}
                                <motion.div
                                    layoutId="album-art"
                                    className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                                    style={{ boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.5)" }}
                                >
                                    <Image src={currentSong.image} alt={currentSong.title} fill className="object-cover" />
                                </motion.div>

                                {/* Song Info */}
                                <motion.div layoutId="song-info" className="space-y-2 flex flex-col items-center">
                                    <h2 className="text-2xl font-bold text-white">{currentSong.title}</h2>
                                    <p className="text-lg text-white/70">{currentSong.artist}</p>
                                </motion.div>

                                {/* Scrubber */}
                                <div className="w-full space-y-2">
                                    <div
                                        className="relative h-1.5 bg-white/20 rounded-full cursor-pointer group"
                                        onClick={handleSeek}
                                    >
                                        <motion.div
                                            layoutId="progress-bar"
                                            className="absolute top-0 left-0 h-full bg-white rounded-full group-hover:bg-white/80 transition-colors"
                                            style={{ width: `${progress}%` }}
                                        >
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </motion.div>
                                    </div>
                                    <div className="flex justify-between text-xs text-white/70 font-mono">
                                        <span suppressHydrationWarning>{formatTime(currentTime)}</span>
                                        <span suppressHydrationWarning>{formatTime(duration)}</span>
                                    </div>
                                </div>

                                {/* Main Controls */}
                                <div className="grid grid-cols-3 items-center w-full max-w-[320px] mx-auto">
                                    {/* Prev Button & About */}
                                    <div className="flex justify-end items-center gap-4">
                                        <a
                                            href={currentSong.about}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                                            aria-label="About Song"
                                        >
                                            <FiInfo size={24} />
                                        </a>
                                        <button onClick={playPrev} className="p-3 hover:bg-white/10 rounded-full transition-colors text-white"><FiSkipBack size={28} /></button>
                                    </div>

                                    {/* Play/Pause Button (Centered) */}
                                    <div className="flex justify-center">
                                        <button
                                            onClick={togglePlay}
                                            className="p-4 bg-white text-black rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all"
                                        >
                                            {isPlaying ? <FiPause size={32} /> : <FiPlay size={32} className="ml-1" />}
                                        </button>
                                    </div>

                                    {/* Next & Mute Group */}
                                    <div className="flex justify-start items-center gap-4">
                                        <button onClick={playNext} className="p-3 hover:bg-white/10 rounded-full transition-colors text-white"><FiSkipForward size={28} /></button>
                                        <button onClick={toggleMute} className={`p-3 rounded-full transition-colors ${isMuted ? 'text-red-400 bg-red-400/10' : 'text-white hover:bg-white/10'}`}>
                                            {isMuted ? <FiVolumeX size={24} /> : <FiVolume2 size={24} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
