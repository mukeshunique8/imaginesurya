"use client";

import { BackgroundBeamsWithCollision } from "@/components/ui/aceternity/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { useThemeColors } from "@/components/providers/useThemeColors"; // updated hook

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function HeroSection() {
  const { cycleColor } = useThemeColors();

  return (
    <section className="relative h-screen w-full overflow-hidden cursor-pointer" onClick={cycleColor}>
      <BackgroundBeamsWithCollision className="h-screen">
        <div
          className="relative z-10 flex h-full flex-col items-center md:justify-center pt-[45%] md:pt-0 px-4 sm:px-6 lg:px-12 text-center space-y-12 max-w-4xl mx-auto transition-colors duration-500"
          style={{ color: "var(--primary, inherit)" }}
        >
          <motion.h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            IMAGINE SURYA
          </motion.h1>

          <motion.p className="sm:text-xl max-w-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}>
            A modern, funny, inspirational photography portfolio — bring out your bold and creative side.
          </motion.p>

          <motion.div className="flex gap-4 flex-wrap justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }}>
            <Button size="lg">Explore Now</Button>
            <Button size="lg" variant="outline">
              See Demos
            </Button>
          </motion.div>
        </div>
      </BackgroundBeamsWithCollision>
      {/* <Image className="absolute inset-0 object-cover w-full h-full" alt="hero" width={100} height={100} src="/hero/1.jpeg"></Image> */}
    </section>
  );
}
