"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroScreen from "@/components/IntroScreen";
import HeroSection from "@/components/HeroSection";
import MemoriesSection from "@/components/MemoriesSection";
import GiftSection from "@/components/GiftSection";
import MusicPlayer from "@/components/MusicPlayer";
import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";
import FooterSection from "@/components/FooterSection";

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
