"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const quoteLines = ["Capture.", "Create.", "Inspire."];

export default function HeroSection() {
  const { theme } = useTheme();

  return (
    <div className="relative isolate overflow-hidden h-screen w-full ">
      <div className="relative h-full w-full ">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
          <section className="relative z-10 flex flex-col items-center justify-center h-full w-full text-center px-6 py-24">
            {/* Cinematic Title */}
            <motion.h1
              className="text-white text-6xl md:text-8xl font-extrabold tracking-tight"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              IMAGINE SURYA
            </motion.h1>

            {/* Subtitle under title */}
            <motion.p className="mt-6 text-xl text-gray-300 font-light" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
              CAPTURING LIGHT, DEFYING TIME.
            </motion.p>

            {/* Cinematic Quote Section */}
            <motion.div
              className="mt-20 perspective-[1000px] flex flex-col items-center"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.6, delayChildren: 3 } },
              }}
            >
              {quoteLines.map((line, index) => (
                <motion.h2
                  key={index}
                  className="text-4xl sm:text-5xl font-bold text-[var(--primary)] drop-shadow-xl"
                  variants={{
                    hidden: { opacity: 0, rotateX: -90, transformOrigin: "bottom center" },
                    visible: { opacity: 1, rotateX: 0, transition: { duration: 0.8, ease: "easeOut" } },
                  }}
                >
                  {line}
                </motion.h2>
              ))}
            </motion.div>

            {/* CTA Buttons after quote */}
            <motion.div className="mt-12 flex gap-4 justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5, duration: 1 }}>
              <Button size="lg" className="bg-white text-black hover:bg-white/90 font-semibold rounded-full px-6 py-3">
                Explore the Lens
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-6 py-3">
                See Demos
              </Button>
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
}
