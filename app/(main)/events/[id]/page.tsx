// app/events/[id]/page.tsx
"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Heart, Gift, Building, Users } from "lucide-react";
import { mockEvents } from "@/lib/data/eventmockData";
import EventGallery from "@/components/user/events/EventGallery";
import ImageViewModal from "@/components/user/shared/ImageViewModal";

const iconMap = {
  Heart,
  Gift,
  Building,
  Users,
};

const EventDetailPage: React.FC = () => {
  const params = useParams();
  const eventId = params.id as string;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const event = mockEvents.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">The event you're looking for doesn't exist.</p>
          <Link href="/events" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[event.category.icon as keyof typeof iconMap];
  const modalImage = event.images[modalIndex] || null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    if (modalIndex < event.images.length - 1) {
      setModalIndex(modalIndex + 1);
    }
  };

  const prevImage = () => {
    if (modalIndex > 0) {
      setModalIndex(modalIndex - 1);
    }
  };

  return (
    <div className="min-h-screen py-16 mt-8">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/events" className="inline-flex items-center text-primary hover:text-secondary mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Events
        </Link>

        {/* Hero Section */}
        <div className=" rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 md:h-96">
            <Image src={event.thumbnail} alt={event.title} fill className="object-cover" sizes="100vw" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 ">
              <div className="flex items-center mb-2">
                {IconComponent && (
                  <div className=" bg-opacity-20 rounded-full p-2 mr-3">
                    <IconComponent size={24} className="text-white" />
                  </div>
                )}
                <span className="text-sm font-medium bg-background bg-opacity-30 px-3 py-1 rounded-full">{event.category.name}</span>
              </div>
              <h1 className="text-3xl md:text-4xl bg-gradient  px-3 py-1 rounded-full font-bold mb-2">{event.title}</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2">
            <div className=" rounded-lg shadow-2xl p-6 mb-8">
              <h2 className="text-2xl font-bold  mb-4">Event Details</h2>
              <p className=" text-lg leading-relaxed mb-6">{event.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Calendar size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold ">Date</h3>
                    <p className="text-gray-600">{formatDate(event.date)}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <MapPin size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold ">Location</h3>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Gallery */}
            <div className=" rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold ">Photo Gallery</h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{event.images.length} photos</span>
              </div>
              <EventGallery images={event.images} onImageClick={openModal} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className=" rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold  mb-4">Quick Info</h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  {IconComponent && <IconComponent size={20} className={`mr-3 ${event.category.color}`} />}
                  <span className="font-medium">{event.category.name}</span>
                </div>

                <div className="flex items-center">
                  <Calendar size={20} className="mr-3 text-gray-400" />
                  <span>{formatDate(event.date)}</span>
                </div>

                <div className="flex items-start">
                  <MapPin size={20} className="mr-3 text-gray-400 mt-0.5" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold  mb-3">Gallery Stats</h4>
                <div className="text-sm text-gray-600">
                  <p>{event.images.length} high-resolution photos</p>
                  <p>Professional photography</p>
                  <p>Available for download</p>
                </div>
              </div>

              <div className="mt-8">
                <button className="w-full  py-3 px-4 rounded-lg bg-primary hover:secondary transition-colors font-medium">Contact Photographer</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ImageViewModal isOpen={isModalOpen} onClose={closeModal} image={modalImage} onNext={nextImage} onPrev={prevImage} hasNext={modalIndex < event.images.length - 1} hasPrev={modalIndex > 0} />
    </div>
  );
};

export default EventDetailPage;
