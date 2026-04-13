"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroScreenProps {
  onComplete: () => void;
}

interface ParticleProps {
  delay: number;
  x: number;
  duration: number;
  size: number;
}

function Particle({ delay, x, duration, size }: ParticleProps) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        bottom: "-5%",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
        y: [0, -1200],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

function DodgeButton({ label }: { label: string }) {
  const [offset, setOffset] = useState({ x: 0, y: 0, rotate: 0 });
  const dodgeCount = useRef(0);

  const handleMouseEnter = useCallback(() => {
    dodgeCount.current++;
    const intensity = Math.min(dodgeCount.current * 0.3, 2);
    const maxX = 180 * intensity;
    const maxY = 100 * intensity;
    const rx = (Math.random() - 0.5) * 2 * maxX;
    const ry = (Math.random() - 0.5) * 2 * maxY;
    const rr = (Math.random() - 0.5) * 20;
    setOffset({ x: rx, y: ry, rotate: rr });
  }, []);

  return (
    <motion.button
      animate={{ x: offset.x, y: offset.y, rotate: offset.rotate }}
      transition={{ type: "spring", stiffness: 180, damping: 14, mass: 0.8 }}
      onMouseEnter={handleMouseEnter}
      style={{
        borderColor: "rgba(255, 255, 255, 0.2)",
        color: "rgba(255, 255, 255, 0.85)",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
      }}
      className="px-8 py-3.5 rounded-full border backdrop-blur-md
                 text-sm tracking-[0.15em] uppercase cursor-pointer select-none
                 transition-colors duration-500 hover:text-white
                 hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]"
    >
      {label}
    </motion.button>
  );
}

function StillButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.06,
        boxShadow: "0 0 40px rgba(212, 165, 116, 0.15)",
        borderColor: "rgba(212, 165, 116, 0.4)",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      style={{
        borderColor: "rgba(255, 255, 255, 0.2)",
        color: "rgba(255, 255, 255, 0.85)",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
      }}
      className="px-8 py-3.5 rounded-full border backdrop-blur-md
                 text-sm tracking-[0.15em] uppercase cursor-pointer select-none
                 transition-colors duration-500 hover:text-white"
    >
      {label}
    </motion.button>
  );
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [fading, setFading] = useState(false);
  const [particles, setParticles] = useState<ParticleProps[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        delay: i * 0.3,
        x: ((i * 37 + 13) % 100),
        duration: 4 + (i % 5),
        size: 1 + (i % 3),
      }))
    );
  }, []);

  const handleCorrectClick = () => {
    setFading(true);
    setTimeout(onComplete, 1400);
  };

  return (
    <AnimatePresence>
      {!fading ? (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(212, 165, 116, 0.03) 0%, transparent 70%)",
            }}
          />

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p, i) => (
              <Particle key={i} {...p} />
            ))}
          </div>

          {/* Top decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[30%] left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />

          {/* Heading */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative text-white/60 text-[10px] uppercase mb-10 tracking-[0.5em]"
          >
            An experience for
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative text-white/90 text-xl sm:text-2xl md:text-3xl font-[var(--font-playfair)] font-light tracking-wide mb-16 text-center px-6 italic"
          >
            What is your name?
          </motion.h2>

          {/* Buttons */}
          <div className="relative flex flex-col sm:flex-row items-center gap-5 sm:gap-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <DodgeButton label="Keerthi Bandari" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
            >
              <StillButton label="Keerthi Reddy" onClick={handleCorrectClick} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
            >
              <DodgeButton label="Keerthi" />
            </motion.div>
          </div>

          {/* Bottom hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2 }}
            className="absolute bottom-[15%] flex flex-col items-center gap-3"
          >
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
            <p className="text-white/50 text-[10px] tracking-[0.4em] uppercase">
              Choose wisely
            </p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="fade"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#050505]"
        />
      )}
    </AnimatePresence>
  );
}
