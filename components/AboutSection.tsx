// components/AboutSection.tsx
"use client";

import { useEffect, useState } from "react";
import { getRandomImageURL } from "@/lib/storage";
import gsap from "gsap";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

interface AboutSectionProps {
  bucket: string;
}

export const AboutSection: React.FC<{ bucket: string; folder?: string }> = ({ bucket, folder = "" }) => {
  const [bgImage, setBgImage] = useState<string>("");
  const { theme } = useTheme();

  useEffect(() => {
    async function loadRandomImage() {
      const url = await getRandomImageURL(bucket, folder);
      if (url) setBgImage(url);
    }
    loadRandomImage();
  }, [bucket, folder]);

  useEffect(() => {
    gsap.from(".about-content", {
      x: -100,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
    console.log("About section animation triggered", bgImage);
  }, [bgImage]);

  return (
    <section className="relative py-20 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={`absolute inset-0 ${theme === "dark" ? "bg-black/70" : "bg-white/80"}`} />
      </div>
      <div className="container mx-auto px-4">
        <div className="about-content max-w-2xl bg-gradient-to-r from-transparent via-transparent p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6">About Our Collection</h2>
          <p className="text-lg mb-4">We curate the finest images from around the world to inspire your next project.</p>
          <p className="text-lg mb-8">Our collection is constantly updated with fresh, high-quality content.</p>
          <Button variant={theme === "dark" ? "default" : "outline"}>Learn More</Button>
        </div>
      </div>
    </section>
  );
};
