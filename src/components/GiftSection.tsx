"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeartParticles from "./HeartParticles";

gsap.registerPlugin(ScrollTrigger);

const giftImages = ["/gift1.jpg", "/gift2.jpg", "/gift3.jpg"];

export default function GiftSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll(".gift-card");
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 50% 50%, rgba(255, 77, 109, 0.05) 0%, transparent 70%)",
        }}
      />

      <HeartParticles />

      <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20 md:mb-28"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/30" />
            <p className="text-white/90 text-xs tracking-[0.5em] uppercase">
              Birthday Gift ?
            </p>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/30" />
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-white leading-tight">
            Huh Oh I already gave
            <br />
            <span className="bg-gradient-to-r from-amber-200 via-rose-200 to-amber-100 bg-clip-text text-transparent">
              you a gift long back
            </span>
          </h2>
        </motion.div>

        {/* Gift Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {giftImages.map((src, i) => (
            <div
              key={i}
              className="gift-card group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer
                         shadow-xl hover:shadow-2xl
                         transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1.5"
            >
              <Image
                src={src}
                alt={`Gift ${i + 1}`}
                fill
                className="object-cover transition-all duration-500 ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent
                              opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-center mt-28 md:mt-36"
        >
          <div className="w-px h-12 mx-auto bg-gradient-to-b from-white/20 to-transparent mb-6" />
          <p className="text-white/90 text-xs tracking-[0.5em] uppercase">
            with love, always
          </p>
        </motion.div>
      </div>
    </section>
  );
}
