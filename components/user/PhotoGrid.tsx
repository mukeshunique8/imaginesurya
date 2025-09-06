"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { listImagesFromBucket, getImageURL } from "@/lib/storage";
import gsap from "gsap";
import { useTheme } from "next-themes";
import { ImageModal } from "./ImageModal";

interface PhotoGridProps {
  bucket: string;
  folder?: string;
}
export const PhotoGrid: React.FC<{ bucket: string; folder?: string }> = ({ bucket, folder = "" }) => {
  const [images, setImages] = useState<string[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    async function fetchImages() {
      try {
        const files = await listImagesFromBucket(bucket, folder);
        const urls = files.map((f) => getImageURL(bucket, `${folder ? folder + "/" : ""}${f.name}`));
        setImages(urls);
        console.log("Photo grid section animation triggered", urls);
      } catch (err) {
        console.error("Failed to load images:", err);
      }
    }
    fetchImages();
  }, [bucket, folder]);

  useEffect(() => {
    gsap.from(".photo-item", {
      scale: 0.8,
      opacity: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [images]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {images.map((src, index) => (
        <Card
          key={index}
          className={`photo-item transition-transform duration-300 backdrop-blur-xl ${theme === "dark" ? "bg-black/30" : "bg-white/30"} hover:scale-110 hover:z-10 cursor-pointer shadow-xl rounded-2xl overflow-hidden`}
        >
          {/* <CardContent className="p-0">
            <img src={src} alt={`Photo ${index}`} className="object-cover w-full h-64 hover:scale-105 transition-transform duration-300" loading="lazy" />
          </CardContent>
           */}
          <ImageModal imageUrl={src} />
        </Card>
      ))}
    </div>
  );
};
