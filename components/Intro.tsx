"use client";
import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
export default function Intro() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Overlay */}
      {/* <motion.div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/20 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} /> */}

      {/* Hero Text */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
      >
        <motion.h1
          className="text-7xl md:text-9xl font-bold text-white text-center tracking-tight"
          initial={{ letterSpacing: "2px" }}
          animate={{ letterSpacing: "10px" }}
          transition={{ delay: 0.8, duration: 1.5 }}
        >
          IMAGINE SURYA
        </motion.h1>

        <motion.p className="mt-6 text-xl text-gray-300 font-light" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}>
          CAPTURING LIGHT, DEFYING TIME.
        </motion.p>

        <motion.div className="mt-12" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <button className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-opacity-90 transition-all">EXPLORE THE LENS</button>
        </motion.div>
      </motion.div>

      {/* Animated Background Elements */}
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity, scale }}>
        <div className="h-full w-full bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
      </motion.div>

      {/* Scrolling Indicator */}
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <div className="h-8 w-5 rounded-full border-2 border-white" />
      </motion.div>

      <HeroSection></HeroSection>
    </div>
  );
}
