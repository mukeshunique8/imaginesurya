"use client";
import React from "react";
import { Timeline } from "../../ui/aceternity/timeline";
import Image from "next/image";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AboutSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const data = [
    {
      title: "Current",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">Actively working as a professional photographer covering weddings, portraits, and events.</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {["/about/1.jpeg", "/about/2.jpeg", "/about/3.jpg", "/about/4.jpg"].map((src, i) => (
              <div key={i} onClick={() => setSelectedImage(src)} className="relative w-full h-40 md:h-60 cursor-pointer rounded-lg overflow-hidden shadow-lg">
                <Image src={src} alt={`Event ${i}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover transition-transform hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">Took up gym and fitness seriously — balancing a healthy lifestyle with photography work.</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {["/about/1.jpeg", "/about/2.jpeg", "/about/3.jpg", "/about/4.jpg"].map((src, i) => (
              <div key={i} onClick={() => setSelectedImage(src)} className="relative w-full h-40 md:h-60 cursor-pointer rounded-lg overflow-hidden shadow-lg">
                <Image src={src} alt={`Event ${i}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover transition-transform hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Developed a deep interest in cars — attended car shows and started a small car photography project.
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {["/about/1.jpeg", "/about/2.jpeg", "/about/3.jpg", "/about/4.jpg"].map((src, i) => (
              <div key={i} onClick={() => setSelectedImage(src)} className="relative w-full h-40 md:h-60 cursor-pointer rounded-lg overflow-hidden shadow-lg">
                <Image src={src} alt={`Event ${i}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover transition-transform hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "2019",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">Completed my degree in photography — learned technical skills, lighting, and composition.</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {["/about/1.jpeg", "/about/2.jpeg", "/about/3.jpg", "/about/4.jpg"].map((src, i) => (
              <div key={i} onClick={() => setSelectedImage(src)} className="relative w-full h-40 md:h-60 cursor-pointer rounded-lg overflow-hidden shadow-lg">
                <Image src={src} alt={`Event ${i}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover transition-transform hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "2015",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">Finished school — started exploring creative hobbies and photography basics.</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {["/about/1.jpeg", "/about/2.jpeg", "/about/3.jpg", "/about/4.jpg", "/about/4.jpg", "/about/4.jpg"].map((src, i) => (
              <div key={i} onClick={() => setSelectedImage(src)} className="relative w-full h-40 md:h-60 cursor-pointer rounded-lg overflow-hidden shadow-lg">
                <Image src={src} alt={`Event ${i}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover transition-transform hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedImage} alt="Enlarged" width={1200} height={800} className="rounded-lg object-contain w-full h-auto" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
