"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import IntroScreen from "@/components/IntroScreen";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });
const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), { ssr: false });
const CursorGlow = dynamic(() => import("@/components/CursorGlow"), { ssr: false });
const HeroSection = dynamic(() => import("@/components/HeroSection"), { ssr: false });
const MemoriesSection = dynamic(() => import("@/components/MemoriesSection"), { ssr: false });
const GiftSection = dynamic(() => import("@/components/GiftSection"), { ssr: false });
const FooterSection = dynamic(() => import("@/components/FooterSection"), { ssr: false });

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!started && (
          <IntroScreen key="intro" onComplete={() => setStarted(true)} />
        )}
      </AnimatePresence>

      {started && (
        <>
          <SmoothScroll />
          <MusicPlayer shouldPlay={true} />
          <CursorGlow />
          <main className="bg-[#050505]">
            <HeroSection />
            <MemoriesSection />
            <GiftSection />
            <FooterSection />
          </main>
        </>
      )}
    </>
  );
}
