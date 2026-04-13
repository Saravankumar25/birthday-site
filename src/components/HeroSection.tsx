"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const titleWords = ["Happy", "Birthday", "Keerthi"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.3,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0, 0, 0.58, 1] as [number, number, number, number],
    },
  },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on background image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: 150,
          scale: 1.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Overlay darkens as you scroll
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.85,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "60% top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background image with parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 -top-[100px] -bottom-[100px] will-change-transform"
      >
        <Image
          src="/hero-image.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay per spec */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/0 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-20 text-center">
        {/* Decorative label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/90 text-xs sm:text-sm uppercase tracking-[0.4em] mb-8"
        >
          April 14, 2026
        </motion.p>

        {/* Main title with word-by-word reveal */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.95]"
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className={`inline-block mr-[0.25em] ${
                word === "Keerthi"
                  ? "bg-gradient-to-r from-amber-200 via-rose-200 to-amber-100 bg-clip-text text-transparent"
                  : "text-white"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-10 w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 md:mt-10"
        >
          <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed font-light tracking-wide max-w-xl mx-auto font-[var(--font-playfair)] italic">
            I&apos;m truly grateful for every moment we&apos;ve shared.
            I hope this year brings you endless happiness, growth, and all the
            little things that make you smile.
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <p className="text-white/90 text-[10px] tracking-[0.5em] uppercase">
          Scroll
        </p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ borderColor: "rgba(255, 255, 255, 0.5)" }}
          className="w-4 h-7 border rounded-full flex justify-center pt-1.5"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], height: ["3px", "6px", "3px"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 bg-white/70 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
