"use client";

import { BackgroundBeamsWithCollision } from "@/components/ui/aceternity/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const fixedPalette = [
  "#ef4444", // red-500
  "#3b82f6", // blue-500
  "#10b981", // emerald-500
  "#8b5cf6", // violet-500
  "#f59e0b", // amber-500
  "#ec4899", // pink-500
];

export default function HeroSection() {
  const [primary, setPrimary] = useState("");

  const darkContrastPalette = [
    "#ef4444", // red-500
    "#dc2626", // red-600
    "#3b82f6", // blue-500
    "#2563eb", // blue-600
    "#10b981", // emerald-500
    "#059669", // emerald-600
    "#8b5cf6", // violet-500
    "#7c3aed", // violet-600
    "#f59e0b", // amber-500
    "#d97706", // amber-600
    "#ec4899", // pink-500
    "#db2777", // pink-600
    "#14b8a6", // teal-500
    "#0d9488", // teal-600
    "#9333ea", // purple-600
  ];

  const handleColorChange = () => {
    const color = darkContrastPalette[Math.floor(Math.random() * darkContrastPalette.length)];

    setPrimary(color);
    document.documentElement.style.setProperty("--primary", color);
  };
  const handleColorChangeold = () => {
    const isRandom = Math.random() > 0.5;
    let color = "";

    if (isRandom) {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      const a = (Math.random() * 0.5 + 0.5).toFixed(2); // opacity 0.5–1
      color = `rgba(${r}, ${g}, ${b}, ${a})`;
    } else {
      color = fixedPalette[Math.floor(Math.random() * fixedPalette.length)];
    }

    setPrimary(color);
    document.documentElement.style.setProperty("--primary", color);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden cursor-pointer" onClick={handleColorChange}>
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
    </section>
  );
}
