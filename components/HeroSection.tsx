// components/HeroSection.tsx
"use client";

import { useEffect, useState } from "react";
import { getRandomImageURL } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useTheme } from "next-themes";

interface HeroSectionProps {
  bucket: string;
}
export const HeroSection: React.FC<{ bucket: string; folder?: string }> = ({ bucket, folder = "" }) => {
  const [bgImage, setBgImage] = useState<string>("");
  const { theme } = useTheme();

  useEffect(() => {
    async function loadRandomImage() {
      const url = await getRandomImageURL(bucket, folder);
      if (url) setBgImage(url);
    }
    loadRandomImage();
    console.log("Hero section animation triggered", bgImage);
  }, [bucket, folder]);

  useEffect(() => {
    gsap.from(".hero-content", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });
  }, [bgImage]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="hero-content relative z-10 text-center p-8 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Discover Amazing Content</h1>
        <p className="text-xl text-white/90 mb-8">Beautifully curated visuals for your inspiration</p>
        <Button variant="outline" className="text-white border-white hover:bg-white/10">
          Explore More
        </Button>
      </div>
    </section>
  );
};
