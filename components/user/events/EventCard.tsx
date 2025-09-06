"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Gift, Building, Users, Calendar, MapPin } from "lucide-react";
import { Event } from "@/types/events";

const iconMap = {
  Heart,
  Gift,
  Building,
  Users,
};

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const IconComponent = iconMap[event.category.icon as keyof typeof iconMap];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link href={`/events/${event.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group">
        <div className="relative h-48 w-full">
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full p-2">{IconComponent && <IconComponent size={20} className={event.category.color} />}</div>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{event.title}</h3>

          <div className="flex items-center text-gray-600 mb-2">
            <Calendar size={16} className="mr-2" />
            <span className="text-sm">{formatDate(event.date)}</span>
          </div>

          <div className="flex items-center text-gray-600 mb-3">
            <MapPin size={16} className="mr-2" />
            <span className="text-sm line-clamp-1">{event.location}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 ${event.category.color}`}>
              {IconComponent && <IconComponent size={14} className="mr-1" />}
              {event.category.name}
            </span>
            <span className="text-xs text-gray-500">{event.images.length} photos</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
