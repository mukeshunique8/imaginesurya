import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Camera, Heart, Briefcase, Gift, Users, Star, Calendar } from "lucide-react";

// Type definitions
interface ImageData {
  id: number;
  src: string;
  alt: string;
  title: string;
}

interface GalleryData {
  [key: string]: ImageData[];
}

interface Category {
  key: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: ImageData | null;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

interface GalleryGridProps {
  images: ImageData[];
  onImageClick: (image: ImageData, index: number) => void;
}

// Mock image data - replace with your actual images
const galleryData: GalleryData = {
  weddings: [
    { id: 1, src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop", alt: "Wedding ceremony", title: "Elegant Wedding Ceremony" },
    { id: 2, src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop", alt: "Wedding couple", title: "Romantic Portrait" },
    { id: 3, src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop", alt: "Wedding reception", title: "Reception Celebration" },
    { id: 6, src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop", alt: "Wedding reception", title: "Reception Celebration" },
    { id: 4, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop", alt: "Wedding dance", title: "First Dance" },
    { id: 5, src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop", alt: "Wedding couple", title: "Romantic Portrait" },
  ],
  birthdays: [
    { id: 7, src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", alt: "Birthday party", title: "Birthday Celebration" },
    { id: 8, src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop", alt: "Birthday cake", title: "Special Birthday Cake" },
    { id: 9, src: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop", alt: "Kids birthday", title: "Kids Party Fun" },
    { id: 10, src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop", alt: "Birthday balloons", title: "Colorful Decorations" },
  ],
  corporate: [
    { id: 11, src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop", alt: "Corporate event", title: "Business Conference" },
    { id: 12, src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop", alt: "Team meeting", title: "Team Building Event" },
    { id: 13, src: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=600&fit=crop", alt: "Corporate presentation", title: "Product Launch" },
    { id: 14, src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop", alt: "Office party", title: "Office Celebration" },
  ],
  portraits: [
    { id: 15, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop", alt: "Portrait session", title: "Professional Portrait" },
    { id: 16, src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop", alt: "Family portrait", title: "Family Session" },
    { id: 17, src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop", alt: "Individual portrait", title: "Individual Portrait" },
    { id: 18, src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop", alt: "Family portrait", title: "Family Session" },
  ],
  events: [
    { id: 19, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", alt: "Special event", title: "Gala Night" },
    { id: 20, src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop", alt: "Concert event", title: "Live Performance" },
    { id: 21, src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop", alt: "Award ceremony", title: "Award Ceremony" },
    { id: 22, src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop", alt: "Festival event", title: "Festival Celebration" },
  ],
};

const categories: Category[] = [
  { key: "weddings", name: "Weddings", icon: Heart, color: "text-pink-500" },
  { key: "birthdays", name: "Birthdays", icon: Gift, color: "text-orange-500" },
  { key: "corporate", name: "Corporate Events", icon: Briefcase, color: "text-blue-500" },
  { key: "portraits", name: "Portraits", icon: Users, color: "text-purple-500" },
  { key: "events", name: "Special Events", icon: Star, color: "text-green-500" },
];

// Custom Image component that mimics Next.js Image behavior
const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className = "", fill = false, objectFit = "cover", style = {}, loading = "lazy", ...props }) => {
  const imageStyle: React.CSSProperties = {
    objectFit: fill ? objectFit : undefined,
    ...style,
  };

  return <img src={src} alt={alt} className={`${className} ${fill ? "absolute inset-0 w-full h-full" : ""}`} style={imageStyle} loading={loading} {...props} />;
};

// Modal Component
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, image, onNext, onPrev, hasNext, hasPrev }) => {
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
          <OptimizedImage src={image.src} alt={image.alt} fill objectFit="contain" className="rounded-lg" />
        </div>

        {/* Image title */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
          <h3 className="text-lg font-semibold  px-4 py-2 rounded-lg">{image.title}</h3>
        </div>
      </div>
    </div>
  );
};

// Gallery Grid Component
const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onImageClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          onClick={() => onImageClick(image, index)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onImageClick(image, index);
            }
          }}
        >
          <OptimizedImage src={image.src} alt={image.alt} fill objectFit="cover" className="transition-transform duration-300 group-hover:scale-110" />
          <div className="absolute inset-0  transition-all duration-300 flex items-end">
            <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-semibold text-sm">{image.title}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Photography Gallery Component
const PhotographyGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("weddings");
  const [modalImage, setModalImage] = useState<ImageData | null>(null);
  const [modalIndex, setModalIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const currentImages = galleryData[activeCategory] || [];
  useEffect(() => {
    // Reset modal when changing category
    setModalImage(null);
    setModalIndex(0);
    setIsModalOpen(false);
  }, [activeCategory]);

  const openModal = (image: ImageData, index: number) => {
    setModalImage(image);
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  const nextImage = () => {
    const nextIndex = (modalIndex + 1) % currentImages.length;
    setModalIndex(nextIndex);
    setModalImage(currentImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = modalIndex === 0 ? currentImages.length - 1 : modalIndex - 1;
    setModalIndex(prevIndex);
    setModalImage(currentImages[prevIndex]);
  };

  const currentCategory = categories.find((cat) => cat.key === activeCategory);

  return (
    <div className="min-h-screen py-16  mt-8">
      {/* Header */}
      <header className="  ">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient p-3 rounded-full">
                <Camera className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold ">Imagine Surya</h1>
                <p className="text-gray-600 text-sm">Capturing Life's Precious Moments</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Calendar className="" size={20} />
              <span className="">Book Your Session</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {/* <section className="relative py-20 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Professional Photography</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Transforming moments into timeless memories</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <Heart size={16} />
              <span>Weddings</span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase size={16} />
              <span>Corporate</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users size={16} />
              <span>Portraits</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star size={16} />
              <span>Events</span>
            </div>
          </div>
        </div>
      </section> */}

      {/* Category Navigation */}
      <section className="py-12 ">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category.key ? "bg-primary shadow-lg transform scale-105" : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                  }`}
                >
                  <Icon size={20} className={activeCategory === category.key ? "text-white" : category.color} />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold  mb-4">{currentCategory?.name || "Gallery"}</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our stunning collection of {currentCategory?.name.toLowerCase() || "photography"}, capturing every emotion and detail with artistic precision.
            </p>
          </div>

          <GalleryGrid images={currentImages} onImageClick={openModal} />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Capture Your Moment?</h3>
          <p className="text-xl mb-8 opacity-90">Let's create beautiful memories together</p>
          <button className="bg-gradient px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
            <a href="/contact">Book Your Session</a>
          </button>
        </div>
      </section>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} image={modalImage} onNext={nextImage} onPrev={prevImage} hasNext={modalIndex < currentImages.length - 1} hasPrev={modalIndex > 0} />
    </div>
  );
};

export default PhotographyGallery;
