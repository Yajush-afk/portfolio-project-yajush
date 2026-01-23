"use client";

import { useSong } from "@/context/SongContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiSkipBack, FiSkipForward, FiPlay, FiPause, FiVolume2, FiVolumeX, FiInfo, FiList, FiX } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";

import Image from "next/image";

export default function SongPlayer() {
    const { currentSong, isPlaying, togglePlay, playNext, playPrev, isInitialized, currentTime, duration, isMuted, toggleMute, seek, songs, playSong, volume, setVolume } = useSong();
    const [showRipple, setShowRipple] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showSongList, setShowSongList] = useState(false);
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
                        className="fixed bottom-0 left-0 right-0 z-50 w-full md:w-72 md:top-24 md:left-8 md:bottom-auto md:right-auto cursor-pointer"
                    >
                        {/* Inner Wrapper for Player Content (Overflow Hidden) */}
                        <div className="relative w-full h-full rounded-t-xl md:rounded-xl overflow-hidden border-t md:border border-white/10 shadow-2xl backdrop-blur-md bg-black/40">
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
                        </div>

                        {/* My Top 10 Button */}
                        <div className="absolute -right-28 top-24 hidden md:flex flex-col items-start pointer-events-auto z-50">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowSongList(true);
                                }}
                                className="font-[family-name:var(--font-gochi)] text-3xl text-foreground -rotate-12 hover:scale-110 transition-transform cursor-pointer whitespace-nowrap"
                            >
                                My top 5
                            </button>
                        </div>

                        {/* Arrow SVG */}
                        <svg
                            className="absolute -bottom-32 left-10 w-80 h-40 text-foreground hidden md:block pointer-events-none z-40"
                            viewBox="0 0 300 150"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            {/* Start from bottom-left edge, swoop down and right, point to text (shortened) */}
                            <path d="M20,40 Q100,100 220,50" />
                            <path d="M220,50 L205,55" />
                            <path d="M220,50 L210,65" />
                        </svg>
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
                            className="relative w-full max-w-md bg-card border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Background Blur of Album Art */}
                            <div className="absolute inset-0 z-0">
                                <Image src={currentSong.image} alt="bg" fill className="object-cover opacity-20 blur-xl" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            </div>

                            <div className="relative z-10 p-6 md:p-8 flex flex-col items-center text-center h-full justify-center space-y-4 md:space-y-8 overflow-y-auto scrollbar-hide">
                                {/* Header */}
                                <div className="w-full flex justify-between items-center text-xs font-bold tracking-widest uppercase text-white relative shrink-0">
                                    <span className="absolute left-1/2 -translate-x-1/2">Now Playing</span>
                                    <div className="flex items-center gap-2 ml-auto">
                                        <button
                                            onClick={() => setShowSongList(true)}
                                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                                            aria-label="View Queue"
                                        >
                                            <FiList size={24} />
                                        </button>
                                        <button
                                            onClick={() => setIsExpanded(false)}
                                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                                            aria-label="Collapse Player"
                                        >
                                            <FiSkipBack className="rotate-[-90deg]" size={24} />
                                        </button>
                                    </div>
                                </div>

                                {/* Large Album Art */}
                                <motion.div
                                    layoutId="album-art"
                                    className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0"
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

                                        {/* Volume Control */}
                                        <div className="relative group flex justify-center">
                                            {/* Slider Popup Wrapper (Hover Bridge) */}
                                            <div className="absolute bottom-full hidden group-hover:flex flex-col items-center justify-end pb-4 z-50">
                                                {/* Visual Slider Container */}
                                                <div className="bg-black/80 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-xl w-10 h-32 flex flex-col items-center justify-center">
                                                    <div className="relative w-1.5 h-24 bg-white/20 rounded-full overflow-hidden">
                                                        <div
                                                            className="absolute bottom-0 left-0 w-full bg-white rounded-full transition-all duration-75"
                                                            style={{ height: `${(isMuted ? 0 : volume) * 100}%` }}
                                                        />
                                                        <input
                                                            type="range"
                                                            min={0}
                                                            max={1}
                                                            step={0.01}
                                                            value={isMuted ? 0 : volume}
                                                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                            style={{ writingMode: 'vertical-lr', direction: 'rtl' } as any}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <button onClick={toggleMute} className={`p-3 rounded-full transition-colors ${isMuted ? 'text-red-400 bg-red-400/10' : 'text-white hover:bg-white/10'}`}>
                                                {isMuted ? <FiVolumeX size={24} /> : <FiVolume2 size={24} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Song List Modal */}
            <AnimatePresence>
                {showSongList && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
                        onClick={() => setShowSongList(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-md bg-card border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                                <h2 className="text-lg font-bold text-white">My Top 5</h2>
                                <button
                                    onClick={() => setShowSongList(false)}
                                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>

                            {/* List */}
                            <div className="overflow-y-auto p-2 space-y-1">
                                {songs.map((song, index) => (
                                    <button
                                        key={song.id}
                                        onClick={() => {
                                            playSong(index);
                                            setShowSongList(false);
                                        }}
                                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all group ${currentSong.id === song.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                    >
                                        <div className="relative w-10 h-10 rounded-md overflow-hidden shrink-0">
                                            <Image src={song.image} alt={song.title} fill className="object-cover" />
                                            {/* Play Overlay */}
                                            <div className={`absolute inset-0 flex items-center justify-center bg-black/40 ${currentSong.id === song.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                                                {currentSong.id === song.id && isPlaying ? (
                                                    <div className="flex gap-0.5 items-end h-3">
                                                        <motion.div animate={{ height: [3, 12, 6, 12, 3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-0.5 bg-white rounded-full" />
                                                        <motion.div animate={{ height: [6, 3, 12, 3, 6] }} transition={{ repeat: Infinity, duration: 1 }} className="w-0.5 bg-white rounded-full" />
                                                        <motion.div animate={{ height: [12, 6, 3, 6, 12] }} transition={{ repeat: Infinity, duration: 1 }} className="w-0.5 bg-white rounded-full" />
                                                    </div>
                                                ) : (
                                                    <FiPlay className="text-white fill-white" size={16} />
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start text-left flex-1 min-w-0">
                                            <span className={`text-sm font-bold truncate ${currentSong.id === song.id ? 'text-primary' : 'text-white'}`}>{song.title}</span>
                                            <span className="text-xs text-white/60 truncate">{song.artist}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
