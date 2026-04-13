"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const memoryImages = [
  "/memory1.jpg",
  "/memory2.jpg",
  "/memory3.jpg",
  "/memory4.jpg",
  "/memory5.jpg",
  "/memory6.jpg",
  "/newmem1.jpg",
  "/newmem2.jpg",
  "/newmem3.jpg",
];

const VIDEO_URL = process.env.NEXT_PUBLIC_VIDEO_URL ?? "/video.mp4";

export default function MemoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".memory-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Autoplay was blocked — try on first user interaction
      const resume = () => {
        video.play().catch(() => {});
        document.removeEventListener("click", resume);
        document.removeEventListener("touchstart", resume);
      };
      document.addEventListener("click", resume, { once: true });
      document.addEventListener("touchstart", resume, { once: true });
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black py-24">
      {/* Video Block */}
      {!videoError && (
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
            <video
              ref={videoRef}
              src={VIDEO_URL}
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setVideoError(true)}
              className="absolute inset-0 w-full h-full object-contain rounded-2xl"
            />
          </div>
        </div>
      )}

      {/* Section header */}
      <div className="text-center py-24 md:py-28 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="space-y-5"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/30" />
            <p className="text-white/90 text-xs tracking-[0.5em] uppercase">
              The Memories
            </p>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/30" />
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Always cherishing these moments
          </h2>
        </motion.div>
      </div>

      {/* Image Grid */}
      <div
        ref={gridRef}
        className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {memoryImages.map((src, i) => (
          <div
            key={i}
            className="memory-card group relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3] cursor-pointer"
          >
            <Image
              src={src}
              alt={`Memory ${i + 1}`}
              fill
              className="object-cover transition-all duration-500 ease-out group-hover:scale-[1.06]"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent
                            opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}
