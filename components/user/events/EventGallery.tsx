"use client";

import React from "react";
import Image from "next/image";
import { EventImage } from "@/types/events";

interface EventGalleryProps {
  images: EventImage[];
  onImageClick: (index: number) => void;
}

const EventGallery: React.FC<EventGalleryProps> = ({ images, onImageClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
          onClick={() => onImageClick(index)}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0  transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
              <p className="text-sm font-medium">{image.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventGallery;
