"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export type Song = {
    id: string;
    title: string;
    artist: string;
    src: string;
    theme: string;
    image: string;
    about: string;
};

const songs: Song[] = [
    {
        id: "gods-plan",
        title: "God's Plan",
        artist: "Drake",
        src: "/songs/gods-plan.mp3",
        theme: "gods-plan",
        image: "/album-art/gods-plan.jpg",
        about: "https://en.wikipedia.org/wiki/God%27s_Plan_(song)",
    },
    {
        id: "heat-waves",
        title: "Heat Waves",
        artist: "Glass Animals",
        src: "/songs/heat-waves.mp3",
        theme: "heat-waves",
        image: "/album-art/heat-waves.jpg",
        about: "https://en.wikipedia.org/wiki/Heat_Waves",
    },
    {
        id: "shape-of-you",
        title: "Shape of You",
        artist: "Ed Sheeran",
        src: "/songs/shape-of-you.mp3",
        theme: "shape-of-you",
        image: "/album-art/shape-of-you.jpg",
        about: "https://en.wikipedia.org/wiki/Shape_of_You",
    },

    {
        id: "yellow",
        title: "Yellow",
        artist: "Coldplay",
        src: "/songs/yellow.mp3",
        theme: "yellow",
        image: "/album-art/yellow.jpg",
        about: "https://en.wikipedia.org/wiki/Yellow_(Coldplay_song)",
    },

    {
        id: "co2",
        title: "CO2",
        artist: "Prateek Kuhad",
        src: "/songs/co2.mp3",
        theme: "co2",
        image: "/album-art/co2.jpg",
        about: "https://en.wikipedia.org/wiki/Prateek_Kuhad",
    },

];

interface SongContextType {
    currentSong: Song;
    isPlaying: boolean;
    togglePlay: () => void;
    playNext: () => void;
    playPrev: () => void;
    isInitialized: boolean;
    currentTime: number;
    duration: number;
    isMuted: boolean;
    toggleMute: () => void;
    volume: number;
    setVolume: (volume: number) => void;
    seek: (time: number) => void;
    songs: Song[];
    playSong: (index: number) => void;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

export function SongProvider({ children }: { children: React.ReactNode }) {
    const [currentIndex, setCurrentIndex] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem("currentSongIndex");
            if (saved !== null) {
                const index = parseInt(saved, 10);
                if (!isNaN(index) && index >= 0 && index < songs.length) {
                    return index;
                }
            }
        }
        return 0;
    });
    const [isPlaying, setIsPlaying] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolumeState] = useState(1);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentSong = songs[currentIndex];

    useEffect(() => {
        setIsInitialized(true);

        // Cleanup function for the audio element when the component unmounts
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []); // Empty dependency array means this runs once on mount

    // This effect runs when currentIndex changes (including initial load from localStorage)
    useEffect(() => {
        // Save current song to localStorage
        localStorage.setItem("currentSongIndex", currentIndex.toString());

        // Initialize audioRef.current if it's null (first time this effect runs after initial mount)
        if (!audioRef.current) {
            audioRef.current = new Audio(songs[currentIndex].src);
            audioRef.current.loop = false;
            audioRef.current.addEventListener("ended", () => {
                playNext();
            });
            audioRef.current.addEventListener("timeupdate", () => {
                setCurrentTime(audioRef.current?.currentTime || 0);
            });
            audioRef.current.addEventListener("loadedmetadata", () => {
                setDuration(audioRef.current?.duration || 0);
            });
        }

        // Update theme when song changes
        document.documentElement.setAttribute("data-theme", songs[currentIndex].theme);

        // Update audio source if it changed
        if (audioRef.current && audioRef.current.src !== window.location.origin + songs[currentIndex].src) {
            const wasPlaying = isPlaying;
            audioRef.current.src = songs[currentIndex].src;
            audioRef.current.currentTime = 0; // Reset time on song change
            if (wasPlaying) {
                audioRef.current.play().catch(e => console.log("Playback failed", e));
            }
        }
    }, [currentIndex]); // Rerun when currentIndex changes

    // Handle Play/Pause
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => {
                    console.log("Autoplay prevented", e);
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    // Handle Mute
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    // Handle Volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const toggleMute = () => setIsMuted(!isMuted);

    const setVolume = (newVolume: number) => {
        const clampedVolume = Math.max(0, Math.min(1, newVolume));
        setVolumeState(clampedVolume);
        if (clampedVolume > 0 && isMuted) {
            setIsMuted(false);
        }
    };

    const seek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const playNext = () => {
        setCurrentIndex((prev) => (prev + 1) % songs.length);
        setIsPlaying(true);
    };

    const playPrev = () => {
        if (audioRef.current && audioRef.current.currentTime > 5) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
        } else {
            setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
        }
        setIsPlaying(true);
    };

    const playSong = (index: number) => {
        if (index >= 0 && index < songs.length) {
            setCurrentIndex(index);
            setIsPlaying(true);
        }
    };

    return (
        <SongContext.Provider value={{
            currentSong,
            isPlaying,
            togglePlay,
            playNext,
            playPrev,
            isInitialized,
            currentTime,
            duration,
            isMuted,
            toggleMute,
            volume,
            setVolume,
            seek,
            songs,
            playSong
        }}>
            {children}
        </SongContext.Provider>
    );
}

export function useSong() {
    const context = useContext(SongContext);
    if (context === undefined) {
        throw new Error("useSong must be used within a SongProvider");
    }
    return context;
}
