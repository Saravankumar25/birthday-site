"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MusicPlayerProps {
  shouldPlay: boolean;
}

export default function MusicPlayer({ shouldPlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  useEffect(() => {
    if (shouldPlay && !audioRef.current) {
      const audio = new Audio("/music.mp3");
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;
      audio.play().then(() => {
        setIsPlaying(true);
        setVisible(true);
      }).catch(() => {
        setVisible(true);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [shouldPlay]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={toggle}
          className="fixed bottom-6 right-6 z-40 group"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full bg-white/5 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative w-12 h-12 rounded-full border border-white/10 bg-black/80 backdrop-blur-xl
                          flex items-center justify-center cursor-pointer
                          hover:border-white/25 transition-all duration-500
                          shadow-lg shadow-black/40">
            {isPlaying ? (
              <div className="flex gap-[3px] items-end h-4">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-[2px] rounded-full"
                    style={{
                      background: "linear-gradient(to top, rgba(212,165,116,0.6), rgba(244,114,128,0.6))",
                    }}
                    animate={{ height: ["4px", "14px", "4px"] }}
                    transition={{
                      duration: 0.7,
                      repeat: Infinity,
                      delay: i * 0.12,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            ) : (
              <svg
                className="w-4 h-4 text-white/80 ml-0.5 group-hover:text-white transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
