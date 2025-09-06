"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { EventImage } from "@/types/events";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: EventImage | null;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const ImageViewModal: React.FC<ModalProps> = ({ isOpen, onClose, image, onNext, onPrev, hasNext, hasPrev }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleKeyNav = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && hasNext) onNext();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.addEventListener("keydown", handleKeyNav);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("keydown", handleKeyNav);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev]);

  if (!isOpen || !image) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={handleBackdropClick}>
      <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
        {/* Close button */}
        <button
          onClick={(e) => handleButtonClick(e, onClose)}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors p-2 bg-black bg-opacity-50 rounded-full"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Previous button */}
        {hasPrev && (
          <button
            onClick={(e) => handleButtonClick(e, onPrev)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors p-2 bg-black bg-opacity-50 rounded-full"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Next button */}
        {hasNext && (
          <button
            onClick={(e) => handleButtonClick(e, onNext)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors p-2 bg-black bg-opacity-50 rounded-full"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Image */}
        <div className="relative w-full h-full max-w-4xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
          <Image src={image.src} alt={image.alt} fill className="object-contain rounded-lg" sizes="100vw" />
        </div>

        {/* Image title */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
          <h3 className="text-lg font-semibold px-4 py-2 rounded-lg">{image.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default ImageViewModal;
