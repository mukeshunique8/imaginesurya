import EventCard from "@/components/user/events/EventCard";
import { mockEvents } from "@/lib/data/eventmockData";
import React from "react";

export default function Events() {
  return (
    <div className="min-h-screen py-16 mt-8">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Events</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Capturing life's most precious moments through our lens. Browse through our collection of weddings, birthdays, corporate events, and family gatherings.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
