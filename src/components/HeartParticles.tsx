"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface HeartProps {
  delay: number;
  x: number;
  driftX: number;
  size: number;
  opacity: number;
  duration: number;
}

function Heart({ delay, x, driftX, size, opacity, duration }: HeartProps) {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0, x: 0 }}
      animate={{
        y: [0, -250],
        opacity: [0, opacity, opacity, 0],
        x: [0, driftX],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeOut",
        delay,
      }}
      className="absolute bottom-0"
      style={{ left: `${x}%` }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="#ff4d6d"
        style={{ filter: "blur(0.5px)" }}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </motion.div>
  );
}

function generateHearts() {
  return Array.from({ length: 16 }, (_, i) => ({
    id: i,
    delay: (i * 5) / 16,
    x: ((i * 37 + 13) % 100),
    driftX: ((i * 7 + 3) % 40) - 20,
    size: (i % 5) * 3 + 10,
    opacity: (i % 4) * 0.06 + 0.25,
    duration: (i % 3) + 4,
  }));
}

export default function HeartParticles() {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  useEffect(() => {
    setHearts(generateHearts());
  }, []);

  if (hearts.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((h, i) => (
        <Heart key={i} {...h} />
      ))}
    </div>
  );
}
