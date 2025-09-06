import { Event } from "@/types/events";

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Sarah & John Wedding",
    description: "A beautiful outdoor wedding ceremony in the countryside with stunning sunset moments and intimate family gatherings.",
    date: "2024-06-15",
    location: "Riverside Gardens, California",
    category: {
      name: "Wedding",
      icon: "Heart",
      color: "text-pink-600",
    },
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
    images: [
      {
        id: "1-1",
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
        alt: "Wedding ceremony",
        title: "The first kiss as married couple",
      },
      {
        id: "1-2",
        src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",

        alt: "Wedding reception",
        title: "Reception dance floor",
      },
      {
        id: "1-3",
        src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop",
        alt: "Wedding bouquet",
        title: "Bridal bouquet details",
      },
      {
        id: "1-4",
        src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
        alt: "Wedding rings",
        title: "Exchange of rings",
      },
    ],
  },
  {
    id: "2",
    title: "Emma's Sweet 16",
    description: "A glamorous sweet sixteen birthday party with friends, family, and unforgettable moments of joy and celebration.",
    date: "2024-07-20",
    location: "Grand Ballroom, New York",
    category: {
      name: "Birthday",
      icon: "Gift",
      color: "text-purple-600",
    },
    thumbnail: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
    images: [
      {
        id: "2-1",
        src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
        alt: "Birthday celebration",
        title: "Birthday girl with cake",
      },
      {
        id: "2-2",
        src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
        alt: "Party decorations",
        title: "Beautiful party setup",
      },
      {
        id: "2-3",
        src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
        alt: "Friends celebrating",
        title: "Friends having fun",
      },
    ],
  },
  {
    id: "3",
    title: "Tech Summit 2024",
    description: "Annual technology conference featuring keynote speakers, networking sessions, and product launches from industry leaders.",
    date: "2024-08-10",
    location: "Convention Center, San Francisco",
    category: {
      name: "Corporate",
      icon: "Building",
      color: "text-blue-600",
    },
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    images: [
      {
        id: "3-1",
        src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
        alt: "Conference keynote",
        title: "Opening keynote presentation",
      },
      {
        id: "3-2",
        src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
        alt: "Networking session",
        title: "Attendees networking",
      },
      {
        id: "3-3",
        src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
        alt: "Product demo",
        title: "Live product demonstration",
      },
    ],
  },
  {
    id: "4",
    title: "Johnson Family Reunion",
    description: "A heartwarming family gathering with three generations coming together for a weekend of memories, stories, and traditions.",
    date: "2024-09-05",
    location: "Lakeside Resort, Michigan",
    category: {
      name: "Family",
      icon: "Users",
      color: "text-green-600",
    },
    thumbnail: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop",
    images: [
      {
        id: "4-1",
        src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop",
        alt: "Family group photo",
        title: "Three generations together",
      },
      {
        id: "4-2",
        src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
        alt: "Family picnic",
        title: "Lakeside family picnic",
      },
      {
        id: "4-3",
        src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=600&fit=crop",
        alt: "Kids playing",
        title: "Children playing by the lake",
      },
    ],
  },
];
