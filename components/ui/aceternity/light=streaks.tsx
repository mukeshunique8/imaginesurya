import { motion } from "framer-motion";

import React from "react";

export default function LightStreaks() {
  return (
    <motion.div className="relative h-4 w-full">
      <motion.div
        className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/30 opacity-25 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          delay: 0.2,
          duration: 1.2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}
