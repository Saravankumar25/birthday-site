"use client";

import { motion } from "framer-motion";

export default function FooterSection() {
  return (
    <footer className="relative bg-[#050505] py-24 md:py-32 overflow-hidden">
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="space-y-8"
        >
          {/* Decorative diamond */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-white/40" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/30" />
          </div>

          <p className="text-white/60 text-[10px] tracking-[0.5em] uppercase">
            Made with love
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
